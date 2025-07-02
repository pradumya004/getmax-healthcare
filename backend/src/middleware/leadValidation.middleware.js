// backend/src/middleware/leadValidation.middleware.js

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

// Lead creation validation
export const validateLeadCreation = [
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
        .normalizeEmail(),

    body('phone')
        .optional()
        .trim()
        .matches(/^[\+]?[\d\s\-\(\)]{10,17}$/)
        .withMessage('Please provide a valid phone number'),

    body('companyName')
        .trim()
        .notEmpty()
        .withMessage('Company name is required')
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

    body('leadSource')
        .optional()
        .isIn([
            'pricing-calculator', 'demo-request', 'whitepaper-download', 'webinar-registration',
            'blog-subscription', 'newsletter-signup', 'contact-form', 'social-media',
            'paid-advertisement', 'referral', 'conference', 'cold-outreach',
            'website-chat', 'phone-inquiry', 'partner-referral', 'other'
        ])
        .withMessage('Invalid lead source'),

    body('monthlyClaimsVolume')
        .optional()
        .isIn(['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+'])
        .withMessage('Invalid monthly claims volume'),

    body('currentChallenges')
        .optional()
        .isArray()
        .withMessage('Current challenges must be an array'),

    body('interestedServices')
        .optional()
        .isArray()
        .withMessage('Interested services must be an array'),

    body('interestedProducts')
        .optional()
        .isArray()
        .withMessage('Interested products must be an array'),

    body('projectTimeframe')
        .optional()
        .isIn(['immediate', '1-3-months', '3-6-months', '6-12-months', 'planning-stage'])
        .withMessage('Invalid project timeframe'),

    body('budget')
        .optional()
        .isIn(['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+', 'not-disclosed'])
        .withMessage('Invalid budget range'),

    body('contactId')
        .optional()
        .isMongoId()
        .withMessage('Contact ID must be a valid MongoDB ID'),

    body('pricingRequestId')
        .optional()
        .isMongoId()
        .withMessage('Pricing request ID must be a valid MongoDB ID'),

    handleValidationErrors
];

// Lead update validation
export const validateLeadUpdate = [
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
        .isIn([
            'new', 'contacted', 'qualified', 'demo-scheduled', 'demo-completed',
            'proposal-requested', 'proposal-sent', 'negotiation', 'closed-won',
            'closed-lost', 'nurturing', 'unqualified'
        ])
        .withMessage('Invalid status'),

    body('stage')
        .optional()
        .isIn(['awareness', 'interest', 'consideration', 'intent', 'evaluation', 'purchase'])
        .withMessage('Invalid stage'),

    body('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'hot'])
        .withMessage('Invalid priority'),

    body('nextFollowUp')
        .optional()
        .isISO8601()
        .withMessage('Next follow-up must be a valid date'),

    body('assignedTo')
        .optional()
        .isMongoId()
        .withMessage('Assigned to must be a valid user ID'),

    body('qualification.budget')
        .optional()
        .isBoolean()
        .withMessage('Budget qualification must be a boolean'),

    body('qualification.authority')
        .optional()
        .isBoolean()
        .withMessage('Authority qualification must be a boolean'),

    body('qualification.need')
        .optional()
        .isBoolean()
        .withMessage('Need qualification must be a boolean'),

    body('qualification.timeline')
        .optional()
        .isBoolean()
        .withMessage('Timeline qualification must be a boolean'),

    handleValidationErrors
];