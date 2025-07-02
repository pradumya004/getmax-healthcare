// backend/src/routes/contact/contactRoutes.route.js

import express from 'express';
import rateLimit from 'express-rate-limit';
import {
    createContact,
    getAllContacts,
    getContact,
    updateContact,
    deleteContact,
    convertToLead,
    addNote,
    getContactStats,
    getOverdueFollowUps,
    assignContact
} from '../../controllers/contact/contactController.controller.js';
import {
    protect,
    restrictTo,
    adminOnly,
    adminOrModerator,
    logActivity
} from '../../middleware/auth.middleware.js';
import {
    validateContactCreation,
    validateContactUpdate
} from './../../middleware/contactValidation.middleware.js';
import {
    contactFormLimiter,
    generalLimiter
} from './../../middleware/rateLimiting.middleware.js';

const router = express.Router();

// Public Routes
router.route('/').post(
    contactFormLimiter,
    validateContactCreation,
    logActivity('contact_form_submission'),
    createContact
);

// Protected routes (require authentication)
router.use(protect);
router.use(generalLimiter);

// Admin/Moderator only routes
router.route('/').get(
    adminOrModerator,
    logActivity('contacts_list_view'),
    getAllContacts
);

router.route('/stats').get(
    adminOrModerator,
    logActivity('contacts_stats_view'),
    getContactStats
);

router.route('/overdue').get(
    adminOrModerator,
    logActivity('overdue_followups_view'),
    getOverdueFollowUps
);

// Individual contact operations
router.route('/:id').get(
    logActivity('contact_view'),
    getContact
);

router.route('/:id').put(
    validateContactUpdate,
    logActivity('contact_update'),
    updateContact
);

router.route('/:id').delete(
    adminOnly,
    logActivity('contact_delete'),
    deleteContact
);

// Contact management operations
router.route('/:id/convert-to-lead').post(
    logActivity('contact_convert_to_lead'),
    convertToLead
);

router.route('/:id/notes').post(
    logActivity('contact_add_note'),
    addNote
);

router.route('/:id/assign').put(
    adminOrModerator,
    logActivity('contact_assign'),
    assignContact
);

export default router;