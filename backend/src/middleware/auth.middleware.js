// backend/src/middleware/auth.middleware.js

import User from '../models/User.models.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { USER_ROLES } from '../utils/constants.js';
import { verifyToken, extractTokenFromHeader } from '../utils/jwt.js';

// Protect Routes - Require Authentication
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Get Token From Header
    const authHeader = req.headers.authorization;
    token = extractTokenFromHeader(authHeader);

    // Check If Token Exists
    if (!token) {
        throw ApiError.unauthorized('Access Denied. No Token Provided.');
    }

    try {
        // Verify Token
        const decodedToken = verifyToken(token);

        const user = await User.findById(decodedToken.id);

        if (!user) {
            throw ApiError.unauthorized('Token Is Valid But User Not Found!');
        }

        // Check If User Is Inactive
        if (!user.isActive) {
            throw ApiError.unauthorized('Account Has Been Deactivated!');
        }

        // Check If Account Is Locked
        if (user.isLocked) {
            throw ApiError.unauthorized('Account Is Temporarily Locked!');
        }

        // Add User To Request Object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            throw ApiError.unauthorized('Invalid Token!');
        }
        if (error.name === 'TokenExpiredError') {
            throw ApiError.unauthorized('Token Expired!');
        }
        throw Error(error.message);
    }
});

// Optional Authentication - User May / May Not Be Logged In
export const optionalAuth = asyncHandler(async (req, res, next) => {
    let token;

    // Get Token From Header
    const authHeader = req.headers.authorization;
    token = extractTokenFromHeader(authHeader);

    // If No Token, Continue Without User
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        // Verify Token
        const decodedToken = verifyToken(token);

        // Get User From Token
        const user = await User.findById(decodedToken.id);

        if (user && user.isActive && !user.isLocked) {
            req.user = user;
        } else {
            req.user = null;
        }
        next();
    } catch (error) {
        // If No Token, Continue Without User
        req.user = null;
        return next();
    }
});

// Restrict To Specific Roles
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw ApiError.unauthorized('Authentication Required!');
        }

        if (!roles.includes(req.user.role)) {
            throw ApiError.forbidden('Access Denied! Permissions Not Met!');
        }

        next();
    }
};

// Admin Only Access
export const adminOnly = restrictTo(USER_ROLES.ADMIN);

// Admin Or Moderator Access
export const adminOrModerator = restrictTo(USER_ROLES.ADMIN, USER_ROLES.MODERATOR);

// Check If User Owns The Resource Or Is Admin
export const ownerOrAdmin = (getResourceUserId) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) {
            throw ApiError.unauthorized('Authentication Required!');
        }

        // Admin Can Access Anything
        if (req.role === USER_ROLES.ADMIN) {
            return next();
        }

        // Get The User ID Of Resource Owner
        let resourceUserId;
        if (typeof getResourceUserId === 'function') {
            resourceUserId = await getResourceUserId(req);
        } else if (typeof getResourceUserId === 'string') {
            resourceUserId = req.params[getResourceUserId] || req.body[getResourceUserId];
        } else {
            resourceUserId = req.params.userId || req.body.userId;
        }

        // Check If User Owns The Resource
        if (req.user._id.toString() !== resourceUserId.toString()) {
            throw ApiError.forbidden('Access Denied! You Can Only Access Your Own Resources!');
        }

        next();
    });
};

// Verify Email Required
export const requireEmailVerification = (req, res, next) => {
    if (!req.user) {
        throw ApiError.unauthorized('Authentication Required');
    }

    if (!req.user.isEmailVerified) {
        throw ApiError.forbidden('Email Verification Required');
    }

    next();
}

// Check account status
export const checkAccountStatus = (req, res, next) => {
    if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
    }

    if (!req.user.isActive) {
        throw ApiError.unauthorized('Account has been deactivated');
    }

    if (req.user.isLocked) {
        throw ApiError.unauthorized('Account is temporarily locked');
    }

    next();
};

// Rate limiting for sensitive operations
export const sensitiveOperation = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        throw ApiError.unauthorized('Authentication required');
    }

    // Check for too many recent password changes, etc.
    const recentActivity = await User.findById(req.user.id)
        .select('lastActivity updatedAt');

    const timeSinceLastUpdate = Date.now() - recentActivity.updatedAt.getTime();
    const minimumDelay = 5 * 60 * 1000; // 5 minutes

    if (timeSinceLastUpdate < minimumDelay) {
        throw ApiError.tooManyRequests('Please wait before performing this action again');
    }

    next();
});

// Log user activity
export const logActivity = (action) => {
    return asyncHandler(async (req, res, next) => {
        if (req.user) {
            // Update last activity
            await User.findByIdAndUpdate(req.user.id, {
                lastActivity: new Date(),
                ipAddress: req.ip,
                userAgent: req.get('User-Agent')
            });

            // Log the action (you can implement more detailed logging here)
            console.log(`User ${req.user.email} performed action: ${action} at ${new Date()}`);
        }

        next();
    });
};