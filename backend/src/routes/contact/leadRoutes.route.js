// backend/src/routes/contact/leadRoutes.route.js

import express from 'express';
import {
    createLead,
    getAllLeads,
    getLead,
    updateLead,
    deleteLead,
    addActivity,
    scheduleDemo,
    sendProposal,
    updateQualification,
    convertToCustomer,
    markAsLost,
    getLeadStats,
    getHotLeads,
    getQualifiedLeads,
    assignLead
} from '../../controllers/contact/leadController.controller.js';
import {
    protect,
    restrictTo,
    adminOnly,
    adminOrModerator,
    logActivity
} from '../../middleware/auth.middleware.js';
import { validateLeadCreation, validateLeadUpdate } from '../../middleware/leadValidation.middleware.js';
import { generalLimiter } from '../../middleware/rateLimiting.middleware.js';

const router = express.Router();

// All lead routes require authentication
router.use(protect);
router.use(generalLimiter);

// Lead management routes
router.post('/',
    validateLeadCreation,
    logActivity('lead_create'),
    createLead
);

router.get('/',
    logActivity('leads_list_view'),
    getAllLeads
);

router.get('/stats',
    adminOrModerator,
    logActivity('leads_stats_view'),
    getLeadStats
);

router.get('/hot',
    logActivity('hot_leads_view'),
    getHotLeads
);

router.get('/qualified',
    logActivity('qualified_leads_view'),
    getQualifiedLeads
);

// Individual lead operations
router.get('/:id',
    logActivity('lead_view'),
    getLead
);

router.put('/:id',
    validateLeadUpdate,
    logActivity('lead_update'),
    updateLead
);

router.delete('/:id',
    adminOnly,
    logActivity('lead_delete'),
    deleteLead
);

// Lead activity and engagement
router.post('/:id/activity',
    logActivity('lead_add_activity'),
    addActivity
);

router.post('/:id/demo',
    logActivity('lead_schedule_demo'),
    scheduleDemo
);

router.post('/:id/proposal',
    logActivity('lead_send_proposal'),
    sendProposal
);

// Lead qualification and conversion
router.put('/:id/qualification',
    logActivity('lead_update_qualification'),
    updateQualification
);

router.post('/:id/convert',
    logActivity('lead_convert_to_customer'),
    convertToCustomer
);

router.post('/:id/lost',
    logActivity('lead_mark_as_lost'),
    markAsLost
);

// Lead assignment
router.put('/:id/assign',
    adminOrModerator,
    logActivity('lead_assign'),
    assignLead
);

export default router;