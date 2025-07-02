// backend/src/routes/pricing/pricingRoutes.route.js

import express from 'express';
import {
    createPricingRequest,
    getAllPricingRequests,
    getPricingRequest,
    updatePricingRequest,
    deletePricingRequest,
    sendQuote,
    convertToLead,
    addNote,
    markAsLost,
    getPricingStats,
    getOverdueFollowUps,
    getHighPriorityRequests,
    scheduleFollowUp,
    assignPricingRequest
} from '../../controllers/pricing/pricingController.controller.js';
import {
    protect,
    optionalAuth,
    adminOnly,
    adminOrModerator,
    logActivity
} from '../../middleware/auth.middleware.js';
import { validatePricingRequest, validatePricingUpdate } from '../../middleware/pricingValidation.middleware.js';
import { pricingCalculatorLimiter, generalLimiter } from '../../middleware/rateLimiting.middleware.js';

const router = express.Router();

// Public routes
router.post('/request',
    pricingCalculatorLimiter,
    validatePricingRequest,
    logActivity('pricing_request_submission'),
    createPricingRequest
);

// Protected routes (require authentication)
router.use(protect);
router.use(generalLimiter);

// Admin/Moderator only routes
router.get('/requests',
    adminOrModerator,
    logActivity('pricing_requests_list_view'),
    getAllPricingRequests
);

router.get('/stats',
    adminOrModerator,
    logActivity('pricing_stats_view'),
    getPricingStats
);

router.get('/overdue',
    adminOrModerator,
    logActivity('pricing_overdue_view'),
    getOverdueFollowUps
);

router.get('/high-priority',
    adminOrModerator,
    logActivity('pricing_high_priority_view'),
    getHighPriorityRequests
);

// Individual pricing request operations
router.get('/request/:id',
    logActivity('pricing_request_view'),
    getPricingRequest
);

router.put('/request/:id',
    validatePricingUpdate,
    logActivity('pricing_request_update'),
    updatePricingRequest
);

router.delete('/request/:id',
    adminOnly,
    logActivity('pricing_request_delete'),
    deletePricingRequest
);

// Pricing request management operations
router.post('/request/:id/quote',
    logActivity('pricing_send_quote'),
    sendQuote
);

router.post('/request/:id/convert-to-lead',
    logActivity('pricing_convert_to_lead'),
    convertToLead
);

router.post('/request/:id/notes',
    logActivity('pricing_add_note'),
    addNote
);

router.post('/request/:id/lost',
    logActivity('pricing_mark_as_lost'),
    markAsLost
);

router.put('/request/:id/schedule-followup',
    logActivity('pricing_schedule_followup'),
    scheduleFollowUp
);

router.put('/request/:id/assign',
    adminOrModerator,
    logActivity('pricing_assign'),
    assignPricingRequest
);

export default router;