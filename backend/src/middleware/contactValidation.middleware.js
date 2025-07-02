// backend/src/middleware/contactValidation.middleware.js

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

// Contact creation validation
export const validateContactCreation = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('First name can only contain letters and spaces'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Last name can only contain letters and spaces'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage('Email cannot exceed 255 characters'),

    body('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
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

    body('companySize')
        .optional()
        .isIn(['1-10', '11-50', '51-200', '201-500', '500+'])
        .withMessage('Invalid company size'),

    body('industryType')
        .optional()
        .isIn(['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'other'])
        .withMessage('Invalid industry type'),

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

    body('zipCode')
        .optional()
        .isNumeric()
        .withMessage('Zip code must be numeric'),

    body('inquiryType')
        .notEmpty()
        .withMessage('Inquiry type is required')
        .isIn([
            'general-inquiry', 'demo-request', 'pricing-request', 'support-request',
            'partnership', 'sales-inquiry', 'product-inquiry', 'service-inquiry',
            'consultation', 'other'
        ])
        .withMessage('Invalid inquiry type'),

    body('subject')
        .trim()
        .notEmpty()
        .withMessage('Subject is required')
        .isLength({ max: 200 })
        .withMessage('Subject cannot exceed 200 characters'),

    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ max: 2000 })
        .withMessage('Message cannot exceed 2000 characters'),

    body('interestedServices')
        .optional()
        .isArray()
        .withMessage('Interested services must be an array'),

    body('interestedServices.*')
        .optional()
        .isIn([
            'provider-rcm', 'billing-company-support', 'ar-management',
            'coding', 'credentialing', 'denial-management', 'payment-posting', 'collections'
        ])
        .withMessage('Invalid service type'),

    body('interestedProducts')
        .optional()
        .isArray()
        .withMessage('Interested products must be an array'),

    body('interestedProducts.*')
        .optional()
        .isIn(['bet-tool', 'qms', 'ebv-bot', 'rcm-blackbox', 'smartdash'])
        .withMessage('Invalid product type'),

    body('currentChallenges')
        .optional()
        .isArray()
        .withMessage('Current challenges must be an array'),

    body('currentChallenges.*')
        .optional()
        .isIn([
            'high-denial-rate', 'slow-collections', 'staff-shortage',
            'compliance-issues', 'technology-gaps', 'cost-reduction',
            'process-improvement', 'reporting-analytics', 'other'
        ])
        .withMessage('Invalid challenge type'),

    body('monthlyClaimsVolume')
        .optional()
        .isIn(['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+'])
        .withMessage('Invalid monthly claims volume'),

    body('timeframe')
        .optional()
        .isIn(['immediate', '1-3-months', '3-6-months', '6-12-months', 'planning-stage'])
        .withMessage('Invalid timeframe'),

    body('budget')
        .optional()
        .isIn(['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+', 'not-disclosed'])
        .withMessage('Invalid budget range'),

    body('leadSource')
        .optional()
        .isIn(['website', 'referral', 'social-media', 'advertisement', 'conference', 'webinar', 'content-download', 'other'])
        .withMessage('Invalid lead source'),

    body('marketingConsent')
        .optional()
        .isBoolean()
        .withMessage('Marketing consent must be a boolean'),

    handleValidationErrors
];

// Contact update validation
export const validateContactUpdate = [
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

    body('companySize')
        .optional()
        .isIn(['1-10', '11-50', '51-200', '201-500', '500+'])
        .withMessage('Invalid company size'),

    body('industryType')
        .optional()
        .isIn(['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'other'])
        .withMessage('Invalid industry type'),

    body('status')
        .optional()
        .isIn(['new', 'contacted', 'qualified', 'proposal-sent', 'follow-up', 'closed-won', 'closed-lost', 'nurturing'])
        .withMessage('Invalid status'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'urgent'])
        .withMessage('Invalid priority'),

    body('nextFollowUp')
        .optional()
        .isISO8601()
        .withMessage('Next follow-up must be a valid date'),

    body('assignedTo')
        .optional()
        .isMongoId()
        .withMessage('Assigned to must be a valid user ID'),

    handleValidationErrors
];