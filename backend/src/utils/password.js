// backend/src/utils/password.js

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Hash password
export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw Error('Error hashing password');
    }
};

// Compare password
export const comparePassword = async (candidatePassword, hashedPassword) => {
    try {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
        throw Error('Error comparing passwords');
    }
};

// Generate random token using UUID
export const generateRandomToken = () => {
    return uuidv4().replace(/-/g, ''); // Remove dashes for cleaner token
};

// Generate secure random password
export const generateRandomPassword = (length = 12) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
};

// Validate password strength
export const validatePasswordStrength = (password) => {
    const errors = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (!/(?=.*[a-z])/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/(?=.*[A-Z])/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/(?=.*\d)/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (!/(?=.*[!@#$%^&*_])/.test(password)) {
        errors.push('Password must contain at least one special character (!@#$%^&*)');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

// Calculate password strength score
export const calculatePasswordStrength = (password) => {
    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Character variety
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    // Bonus for length
    if (password.length >= 16) score += 1;

    return {
        score: score,
        strength: score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong'
    };
};