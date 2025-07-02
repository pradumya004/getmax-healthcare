// backend/src/middleware/pricingValidation.middleware.js

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

// Pricing request creation validation
export const validatePricingRequest = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Full name can only contain letters and spaces'),

    body('workEmail')
        .trim()
        .notEmpty()
        .withMessage('Work email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail(),

    body('companyName')
        .trim()
        .notEmpty()
        .withMessage('Company/Practice name is required')
        .isLength({ max: 100 })
        .withMessage('Company name cannot exceed 100 characters'),

    body('phoneNumber')
        .optional()
        .trim()
        .matches(/^[\+]?[\d\s\-\(\)]{10,17}$/)
        .withMessage('Please provide a valid phone number'),

    body('country')
        .notEmpty()
        .withMessage('Country is required')
        .isIn(['US', 'India', 'Other'])
        .withMessage('Invalid country selection'),

    body('claimsPerMonth')
        .notEmpty()
        .withMessage('Claims per month is required')
        .isIn(['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+'])
        .withMessage('Invalid claims per month selection'),

    body('monthlyCollections')
        .notEmpty()
        .withMessage('Monthly collections is required')
        .isIn(['<10K', '10-50K', '50-100K', '100K+'])
        .withMessage('Invalid monthly collections selection'),

    body('ehrUsed')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('EHR system cannot exceed 100 characters'),

    body('hasInHouseBillingStaff')
        .notEmpty()
        .withMessage('In-house billing staff information is required')
        .isIn(['Yes', 'No', 'Partially'])
        .withMessage('Invalid billing staff selection'),

    body('inHouseStaffCount')
        .optional()
        .isInt({ min: 0, max: 1000 })
        .withMessage('Staff count must be between 0 and 1000'),

    body('currentVendor')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Current vendor cannot exceed 100 characters'),

    body('rcmServicesNeeded')
        .isArray({ min: 1 })
        .withMessage('At least one RCM service must be selected'),

    body('rcmServicesNeeded.*')
        .isIn([
            'billing-coding', 'ar-calling-followup', 'eligibility-verification',
            'payment-posting', 'denial-management', 'qa-audits', 'credentialing',
            'revenue-analytics', 'dedicated-staff-fte', 'software-only-access'
        ])
        .withMessage('Invalid RCM service selection'),

    body('preferredPricingModel')
        .notEmpty()
        .withMessage('Preferred pricing model is required')
        .isIn(['FTE', 'Per Claim', 'Hybrid', 'Not Sure'])
        .withMessage('Invalid pricing model selection'),

    body('budgetRange')
        .optional()
        .isIn(['<5K', '5K-15K', '15K-30K', '30K-50K', '50K+', 'Not Disclosed'])
        .withMessage('Invalid budget range'),

    body('currentChallenges')
        .optional()
        .isArray()
        .withMessage('Current challenges must be an array'),

    body('currentChallenges.*')
        .optional()
        .isIn([
            'high-denial-rate', 'slow-ar-recovery', 'staff-shortage', 'compliance-issues',
            'lack-of-transparency', 'poor-reporting', 'high-costs', 'technology-gaps',
            'claim-errors', 'other'
        ])
        .withMessage('Invalid challenge selection'),

    body('primaryPainPoint')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Primary pain point cannot exceed 500 characters'),

    body('implementationTimeframe')
        .optional()
        .isIn(['Immediate', '1-3 months', '3-6 months', '6+ months', 'Just exploring'])
        .withMessage('Invalid implementation timeframe'),

    body('urgencyLevel')
        .optional()
        .isIn(['Low', 'Medium', 'High', 'Critical'])
        .withMessage('Invalid urgency level'),

    body('decisionMaker')
        .optional()
        .isIn(['Yes', 'No', 'Part of team'])
        .withMessage('Invalid decision maker selection'),

    body('decisionTimeline')
        .optional()
        .isIn(['Within 1 month', '1-3 months', '3-6 months', '6+ months', 'No timeline'])
        .withMessage('Invalid decision timeline'),

    body('evaluationCriteria')
        .optional()
        .isArray()
        .withMessage('Evaluation criteria must be an array'),

    body('evaluationCriteria.*')
        .optional()
        .isIn(['Cost', 'Quality', 'Technology', 'Support', 'Compliance', 'Speed', 'Transparency'])
        .withMessage('Invalid evaluation criteria'),

    body('source')
        .optional()
        .isIn(['pricing-calculator', 'contact-form', 'phone-call', 'email', 'referral', 'website', 'other'])
        .withMessage('Invalid source'),

    body('marketingConsent')
        .optional()
        .isBoolean()
        .withMessage('Marketing consent must be a boolean'),

    body('termsAccepted')
        .optional()
        .isBoolean()
        .withMessage('Terms accepted must be a boolean'),

    handleValidationErrors
];

// Pricing request update validation
export const validatePricingUpdate = [
    body('status')
        .optional()
        .isIn(['new', 'reviewed', 'quoted', 'follow-up', 'converted', 'lost', 'archived'])
        .withMessage('Invalid status'),

    body('priority')
        .optional()
        .isIn(['Low', 'Medium', 'High', 'Hot'])
        .withMessage('Invalid priority'),

    body('urgencyLevel')
        .optional()
        .isIn(['Low', 'Medium', 'High', 'Critical'])
        .withMessage('Invalid urgency level'),

    body('implementationTimeframe')
        .optional()
        .isIn(['Immediate', '1-3 months', '3-6 months', '6+ months', 'Just exploring'])
        .withMessage('Invalid implementation timeframe'),

    body('budgetRange')
        .optional()
        .isIn(['<5K', '5K-15K', '15K-30K', '30K-50K', '50K+', 'Not Disclosed'])
        .withMessage('Invalid budget range'),

    body('rcmServicesNeeded')
        .optional()
        .isArray()
        .withMessage('RCM services needed must be an array'),

    body('rcmServicesNeeded.*')
        .optional()
        .isIn([
            'billing-coding', 'ar-calling-followup', 'eligibility-verification',
            'payment-posting', 'denial-management', 'qa-audits', 'credentialing',
            'revenue-analytics', 'dedicated-staff-fte', 'software-only-access'
        ])
        .withMessage('Invalid RCM service selection'),

    body('currentChallenges')
        .optional()
        .isArray()
        .withMessage('Current challenges must be an array'),

    body('decisionTimeline')
        .optional()
        .isIn(['Within 1 month', '1-3 months', '3-6 months', '6+ months', 'No timeline'])
        .withMessage('Invalid decision timeline'),

    body('followUpDate')
        .optional()
        .isISO8601()
        .withMessage('Follow-up date must be a valid date'),

    body('assignedTo')
        .optional()
        .isMongoId()
        .withMessage('Assigned to must be a valid user ID'),

    handleValidationErrors
];