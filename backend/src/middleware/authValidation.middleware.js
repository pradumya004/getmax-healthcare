// backend/src/middleware/authValidation.middleware.js

import { body, validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

// Handle Validation Errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({
            field: error.path,
            message: error.msg
        }));

        throw ApiError.unprocessableEntity('Validation Failed', errorMessages);
    }
    next();
};

// Registration Validation
export const validateRegistration = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First Name Is Required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First Name Must Be Between 2 To 50 Characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First Name Can Only Contain Letters And Spaces'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last Name Is Required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last Name Must Be Between 2 To 50 Characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Last Name Can Only Contain Letters And Spaces'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email Is Required')
        .isEmail()
        .withMessage('Please Provide A Valid Email Address')
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage('Email Cannot Exceed 255 Characters'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),

    body('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[\d\s\-\(\)]{10,17}$/)
        .withMessage('Please provide a valid phone number'),

    body('companyName')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Company name cannot exceed 100 characters'),

    body('jobTitle')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Job title cannot exceed 100 characters'),

    body('country')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Country cannot exceed 50 characters'),

    body('industryType')
        .optional()
        .isIn(['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'other'])
        .withMessage('Invalid industry type'),

    body('companySize')
        .optional()
        .isIn(['1-10', '11-50', '51-200', '201-500', '500+'])
        .withMessage('Invalid company size'),

    body('monthlyClaimsVolume')
        .optional()
        .isIn(['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+'])
        .withMessage('Invalid monthly claims volume'),

    body('leadSource')
        .optional()
        .isIn(['website', 'referral', 'social-media', 'advertisement', 'conference', 'other'])
        .withMessage('Invalid lead source'),

    handleValidationErrors
];

// Login Validation
export const validateLogin = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    handleValidationErrors
];

// Password Change Validation
export const validatePasswordChange = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),

    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)
        .withMessage('New password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
        .custom((value, { req }) => {
            if (value === req.body.currentPassword) {
                throw Error('New password must be different from current password');
            }
            return true;
        }),

    handleValidationErrors
];

// Forgot Password Validation
export const validateForgotPassword = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    handleValidationErrors
];

// Reset Password Validation
export const validateResetPassword = [
    body('token')
        .notEmpty()
        .withMessage('Reset token is required')
        .isLength({ min: 10 })
        .withMessage('Invalid reset token'),

    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),

    handleValidationErrors
];

// Profile Update Validation
export const validateProfileUpdate = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters and spaces'),

    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Last name can only contain letters and spaces'),

    body('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[\d\s\-\(\)]{10,17}$/)
        .withMessage('Please provide a valid phone number'),

    body('companyName')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Company name cannot exceed 100 characters'),

    body('jobTitle')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Job title cannot exceed 100 characters'),

    body('country')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Country cannot exceed 50 characters'),

    body('state')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('State cannot exceed 50 characters'),

    body('city')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('City cannot exceed 50 characters'),

    body('industryType')
        .optional()
        .isIn(['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'other'])
        .withMessage('Invalid industry type'),

    body('companySize')
        .optional()
        .isIn(['1-10', '11-50', '51-200', '201-500', '500+'])
        .withMessage('Invalid company size'),

    body('monthlyClaimsVolume')
        .optional()
        .isIn(['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+'])
        .withMessage('Invalid monthly claims volume'),

    body('preferences.emailNotifications')
        .optional()
        .isBoolean()
        .withMessage('Email notifications preference must be a boolean'),

    body('preferences.smsNotifications')
        .optional()
        .isBoolean()
        .withMessage('SMS notifications preference must be a boolean'),

    body('preferences.marketingEmails')
        .optional()
        .isBoolean()
        .withMessage('Marketing emails preference must be a boolean'),

    body('preferences.newsletter')
        .optional()
        .isBoolean()
        .withMessage('Newsletter preference must be a boolean'),

    handleValidationErrors
];

// Email Verification Validation
export const validateEmailVerification = [
    body('token')
        .notEmpty()
        .withMessage('Verification token is required')
        .isLength({ min: 10 })
        .withMessage('Invalid verification token'),

    handleValidationErrors
];