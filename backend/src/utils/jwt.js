// backend/src/utils/jwt.js

import jwt from "jsonwebtoken";
import config from "../config/environment.config.js";

// Generate JWT Token
export const generateToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpire
    });
};

// Verify JWT Token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        throw Error('Invalid Token');
    }
}

// Decode JWT Token (Without Verification)
export const decodeToken = (token) => {
    return jwt.decode(token);
}

// Generate Refresh Token
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: '7d'
    });
};

// Extract Token From Authorization Header
export const extractTokenFromHeader = (authHeader) => {
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

    return parts[1];
};

// Check If Token Is Expired
export const isTokenExpired = (token) => {
    try {
        const decodedToken = jwt.decode(token);
        if (!decodeToken || !decodeToken.exp) return true;
    } catch (error) {
        return true;
    }
};