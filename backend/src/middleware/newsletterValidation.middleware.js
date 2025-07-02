// backend/src/middleware/newsletterValidation.middleware.js

import { body, validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({
            field: error.path,
            message: error.msg
        }));
        throw ApiError.unprocessableEntity('Validation failed', errorMessages);
    }
    next();
};

// Newsletter subscription validation
export const validateNewsletterSubscription = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage('Email cannot exceed 255 characters'),

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

    body('industryType')
        .optional()
        .isIn(['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'other'])
        .withMessage('Invalid industry type'),

    body('country')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Country cannot exceed 50 characters'),

    body('interests')
        .optional()
        .isArray()
        .withMessage('Interests must be an array'),

    body('interests.*')
        .optional()
        .isIn([
            'rcm-updates', 'product-releases', 'industry-news', 'best-practices',
            'case-studies', 'webinars', 'whitepapers', 'company-news', 'promotions'
        ])
        .withMessage('Invalid interest selection'),

    body('frequency')
        .optional()
        .isIn(['daily', 'weekly', 'bi-weekly', 'monthly'])
        .withMessage('Invalid frequency selection'),

    body('source')
        .optional()
        .isIn([
            'website-footer', 'blog-signup', 'contact-form', 'lead-magnet',
            'webinar-registration', 'popup', 'manual-import', 'api',
            'referral', 'social-media', 'other'
        ])
        .withMessage('Invalid source'),

    body('sourceDetails')
        .optional()
        .trim()
        .isLength({ max: 200 })
        .withMessage('Source details cannot exceed 200 characters'),

    body('gdprConsent')
        .optional()
        .isBoolean()
        .withMessage('GDPR consent must be a boolean'),

    body('dataProcessingConsent')
        .optional()
        .isBoolean()
        .withMessage('Data processing consent must be a boolean'),

    handleValidationErrors
];

// Newsletter subscription update validation
export const validateNewsletterUpdate = [
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

    body('industryType')
        .optional()
        .isIn(['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'other'])
        .withMessage('Invalid industry type'),

    body('country')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Country cannot exceed 50 characters'),

    body('interests')
        .optional()
        .isArray()
        .withMessage('Interests must be an array'),

    body('interests.*')
        .optional()
        .isIn([
            'rcm-updates', 'product-releases', 'industry-news', 'best-practices',
            'case-studies', 'webinars', 'whitepapers', 'company-news', 'promotions'
        ])
        .withMessage('Invalid interest selection'),

    body('frequency')
        .optional()
        .isIn(['daily', 'weekly', 'bi-weekly', 'monthly'])
        .withMessage('Invalid frequency selection'),

    body('segments')
        .optional()
        .isArray()
        .withMessage('Segments must be an array'),

    body('segments.*')
        .optional()
        .isIn([
            'new-subscribers', 'active-subscribers', 'highly-engaged', 'low-engagement',
            'potential-customers', 'existing-customers', 'hospital-contacts',
            'clinic-contacts', 'billing-companies', 'decision-makers', 'influencers'
        ])
        .withMessage('Invalid segment selection'),

    body('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),

    body('tags.*')
        .optional()
        .trim()
        .isLength({ max: 50 })
        .withMessage('Tag cannot exceed 50 characters'),

    handleValidationErrors
];