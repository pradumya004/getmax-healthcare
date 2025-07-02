// backend/src/routes/contact/newsletterRoutes.route.js

import express from 'express';
import {
    subscribeToNewsletter,
    confirmSubscription,
    unsubscribeFromNewsletter,
    getAllSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription,
    trackEmailEngagement,
    addToSegment,
    addTag,
    getNewsletterStats,
    getHighlyEngagedSubscribers,
    getLowEngagementSubscribers,
    getSubscribersBySegment,
    linkToContact,
    generateUnsubscribeLink
} from '../../controllers/contact/newsletterController.controller.js';
import {
    protect,
    adminOnly,
    adminOrModerator,
    logActivity
} from '../../middleware/auth.middleware.js';
import {
    validateNewsletterSubscription,
    validateNewsletterUpdate
} from '../../middleware/newsletterValidation.middleware.js';
import {
    contactFormLimiter,
    generalLimiter
} from '../../middleware/rateLimiting.middleware.js';

const router = express.Router();

// Public routes
router.post('/subscribe',
    contactFormLimiter,
    validateNewsletterSubscription,
    logActivity('newsletter_subscription'),
    subscribeToNewsletter
);

router.post('/confirm',
    generalLimiter,
    confirmSubscription
);

router.post('/unsubscribe',
    generalLimiter,
    unsubscribeFromNewsletter
);

// Public tracking endpoint (for email analytics)
router.post('/track/:action',
    trackEmailEngagement
);

// Protected routes (require authentication)
router.use(protect);
router.use(generalLimiter);

// Admin/Moderator only routes
router.get('/subscriptions',
    adminOrModerator,
    logActivity('newsletter_subscriptions_view'),
    getAllSubscriptions
);

router.get('/stats',
    adminOrModerator,
    logActivity('newsletter_stats_view'),
    getNewsletterStats
);

router.get('/highly-engaged',
    adminOrModerator,
    logActivity('newsletter_highly_engaged_view'),
    getHighlyEngagedSubscribers
);

router.get('/low-engagement',
    adminOrModerator,
    logActivity('newsletter_low_engagement_view'),
    getLowEngagementSubscribers
);

router.get('/segment/:segment',
    adminOrModerator,
    logActivity('newsletter_segment_view'),
    getSubscribersBySegment
);

// Individual subscription operations
router.get('/subscription/:id',
    logActivity('newsletter_subscription_view'),
    getSubscription
);

router.put('/subscription/:id',
    validateNewsletterUpdate,
    logActivity('newsletter_subscription_update'),
    updateSubscription
);

router.delete('/subscription/:id',
    adminOnly,
    logActivity('newsletter_subscription_delete'),
    deleteSubscription
);

// Subscription management operations
router.post('/subscription/:id/segment',
    adminOrModerator,
    logActivity('newsletter_add_segment'),
    addToSegment
);

router.post('/subscription/:id/tag',
    adminOrModerator,
    logActivity('newsletter_add_tag'),
    addTag
);

router.post('/subscription/:id/link-contact',
    adminOrModerator,
    logActivity('newsletter_link_contact'),
    linkToContact
);

router.post('/generate-unsubscribe-link',
    adminOrModerator,
    logActivity('newsletter_generate_unsubscribe_link'),
    generateUnsubscribeLink
);

export default router;