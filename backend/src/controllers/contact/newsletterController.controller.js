// backend/src/controllers/contact/newsletterController.controller.js

import Newsletter from './../../models/Newsletter.models.js';
import Contact from '../../models/Contact.models.js';
import Lead from '../../models/Lead.models.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/ApiResponse.js';
import ApiError from '../../utils/ApiError.js';
import { sendEmail } from '../../services/emailService.js';

// Subscribe to newsletter
export const subscribeToNewsletter = asyncHandler(async (req, res) => {
    const {
        email, firstName, lastName, companyName, jobTitle, industryType, country,
        interests, frequency, source, sourceDetails, utmSource, utmMedium,
        utmCampaign, utmTerm, utmContent, gdprConsent, dataProcessingConsent
    } = req.body;

    // Check if subscription already exists
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
        if (existingSubscription.status === 'active') {
            throw ApiError.conflict('You are already subscribed to our newsletter');
        } else if (existingSubscription.status === 'unsubscribed') {
            // Reactivate subscription
            existingSubscription.status = 'active';
            existingSubscription.subscribedAt = new Date();
            existingSubscription.unsubscribedAt = undefined;
            existingSubscription.interests = interests || existingSubscription.interests;
            existingSubscription.frequency = frequency || existingSubscription.frequency;
            await existingSubscription.save();

            return res.status(200).json(
                ApiResponse.success({ subscription: existingSubscription }, 'Newsletter subscription reactivated successfully')
            );
        }
    }

    // Create new subscription
    const subscription = await Newsletter.create({
        email, firstName, lastName, companyName, jobTitle, industryType, country,
        interests: interests || ['rcm-updates', 'industry-news'],
        frequency: frequency || 'weekly',
        source: source || 'website-footer',
        sourceDetails, utmSource, utmMedium, utmCampaign, utmTerm, utmContent,
        gdprConsent: gdprConsent || false,
        dataProcessingConsent: dataProcessingConsent !== false,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        subscriptionDevice: req.get('User-Agent')?.includes('Mobile') ? 'mobile' : 'desktop'
    });

    // Generate verification token for double opt-in
    const verificationToken = subscription.generateVerificationToken();
    await subscription.save();

    // Check if contact exists and link
    let contact = await Contact.findOne({ email });
    if (contact) {
        subscription.contactId = contact._id;
        await subscription.save();
    }

    // Send confirmation email
    try {
        await sendEmail({
            to: subscription.email,
            subject: 'Confirm Your Newsletter Subscription - GetMax Healthcare',
            template: 'newsletter-confirmation',
            data: {
                name: subscription.fullName,
                verificationToken: verificationToken,
                confirmationUrl: `${process.env.FRONTEND_URL}/newsletter/confirm?token=${verificationToken}`,
                interests: subscription.interests
            }
        });

        subscription.confirmationEmailSent = true;
        await subscription.save();
    } catch (error) {
        console.error('Failed to send confirmation email:', error);
    }

    res.status(201).json(
        ApiResponse.created({
            subscriptionId: subscription.subscriptionId,
            message: 'Please check your email to confirm your subscription'
        }, 'Newsletter subscription created successfully')
    );
});

// Confirm Newsletter Subscription
export const confirmSubscription = asyncHandler(async (req, res) => {
    const { token } = req.body;

    if (!token) {
        throw ApiError.badRequest('Verification token is required');
    }

    const subscription = await Newsletter.findOne({
        verificationToken: token,
        verificationExpire: { $gt: Date.now() }
    });

    if (!subscription) {
        throw ApiError.badRequest('Invalid or expired verification token');
    }

    await subscription.confirmSubscription();

    // Send welcome email
    try {
        await sendEmail({
            to: subscription.email,
            subject: 'Welcome to GetMax Healthcare Newsletter!',
            template: 'newsletter-welcome',
            data: {
                name: subscription.fullName,
                interests: subscription.interests,
                frequency: subscription.frequency
            }
        });
    } catch (error) {
        console.error('Failed to send welcome email:', error);
    }

    res.json(
        ApiResponse.success({}, 'Newsletter subscription confirmed successfully')
    );
});

// Unsubscribe From Newsletter
export const unsubscribeFromNewsletter = asyncHandler(async (req, res) => {
    const { email, token, reason, comment } = req.body;

    let subscription;

    if (token) {
        subscription = await Newsletter.findOne({ unsubscribeToken: token });
    } else if (email) {
        subscription = await Newsletter.findOne({ email, status: 'active' });
    }

    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    await subscription.unsubscribe(reason, comment);

    res.json(
        ApiResponse.success({}, 'Successfully unsubscribed from newsletter')
    );
});

