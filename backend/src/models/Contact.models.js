// backend/src/models/Contact.models.js

import { Schema, model, mongoose } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const contactSchema = new Schema({
    // Unique Identifier For Tracking
    contactId: {
        type: String,
        default: () => `CNT-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Contact Information
    firstName: {
        type: String,
        required: [true, 'First Name Is Required!'],
        trim: true,
        maxlength: [50, 'First Name Cannot Exceed 50 Characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name Is Required!'],
        trim: true,
        maxLength: [50, 'Last Name Cannot Exceed 50 Characters']
    },
    email: {
        type: String,
        required: [true, 'Email Is Required!'],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please Provide A Valid Email Address'
        ]
    },
    phone: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
    },

    // Company Information
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
    companySize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '500+']
    },
    industryType: {
        type: String,
        enum: ['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'other'],
        default: 'other'
    },

    // Location
    country: {
        type: String,
        trim: true,
        maxlength: [50, 'Country cannot exceed 50 characters']
    },
    state: {
        type: String,
        trim: true,
        maxlength: [50, 'State cannot exceed 50 characters']
    },
    city: {
        type: String,
        trim: true,
        maxlength: [50, 'City cannot exceed 50 characters']
    },
    zipCode: {
        type: Number,
    },

    // Inquiry Details
    inquiryType: {
        type: String,
        required: [true, 'Inquiry Type Is Required'],
        enum: [
            'general-inquiry',
            'demo-request',
            'pricing-request',
            'support-request',
            'partnership',
            'sales-inquiry',
            'product-inquiry',
            'service-inquiry',
            'consultation',
            'other'
        ]
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
        maxlength: [200, 'Subject cannot exceed 200 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [2000, 'Message cannot exceed 2000 characters']
    },

    // Specific Interest Areas
    interestedServices: [
        {
            type: String,
            enum: [
                'provider-rcm',
                'billing-company-support',
                'ar-management',
                'coding',
                'credentialing',
                'denial-management',
                'payment-posting',
                'collections'
            ]
        }
    ],
    interestedProducts: [
        {
            type: String,
            enum: [
                'bet-tool',
                'qms',
                'ebv-bot',
                'rcm-blackbox',
                'smartdash'
            ]
        }
    ],

    // Business Context
    currentChallenges: [
        {
            type: String,
            enum: [
                'high-denial-rate',
                'slow-collections',
                'staff-shortage',
                'compliance-issues',
                'technology-gaps',
                'cost-reduction',
                'process-improvement',
                'reporting-analytics',
                'other'
            ]
        }
    ],
    monthlyClaimsVolume: {
        type: String,
        enum: ['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+']
    },
    currentEHR: {
        type: String,
        trim: true,
        maxlength: [100, 'Current EHR cannot exceed 100 characters']
    },
    timeframe: {
        type: String,
        enum: ['immediate', '1-3-months', '3-6-months', '6-12-months', 'planning-stage']
    },
    budget: {
        type: String,
        enum: ['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+', 'not-disclosed']
    },

    // Contact Management
    status: {
        type: String,
        enum: ['new', 'contacted', 'qualified', 'proposal-sent', 'follow-up', 'closed-won', 'closed-lost', 'nurturing'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'low'
    },
    leadScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    // Lead Source Tracking
    leadSource: {
        type: String,
        enum: ['website', 'referral', 'social-media', 'advertisement', 'conference', 'webinar', 'content-download', 'other'],
        default: 'website'
    },
    referralSource: {
        type: String,
        trim: true,
    },
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    utmTerm: String,
    utmContent: String,

    // Assignment and Follow-up
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    nextFollowUp: Date,
    lastContactDate: Date,

    // Communication History
    notes: [{
        content: {
            type: String,
            required: true,
            maxlength: [1000, 'Note cannot exceed 1000 characters']
        },
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        },
        type: {
            type: String,
            enum: ['call', 'email', 'meeting', 'note', 'follow-up'],
            default: 'note'
        }
    }],

    // Email Communication
    emailsSent: [{
        subject: String,
        template: String,
        sentAt: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'],
            default: 'sent'
        }
    }],

    // Technical Information
    ipAddress: String,
    userAgent: String,
    sessionId: String,

    // Consent and Preferences
    marketingConsent: {
        type: Boolean,
        default: false
    },
    communicationPreference: {
        type: String,
        enum: ['email', 'phone', 'both'],
        default: 'email'
    },

    // Integration Data
    crmId: String,  // For CRM Integration
    salesforceId: String,   // If using Salesforce
    hubspotId: String,  // If using HubSpot

    // Conversion References
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead'
    },
    pricingRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PricingRequest'
    },

    // Flags
    isSpam: {
        type: Boolean,
        default: false
    },
    isConverted: {
        type: Boolean,
        default: false
    },
    convertedTo: {
        type: String,
        enum: ['user', 'lead', 'customer']
    },
    convertedAt: Date,

    // Auto-response
    autoResponseSent: {
        type: Boolean,
        default: false
    },
    autoResponseSentAt: Date

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual For Full Name
contactSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual For Days Since Created
contactSchema.virtual('daysSinceCreated').get(function () {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual For Overdue Follow-up
contactSchema.virtual('isOverdue').get(function () {
    return this.nextFollowUp && this.nextFollowUp < new Date();
});

// Indexes for performance
contactSchema.index({ email: 1 }, { unique: true });
contactSchema.index({ contactId: 1 }, { unique: true });
contactSchema.index({ status: 1 });
contactSchema.index({ assignedTo: 1 });
contactSchema.index({ inquiryType: 1 });
contactSchema.index({ leadSource: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ nextFollowUp: 1 });
contactSchema.index({ leadScore: -1 });

// Compound indexes
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ assignedTo: 1, status: 1 });

// Instance Methods

// Calculate lead score based on various factors
contactSchema.methods.calculateLeadScore = function () {
    let score = 0;

    // Company size scoring
    const companySizeScores = {
        '1-10': 10,
        '11-50': 20,
        '51-200': 30,
        '201-500': 40,
        '500+': 50
    };
    if (this.companySize) {
        score += companySizeScores[this.companySize] || 0;
    }

    // Claims volume scoring
    const claimsVolumeScores = {
        '<1000': 5,
        '1000-5000': 15,
        '5000-10000': 25,
        '10000-50000': 35,
        '50000+': 45
    };
    if (this.monthlyClaimsVolume) {
        score += claimsVolumeScores[this.monthlyClaimsVolume] || 0;
    }

    // Inquiry type scoring
    const inquiryTypeScores = {
        'demo-request': 25,
        'pricing-request': 30,
        'sales-inquiry': 20,
        'consultation': 25,
        'general-inquiry': 10,
        'support-request': 5
    };
    score += inquiryTypeScores[this.inquiryType] || 10;

    // Timeframe scoring
    const timeframeScores = {
        'immediate': 30,
        '1-3-months': 25,
        '3-6-months': 15,
        '6-12-months': 10,
        'planning-stage': 5
    };
    if (this.timeframe) {
        score += timeframeScores[this.timeframe] || 0;
    }

    // Multiple interests bonus
    const totalInterests = (this.interestedServices?.length || 0) + (this.interestedProducts?.length || 0);
    if (totalInterests > 1) {
        score += Math.min(totalInterests * 5, 15); // Max 15 bonus points
    }

    // Budget scoring
    const budgetScores = {
        '500k+': 25,
        '100k-500k': 20,
        '50k-100k': 15,
        '10k-50k': 10,
        '<10k': 5
    };
    if (this.budget && this.budget !== 'not-disclosed') {
        score += budgetScores[this.budget] || 0;
    }

    this.leadScore = Math.min(score, 100); // Cap at 100
    return this.leadScore;
};

// Add note to contact
contactSchema.methods.addNote = function (content, addedBy, type, isPrivate) {
    this.notes.push({
        content: content,
        addedBy: addedBy,
        type: type || 'general',
        isPrivate: isPrivate || false,
        addedAt: new Date()
    });
    return this.save();
};

// Update status with automatic priority adjustment
contactSchema.methods.updateStatus = function (newStatus) {
    this.status = newStatus;
    this.lastContactDate = new Date();

    // Auto-adjust priority based on status
    if (['qualified', 'proposal-sent'].includes(newStatus)) {
        this.priority = 'high';
    } else if (newStatus === 'follow-up') {
        this.priority = 'medium';
    }

    return this.save();
};

// Set next follow-up date
contactSchema.methods.scheduleFollowUp = function (days = 7) {
    this.nextFollowUp = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return this.save();
}

// Mark as converted
contactSchema.methods.markAsConverted = function (convertedTo = 'lead', leadId = null) {
    this.isConverted = true;
    this.convertedTo = convertedTo;
    this.convertedAt = new Date();
    this.status = 'closed-won';

    // Link to lead if provided
    if (leadId && convertedTo === 'lead') {
        this.leadId = leadId;
    }

    return this.save();
};

// Record email sent
contactSchema.methods.recordEmailSent = function (subject, template) {
    this.emailsSent.push({
        subject,
        template,
        sentAt: new Date(),
        status: 'sent'
    });
    return this.save();
};

// Static Methods

// Find contacts by status
contactSchema.statics.findByStatus = function (status) {
    return this.find({ status, isSpam: false });
};

// Find overdue follow-ups
contactSchema.statics.findOverdueFollowUps = function () {
    return this.find({
        nextFollowUp: { $lt: new Date() },
        status: { $nin: ['closed-won', 'closed-lost'] },
        isSpam: false
    });
};

// Find high-priority leads
contactSchema.statics.findHighPriorityLeads = function () {
    return this.find({
        priority: { $in: ['high', 'urgent'] },
        status: { $nin: ['closed-won', 'closed-lost'] },
        isSpam: false
    }).sort({ leadScore: -1, createdAt: -1 });
};

// Find contacts by assigned user
contactSchema.statics.findByAssignedUser = function (userId) {
    return this.find({
        assignedTo: userId,
        status: { $nin: ['closed-won', 'closed-lost'] },
        isSpam: false
    });
};

// Get lead statistics
contactSchema.statics.getLeadStats = async function () {
    const stats = await this.aggregate([
        { $match: { isSpam: false } },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
                avgLeadScore: { $avg: '$leadScore' }
            }
        }
    ]);

    const totalContacts = await this.countDocuments({ isSpam: false });
    const convertedContacts = await this.countDocuments({ isConverted: true });
    const conversionRate = totalContacts > 0 ? (convertedContacts / totalContacts * 100).toFixed(2) : 0;

    return {
        byStatus: stats,
        totalContacts,
        convertedContacts,
        conversionRate: parseFloat(conversionRate)
    };
};

const Contact = model('Contact', contactSchema);

export default Contact;