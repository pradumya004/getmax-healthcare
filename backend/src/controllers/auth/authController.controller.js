// backend/src/controllers/auth/authController.controller.js

import User from '../../models/User.models.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';
import { generateToken, verifyToken } from '../../utils/jwt.js';
import { validatePasswordStrength } from '../../utils/password.js';
import { sendEmail } from '../../services/emailService.js';

export const registerUser = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        companyName,
        jobTitle,
        country,
        industryType,
        companySize,
        monthlyClaimsVolume,
        currentEHR,
        leadSource,
        referralCode
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
        throw ApiError.badRequest('Please provide all required fields');
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
        throw ApiError.unprocessableEntity('Password does not meet requirements', passwordValidation.errors);
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        throw ApiError.conflict('User with this email already exists');
    }

    // Create user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        companyName,
        jobTitle,
        country,
        industryType,
        companySize,
        monthlyClaimsVolume,
        currentEHR,
        leadSource: leadSource || 'website',
        referralCode,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    try {
        await sendEmail({
            to: user.email,
            subject: 'Verify Your GetMax Healthcare Account',
            template: 'email-verification',
            data: {
                name: user.fullName,
                verificationToken: verificationToken,
                verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
            }
        });
    } catch (error) {
        console.error('Failed to send verification email:', error);
        // Don't throw error, user is still created
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(
        ApiResponse.created({
            user: userResponse,
            token: token,
            message: 'Registration successful. Please check your email to verify your account.'
        }, 'User registered successfully')
    );
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        throw ApiError.badRequest('Please provide email and password');
    }

    // Find user and include password field
    const user = await User.findByEmail(email).select('+password');
    if (!user) {
        throw ApiError.unauthorized('Invalid credentials');
    }

    // Check if account is locked
    if (user.isLocked) {
        throw ApiError.unauthorized('Account temporarily locked due to too many failed login attempts');
    }

    // Check if account is active
    if (!user.isActive) {
        throw ApiError.unauthorized('Account has been deactivated');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        await user.incLoginAttempts();
        throw ApiError.unauthorized('Invalid credentials');
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
        await user.resetLoginAttempts();
    }

    // Update login information
    await user.updateLastLogin(req.ip, req.get('User-Agent'));

    // Generate JWT token
    const token = user.generateAuthToken();

    // Remove sensitive fields from response
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.resetPasswordToken;
    delete userResponse.resetPasswordExpire;
    delete userResponse.emailVerificationToken;
    delete userResponse.emailVerificationExpire;

    res.json(
        ApiResponse.success({
            user: userResponse,
            token: token
        }, 'Login successful')
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    res.json(
        ApiResponse.success({ user }, 'User profile retrieved successfully')
    );
});

export const updateProfile = asyncHandler(async (req, res) => {
    const allowedUpdates = [
        'firstName', 'lastName', 'phone', 'companyName', 'jobTitle',
        'country', 'state', 'city', 'industryType', 'companySize',
        'monthlyClaimsVolume', 'currentEHR', 'preferences'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    });

    if (Object.keys(updates).length === 0) {
        throw ApiError.badRequest('No valid fields to update');
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true, runValidators: true }
    );

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    res.json(
        ApiResponse.success({ user }, 'Profile updated successfully')
    );
});

export const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw ApiError.badRequest('Please provide current password and new password');
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
        throw ApiError.unprocessableEntity('New password does not meet requirements', passwordValidation.errors);
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
        throw ApiError.notFound('User not found');
    }

    // Check current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
        throw ApiError.unauthorized('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json(
        ApiResponse.success({}, 'Password changed successfully')
    );
});

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw ApiError.badRequest('Please provide email address');
    }

    const user = await User.findByEmail(email);
    if (!user) {
        // Don't reveal that user doesn't exist for security
        res.json(
            ApiResponse.success({}, 'If an account with that email exists, we have sent a password reset link')
        );
        return;
    }

    // Generate reset token
    const resetToken = user.generateResetPasswordToken();
    await user.save();

    // Send reset email
    try {
        await sendEmail({
            to: user.email,
            subject: 'Reset Your GetMax Healthcare Password',
            template: 'password-reset',
            data: {
                name: user.fullName,
                resetToken: resetToken,
                resetUrl: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
                expiresIn: '1 hour'
            }
        });

        res.json(
            ApiResponse.success({}, 'Password reset email sent successfully')
        );
    } catch (error) {
        // Clear reset token if email fails
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        throw ApiError.internalServerError('Failed to send password reset email');
    }
});

export const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        throw ApiError.badRequest('Please provide reset token and new password');
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
        throw ApiError.unprocessableEntity('Password does not meet requirements', passwordValidation.errors);
    }

    // Find user by token
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        throw ApiError.badRequest('Invalid or expired reset token');
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.loginAttempts = 0; // Reset login attempts on password reset
    user.lockUntil = undefined;

    await user.save();

    res.json(
        ApiResponse.success({}, 'Password reset successfully')
    );
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;

    if (!token) {
        throw ApiError.badRequest('Please provide verification token');
    }

    const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
        throw ApiError.badRequest('Invalid or expired verification token');
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.json(
        ApiResponse.success({}, 'Email verified successfully')
    );
});

export const resendEmailVerification = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    if (user.isEmailVerified) {
        throw ApiError.badRequest('Email is already verified');
    }

    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();

    // Send verification email
    try {
        await sendEmail({
            to: user.email,
            subject: 'Verify Your GetMax Healthcare Account',
            template: 'email-verification',
            data: {
                name: user.fullName,
                verificationToken: verificationToken,
                verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
            }
        });

        res.json(
            ApiResponse.success({}, 'Verification email sent successfully')
        );
    } catch (error) {
        throw ApiError.internalServerError('Failed to send verification email');
    }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
    // In a stateless JWT system, logout is handled client-side by removing the token
    // But we can still update last activity
    await User.findByIdAndUpdate(req.user.id, {
        lastActivity: new Date()
    });

    res.json(
        ApiResponse.success({}, 'Logged out successfully')
    );
});