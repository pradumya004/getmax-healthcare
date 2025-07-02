// backend/src/models/Newsletter.models.js

import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const newsletterSchema = new mongoose.Schema({
    // Unique Identifier
    subscriptionId: {
        type: String,
        default: () => `SUB-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Information
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ]
    },
    firstName: {
        type: String,
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },

    // Subscription Details
    status: {
        type: String,
        enum: ['active', 'pending', 'unsubscribed', 'bounced', 'complained'],
        default: 'pending'
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    confirmedAt: Date,
    unsubscribedAt: Date,

    // Preferences
    interests: [{
        type: String,
        enum: [
            'rcm-updates',
            'product-releases',
            'industry-news',
            'best-practices',
            'case-studies',
            'webinars',
            'whitepapers',
            'company-news',
            'promotions'
        ]
    }],
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'bi-weekly', 'monthly'],
        default: 'weekly'
    },
    format: {
        type: String,
        enum: ['html', 'text'],
        default: 'html'
    },

    // Subscription Source
    source: {
        type: String,
        enum: [
            'website-footer',
            'blog-signup',
            'contact-form',
            'lead-magnet',
            'webinar-registration',
            'popup',
            'manual-import',
            'api',
            'referral',
            'social-media',
            'other'
        ],
        default: 'website-footer'
    },
    sourcePage: String,
    sourceDetails: String,

    // Marketing Attribution
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    utmTerm: String,
    utmContent: String,
    referralSource: String,

    // Profile Information (optional)
    companyName: {
        type: String,
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    jobTitle: {
        type: String,
        trim: true,
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    industryType: {
        type: String,
        enum: ['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'other']
    },
    country: {
        type: String,
        trim: true,
        maxlength: [50, 'Country cannot exceed 50 characters']
    },

    // Email Engagement
    emailStats: {
        sent: {
            type: Number,
            default: 0
        },
        delivered: {
            type: Number,
            default: 0
        },
        opened: {
            type: Number,
            default: 0
        },
        clicked: {
            type: Number,
            default: 0
        },
        bounced: {
            type: Number,
            default: 0
        },
        complained: {
            type: Number,
            default: 0
        }
    },

    // Last Email Activity
    lastEmailSent: Date,
    lastEmailOpened: Date,
    lastEmailClicked: Date,

    // Email Engagement Metrics
    openRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    clickRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    engagementScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },

    // Segmentation
    segments: [{
        type: String,
        enum: [
            'new-subscribers',
            'active-subscribers',
            'highly-engaged',
            'low-engagement',
            'potential-customers',
            'existing-customers',
            'hospital-contacts',
            'clinic-contacts',
            'billing-companies',
            'decision-makers',
            'influencers'
        ]
    }],
    tags: [{
        type: String,
        trim: true,
        maxlength: [50, 'Tag cannot exceed 50 characters']
    }],

    // Verification
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationExpire: Date,

    // Double Opt-in
    isDoubleOptIn: {
        type: Boolean,
        default: false
    },
    confirmationEmailSent: {
        type: Boolean,
        default: false
    },

    // Technical Information
    ipAddress: String,
    userAgent: String,
    subscriptionDevice: {
        type: String,
        enum: ['desktop', 'mobile', 'tablet', 'unknown'],
        default: 'unknown'
    },

    // Unsubscribe Information
    unsubscribeReason: {
        type: String,
        enum: [
            'too-frequent',
            'not-relevant',
            'not-interested',
            'spam',
            'changed-email',
            'never-subscribed',
            'other'
        ]
    },
    unsubscribeComment: {
        type: String,
        maxlength: [500, 'Unsubscribe comment cannot exceed 500 characters']
    },
    unsubscribeToken: String,

    // Related Records
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead'
    },

    // Integration IDs
    mailchimpId: String,
    sendgridId: String,
    hubspotId: String,
    marketoId: String,

    // Campaign History
    campaigns: [{
        campaignId: String,
        campaignName: String,
        sentAt: Date,
        opened: Boolean,
        clicked: Boolean,
        bounced: Boolean,
        unsubscribed: Boolean
    }],

    // Data Compliance
    gdprConsent: {
        type: Boolean,
        default: false
    },
    gdprConsentDate: Date,
    dataProcessingConsent: {
        type: Boolean,
        default: true
    },

    // Notes and Comments
    notes: [{
        content: {
            type: String,
            required: true,
            maxlength: [1000, 'Note cannot exceed 1000 characters']
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    }]

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
newsletterSchema.virtual('fullName').get(function () {
    if (this.firstName && this.lastName) {
        return `${this.firstName} ${this.lastName}`;
    }
    return this.firstName || this.email.split('@')[0];
});

// Virtual for days subscribed
newsletterSchema.virtual('daysSubscribed').get(function () {
    const startDate = this.confirmedAt || this.subscribedAt;
    return Math.floor((Date.now() - startDate) / (1000 * 60 * 60 * 24));
});

// Virtual for engagement level
newsletterSchema.virtual('engagementLevel').get(function () {
    if (this.engagementScore >= 80) return 'high';
    if (this.engagementScore >= 50) return 'medium';
    if (this.engagementScore >= 20) return 'low';
    return 'very-low';
});

// Indexes
newsletterSchema.index({ email: 1 }, { unique: true });
newsletterSchema.index({ subscriptionId: 1 }, { unique: true });
newsletterSchema.index({ status: 1 });
newsletterSchema.index({ source: 1 });
newsletterSchema.index({ segments: 1 });
newsletterSchema.index({ engagementScore: -1 });
newsletterSchema.index({ subscribedAt: -1 });

// Compound indexes
newsletterSchema.index({ status: 1, subscribedAt: -1 });
newsletterSchema.index({ segments: 1, engagementScore: -1 });

// Instance Methods

// Calculate engagement score
newsletterSchema.methods.calculateEngagementScore = function () {
    const { sent, opened, clicked } = this.emailStats;

    if (sent === 0) {
        this.engagementScore = 0;
        return 0;
    }

    const openRate = (opened / sent) * 100;
    const clickRate = clicked > 0 ? (clicked / opened) * 100 : 0;

    // Weighted score: 60% open rate, 40% click rate
    const score = (openRate * 0.6) + (clickRate * 0.4);

    this.openRate = Math.round(openRate * 100) / 100;
    this.clickRate = Math.round(clickRate * 100) / 100;
    this.engagementScore = Math.round(score * 100) / 100;

    return this.engagementScore;
};

// Update email stats
newsletterSchema.methods.updateEmailStats = function (action) {
    this.emailStats[action] = (this.emailStats[action] || 0) + 1;

    if (action === 'opened') {
        this.lastEmailOpened = new Date();
    } else if (action === 'clicked') {
        this.lastEmailClicked = new Date();
    }

    this.calculateEngagementScore();
    return this.save();
};

// Confirm subscription
newsletterSchema.methods.confirmSubscription = function () {
    this.status = 'active';
    this.isVerified = true;
    this.confirmedAt = new Date();
    this.verificationToken = undefined;
    this.verificationExpire = undefined;
    return this.save();
};

// Unsubscribe
newsletterSchema.methods.unsubscribe = function (reason, comment) {
    this.status = 'unsubscribed';
    this.unsubscribedAt = new Date();
    this.unsubscribeReason = reason;
    this.unsubscribeComment = comment;
    return this.save();
};

// Add to segment
newsletterSchema.methods.addToSegment = function (segment) {
    if (!this.segments.includes(segment)) {
        this.segments.push(segment);
        return this.save();
    }
    return Promise.resolve(this);
};

// Remove from segment
newsletterSchema.methods.removeFromSegment = function (segment) {
    this.segments = this.segments.filter(s => s !== segment);
    return this.save();
};

// Add tag
newsletterSchema.methods.addTag = function (tag) {
    if (!this.tags.includes(tag)) {
        this.tags.push(tag);
        return this.save();
    }
    return Promise.resolve(this);
};

// Generate unsubscribe token
newsletterSchema.methods.generateUnsubscribeToken = function () {
    this.unsubscribeToken = uuidv4().replace(/-/g, '');
    return this.unsubscribeToken;
};

// Generate verification token
newsletterSchema.methods.generateVerificationToken = function () {
    this.verificationToken = uuidv4().replace(/-/g, '');
    this.verificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    return this.verificationToken;
};

// Static Methods

// Find active subscribers
newsletterSchema.statics.findActiveSubscribers = function () {
    return this.find({ status: 'active', isVerified: true });
};

// Find by segment
newsletterSchema.statics.findBySegment = function (segment) {
    return this.find({
        segments: segment,
        status: 'active',
        isVerified: true
    });
};

// Find highly engaged subscribers
newsletterSchema.statics.findHighlyEngaged = function () {
    return this.find({
        status: 'active',
        isVerified: true,
        engagementScore: { $gte: 70 }
    }).sort({ engagementScore: -1 });
};

// Find low engagement subscribers
newsletterSchema.statics.findLowEngagement = function () {
    return this.find({
        status: 'active',
        isVerified: true,
        engagementScore: { $lte: 20 },
        'emailStats.sent': { $gte: 5 }
    });
};

// Get subscription statistics
newsletterSchema.statics.getSubscriptionStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    const sourceStats = await this.aggregate([
        { $match: { status: 'active' } },
        {
            $group: {
                _id: '$source',
                count: { $sum: 1 }
            }
        }
    ]);

    const totalSubscribers = await this.countDocuments();
    const activeSubscribers = await this.countDocuments({ status: 'active' });
    const averageEngagement = await this.aggregate([
        { $match: { status: 'active' } },
        {
            $group: {
                _id: null,
                avgEngagement: { $avg: '$engagementScore' }
            }
        }
    ]);

    return {
        byStatus: stats,
        bySource: sourceStats,
        totalSubscribers,
        activeSubscribers,
        averageEngagement: averageEngagement[0]?.avgEngagement || 0
    };
};

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;