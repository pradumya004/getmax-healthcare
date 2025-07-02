// backend/src/middleware/rateLimiting.middleware.js

import rateLimit from "express-rate-limit";

// General API Rate Limiting
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // 50 requests per window
    message: {
        error: 'Too many requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Authentication Rate Limiting (Stricter)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
    message: {
        error: 'Too many authentication attempts, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Contact Form Rate Limiting
export const contactFormLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30, // 3 submissions per hour per IP
    message: {
        error: 'Too many contact form submissions, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Pricing Calculator Rate Limiting
export const pricingCalculatorLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // 5 pricing requests per hour per IP
    message: {
        error: 'Too many pricing requests, please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Strict Rate Limiting For Sensitive Operations
export const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per window
    message: {
        error: 'Rate limit exceeded for sensitive operations'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Admin Operations Rate Limiting
export const adminLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window for admin users
    message: {
        error: 'Admin rate limit exceeded'
    },
    standardHeaders: true,
    legacyHeaders: false
});