// Get All Newsletter Subscriptions
export const getAllSubscriptions = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        status,
        source,
        segment,
        engagementLevel,
        search
    } = req.query;

    const query = {};

    // Add filters
    if (status) query.status = status;
    if (source) query.source = source;
    if (segment) query.segments = segment;
    if (engagementLevel) {
        const scoreRanges = {
            'high': { $gte: 80 },
            'medium': { $gte: 50, $lt: 80 },
            'low': { $gte: 20, $lt: 50 },
            'very-low': { $lt: 20 }
        };
        if (scoreRanges[engagementLevel]) {
            query.engagementScore = scoreRanges[engagementLevel];
        }
    }

    // Search functionality
    if (search) {
        query.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { companyName: { $regex: search, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;

    const subscriptions = await Newsletter.find(query)
        .populate('contactId', 'contactId status leadScore')
        .populate('leadId', 'leadId status stage')
        .sort({ subscribedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Newsletter.countDocuments(query);

    res.json(
        ApiResponse.success({
            subscriptions,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        }, 'Newsletter subscriptions retrieved successfully')
    );
});

// Get Single Subscription
export const getSubscription = asyncHandler(async (req, res) => {
    const subscription = await Newsletter.findById(req.params.id)
        .populate('contactId', 'contactId status leadScore')
        .populate('leadId', 'leadId status stage');

    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    res.json(
        ApiResponse.success({ subscription }, 'Subscription retrieved successfully')
    );
});

// Update Subscription
export const updateSubscription = asyncHandler(async (req, res) => {
    const allowedUpdates = [
        'firstName', 'lastName', 'companyName', 'jobTitle', 'industryType',
        'country', 'interests', 'frequency', 'segments', 'tags'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    });

    if (Object.keys(updates).length === 0) {
        throw ApiError.badRequest('No valid fields to update');
    }

    const subscription = await Newsletter.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
    );

    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    res.json(
        ApiResponse.success({ subscription }, 'Subscription updated successfully')
    );
});

// Delete Subscription
export const deleteSubscription = asyncHandler(async (req, res) => {
    const subscription = await Newsletter.findById(req.params.id);

    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    await subscription.deleteOne();

    res.json(
        ApiResponse.success({}, 'Subscription deleted successfully')
    );
});

// Track Email Management
export const trackEmailEngagement = asyncHandler(async (req, res) => {
    const { action } = req.params;
    const { email, campaignId } = req.body;

    if (!email || !['opened', 'clicked', 'bounced', 'complained'].includes(action)) {
        throw ApiError.badRequest('Invalid tracking parameters');
    }

    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    await subscription.updateEmailStats(action);

    // Update campaign history if provided
    if (campaignId) {
        const campaignIndex = subscription.campaigns.findIndex(c => c.campaignId === campaignId);
        if (campaignIndex >= 0) {
            subscription.campaigns[campaignIndex][action] = true;
            await subscription.save();
        }
    }

    res.json(
        ApiResponse.success({}, 'Email engagement tracked successfully')
    );
});

// Add Subscriber To Segment
export const addToSegment = asyncHandler(async (req, res) => {
    const { segment } = req.body;

    if (!segment) {
        throw ApiError.badRequest('Segment is required');
    }

    const subscription = await Newsletter.findById(req.params.id);
    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    await subscription.addToSegment(segment);

    res.json(
        ApiResponse.success({}, 'Subscriber added to segment successfully')
    );
});

// Add Tag To Subscriber
export const addTag = asyncHandler(async (req, res) => {
    const { tag } = req.body;

    if (!tag) {
        throw ApiError.badRequest('Tag is required');
    }

    const subscription = await Newsletter.findById(req.params.id);
    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    await subscription.addTag(tag);

    res.json(
        ApiResponse.success({}, 'Tag added to subscriber successfully')
    );
});

// Get Newsletter Statistics
export const getNewsletterStats = asyncHandler(async (req, res) => {
    const stats = await Newsletter.getSubscriptionStats();

    res.json(
        ApiResponse.success({ stats }, 'Newsletter statistics retrieved successfully')
    );
});

// Get Highly Engaged Subscribers
export const getHighlyEngagedSubscribers = asyncHandler(async (req, res) => {
    const subscribers = await Newsletter.findHighlyEngaged().limit(50);

    res.json(
        ApiResponse.success({ subscribers }, 'Highly engaged subscribers retrieved successfully')
    );
});

// Get Low Engagement Subscribers
export const getLowEngagementSubscribers = asyncHandler(async (req, res) => {
    const subscribers = await Newsletter.findLowEngagement().limit(50);

    res.json(
        ApiResponse.success({ subscribers }, 'Low engagement subscribers retrieved successfully')
    );
});

// Get Subscribers By Segment
export const getSubscribersBySegment = asyncHandler(async (req, res) => {
    const { segment } = req.params;
    const subscribers = await Newsletter.findBySegment(segment);

    res.json(
        ApiResponse.success({ subscribers, segment }, 'Segment subscribers retrieved successfully')
    );
});

// Link Newsletter Subscriber To Contact
export const linkToContact = asyncHandler(async (req, res) => {
    const { contactId } = req.body;

    const subscription = await Newsletter.findById(req.params.id);
    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    const contact = await Contact.findById(contactId);
    if (!contact) {
        throw ApiError.notFound('Contact not found');
    }

    subscription.contactId = contactId;
    await subscription.save();

    res.json(
        ApiResponse.success({}, 'Newsletter subscription linked to contact successfully')
    );
});

// Get Unsubscribe Link
export const generateUnsubscribeLink = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    const unsubscribeToken = subscription.generateUnsubscribeToken();
    await subscription.save();

    const unsubscribeLink = `${process.env.FRONTEND_URL}/newsletter/unsubscribe?token=${unsubscribeToken}`;

    res.json(
        ApiResponse.success({ unsubscribeLink }, 'Unsubscribe link generated successfully')
    );
});