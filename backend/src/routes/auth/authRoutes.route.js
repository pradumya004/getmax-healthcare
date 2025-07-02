// backend/src/routes/auth/authRoutes.route.js

import express from 'express';
import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendEmailVerification,
    logoutUser
} from '../../controllers/auth/authController.controller.js';
import {
    protect,
    requireEmailVerification,
    sensitiveOperation,
    logActivity
} from '../../middleware/auth.middleware.js';
import {
    validateRegistration,
    validateLogin,
    validatePasswordChange,
    validateForgotPassword,
    validateResetPassword
} from '../../middleware/authValidation.middleware.js'

import { authLimiter, generalLimiter } from '../../middleware/rateLimiting.middleware.js';

const router = express.Router();

// Public routes
router.post('/register',
    generalLimiter,
    validateRegistration,
    registerUser
);

router.post('/login',
    authLimiter,
    validateLogin,
    logActivity('login'),
    loginUser
);

router.post('/forgot-password',
    authLimiter,
    validateForgotPassword,
    forgotPassword
);

router.post('/reset-password',
    authLimiter,
    validateResetPassword,
    resetPassword
);

router.post('/verify-email',
    generalLimiter,
    verifyEmail
);

// Protected routes (require authentication)
router.use(protect); // All routes below require authentication

router.get('/me',
    logActivity('profile_view'),
    getCurrentUser
);

router.put('/me',
    generalLimiter,
    logActivity('profile_update'),
    updateProfile
);

router.post('/change-password',
    authLimiter,
    validatePasswordChange,
    sensitiveOperation,
    logActivity('password_change'),
    changePassword
);

router.post('/resend-verification',
    generalLimiter,
    logActivity('resend_verification'),
    resendEmailVerification
);

router.post('/logout',
    logActivity('logout'),
    logoutUser
);

// Routes that require email verification
router.use(requireEmailVerification);

// Add any routes here that require verified email
// Example:
// router.get('/premium-feature', someController);

export default router;