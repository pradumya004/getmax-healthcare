// backend/src/models/Lead.models.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const leadSchema = new mongoose.Schema({
    // Unique identifier for tracking
    leadId: {
        type: String,
        default: () => `LEAD-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Information
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
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
    phone: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
    },

    // Company Information
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
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
    companyWebsite: {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/, 'Please provide a valid website URL']
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

    // Lead Generation Source
    leadSource: {
        type: String,
        required: [true, 'Lead source is required'],
        enum: [
            'pricing-calculator',
            'demo-request',
            'whitepaper-download',
            'webinar-registration',
            'blog-subscription',
            'newsletter-signup',
            'contact-form',
            'social-media',
            'paid-advertisement',
            'referral',
            'conference',
            'cold-outreach',
            'website-chat',
            'phone-inquiry',
            'website',
            'partner-referral',
            'other'
        ]
    },
    leadMagnet: {
        type: String,
        trim: true,
        maxlength: [200, 'Lead magnet cannot exceed 200 characters']
    },
    campaign: {
        type: String,
        trim: true,
        maxlength: [100, 'Campaign cannot exceed 100 characters']
    },

    // Business Requirements
    monthlyClaimsVolume: {
        type: String,
        enum: ['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+']
    },
    monthlyCollections: {
        type: String,
        enum: ['<50k', '50k-100k', '100k-500k', '500k-1M', '1M+']
    },
    currentEHR: {
        type: String,
        trim: true,
        maxlength: [100, 'Current EHR cannot exceed 100 characters']
    },
    currentRCMProvider: {
        type: String,
        trim: true,
        maxlength: [100, 'Current RCM provider cannot exceed 100 characters']
    },
    hasInHouseBilling: {
        type: Boolean,
        default: null
    },
    billingStaffCount: {
        type: Number,
        min: 0,
        max: 1000
    },

    // Pain Points and Challenges
    currentChallenges: [{
        type: String,
        enum: [
            'high-denial-rate',
            'slow-collections',
            'staff-shortage',
            'staff-turnover',
            'compliance-issues',
            'technology-gaps',
            'cost-reduction',
            'process-improvement',
            'reporting-analytics',
            'credentialing-delays',
            'ar-management',
            'claim-follow-up',
            'payment-posting',
            'prior-authorization',
            'other'
        ]
    }],
    painPointDetails: {
        type: String,
        trim: true,
        maxlength: [1000, 'Pain point details cannot exceed 1000 characters']
    },

    // Solution Interest
    interestedServices: [{
        type: String,
        enum: [
            'provider-rcm',
            'billing-company-support',
            'ar-management',
            'coding',
            'credentialing',
            'denial-management',
            'payment-posting',
            'collections',
            'consulting',
            'automation-setup'
        ]
    }],
    interestedProducts: [{
        type: String,
        enum: [
            'bet-tool',
            'qms',
            'ebv-bot',
            'rcm-blackbox',
            'smartdash'
        ]
    }],
    serviceType: {
        type: String,
        enum: ['full-rcm', 'partial-rcm', 'software-only', 'consulting', 'not-sure']
    },
    preferredPricingModel: {
        type: String,
        enum: ['percentage-based', 'per-claim', 'fte-based', 'hybrid', 'not-sure']
    },

    // Project Details
    projectTimeframe: {
        type: String,
        enum: ['immediate', '1-3-months', '3-6-months', '6-12-months', 'planning-stage']
    },
    budget: {
        type: String,
        enum: ['<10k', '10k-50k', '50k-100k', '100k-500k', '500k+', 'not-disclosed']
    },
    decisionMakers: [{
        name: String,
        title: String,
        involvement: {
            type: String,
            enum: ['primary', 'influencer', 'gatekeeper', 'user']
        }
    }],
    decisionCriteria: [{
        type: String,
        enum: ['cost', 'quality', 'technology', 'support', 'compliance', 'scalability', 'integration', 'timeline']
    }],

    // Lead Management
    status: {
        type: String,
        enum: [
            'new',
            'contacted',
            'qualified',
            'demo-scheduled',
            'demo-completed',
            'proposal-requested',
            'proposal-sent',
            'negotiation',
            'closed-won',
            'closed-lost',
            'nurturing',
            'unqualified'
        ],
        default: 'new'
    },
    stage: {
        type: String,
        enum: ['awareness', 'interest', 'consideration', 'intent', 'evaluation', 'purchase'],
        default: 'awareness'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'hot'],
        default: 'medium'
    },
    leadScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    qualification: {
        budget: { type: Boolean, default: false },
        authority: { type: Boolean, default: false },
        need: { type: Boolean, default: false },
        timeline: { type: Boolean, default: false }
    },

    // Assignment and Ownership
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedAt: Date,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Follow-up and Activities
    nextFollowUp: Date,
    lastContactDate: Date,
    lastActivityDate: Date,
    contactAttempts: {
        type: Number,
        default: 0
    },

    // Communication History
    activities: [{
        type: {
            type: String,
            enum: ['call', 'email', 'meeting', 'demo', 'proposal', 'note', 'task', 'follow-up'],
            required: true
        },
        subject: {
            type: String,
            required: true,
            maxlength: [200, 'Activity subject cannot exceed 200 characters']
        },
        description: {
            type: String,
            maxlength: [1000, 'Activity description cannot exceed 1000 characters']
        },
        outcome: {
            type: String,
            enum: ['positive', 'neutral', 'negative', 'no-response'],
            default: 'neutral'
        },
        nextAction: String,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        scheduledFor: Date,
        completedAt: Date,
        duration: Number, // in minutes
        attendees: [String]
    }],

    // Demo and Presentation History
    demos: [{
        scheduledAt: Date,
        completedAt: Date,
        demoType: {
            type: String,
            enum: ['product-demo', 'service-overview', 'custom-presentation', 'proof-of-concept']
        },
        attendees: [{
            name: String,
            email: String,
            title: String
        }],
        feedback: String,
        nextSteps: String,
        interestLevel: {
            type: String,
            enum: ['very-high', 'high', 'medium', 'low', 'very-low']
        },
        conductedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],

    // Proposal and Quote History
    proposals: [{
        sentAt: Date,
        proposalType: {
            type: String,
            enum: ['initial-quote', 'formal-proposal', 'revised-proposal', 'final-quote']
        },
        services: [String],
        estimatedValue: Number,
        validUntil: Date,
        status: {
            type: String,
            enum: ['sent', 'viewed', 'under-review', 'approved', 'rejected', 'expired'],
            default: 'sent'
        },
        feedback: String,
        sentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],

    // Conversion and Revenue
    convertedAt: Date,
    conversionValue: Number,
    estimatedAnnualValue: Number,
    actualAnnualValue: Number,

    // Loss Analysis
    lossReason: {
        type: String,
        enum: [
            'price-too-high',
            'chose-competitor',
            'no-budget',
            'timing-not-right',
            'feature-gaps',
            'no-decision',
            'internal-solution',
            'project-cancelled',
            'unresponsive',
            'other'
        ]
    },
    lossDetails: String,
    competitor: String,

    // Marketing Attribution
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    utmTerm: String,
    utmContent: String,
    referralSource: String,

    // Technical Tracking
    ipAddress: String,
    userAgent: String,
    sessionId: String,
    pageViews: [{
        page: String,
        timestamp: Date,
        duration: Number
    }],

    // Data Enrichment
    linkedinProfile: String,
    companyLinkedin: String,
    dataEnrichmentStatus: {
        type: String,
        enum: ['pending', 'enriched', 'failed'],
        default: 'pending'
    },
    enrichedData: {
        companyRevenue: String,
        employeeCount: Number,
        companyIndustry: String,
        technologyStack: [String]
    },

    // Consent and Compliance
    marketingConsent: {
        type: Boolean,
        default: false
    },
    communicationPreference: {
        type: String,
        enum: ['email', 'phone', 'both', 'none'],
        default: 'email'
    },
    doNotContact: {
        type: Boolean,
        default: false
    },

    // Integration IDs
    crmId: String,
    salesforceId: String,
    hubspotId: String,
    marketoId: String,

    // Source References
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },
    pricingRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PricingRequest'
    },

    // Flags and Meta
    isQualified: {
        type: Boolean,
        default: false
    },
    isConverted: {
        type: Boolean,
        default: false
    },
    isDuplicate: {
        type: Boolean,
        default: false
    },
    duplicateOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead'
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
leadSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for days in pipeline
leadSchema.virtual('daysInPipeline').get(function () {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for qualification percentage
leadSchema.virtual('qualificationScore').get(function () {
    const criteria = Object.values(this.qualification);
    const qualified = criteria.filter(Boolean).length;
    return Math.round((qualified / criteria.length) * 100);
});

// Virtual for overdue status
leadSchema.virtual('isOverdue').get(function () {
    return this.nextFollowUp && this.nextFollowUp < new Date();
});

// Indexes for performance
leadSchema.index({ email: 1 });
leadSchema.index({ leadId: 1 }, { unique: true });
leadSchema.index({ status: 1 });
leadSchema.index({ assignedTo: 1 });
leadSchema.index({ leadSource: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ nextFollowUp: 1 });
leadSchema.index({ leadScore: -1 });
leadSchema.index({ stage: 1 });

// Compound indexes
leadSchema.index({ status: 1, assignedTo: 1 });
leadSchema.index({ stage: 1, createdAt: -1 });
leadSchema.index({ priority: 1, leadScore: -1 });

// Instance Methods

// Advanced lead scoring algorithm
leadSchema.methods.calculateLeadScore = function () {
    let score = 0;

    // Company size (20 points max)
    const companySizeScores = {
        '1-10': 5,
        '11-50': 10,
        '51-200': 15,
        '201-500': 18,
        '500+': 20
    };
    score += companySizeScores[this.companySize] || 0;

    // Claims volume (25 points max)
    const claimsVolumeScores = {
        '<1000': 5,
        '1000-5000': 10,
        '5000-10000': 15,
        '10000-50000': 20,
        '50000+': 25
    };
    score += claimsVolumeScores[this.monthlyClaimsVolume] || 0;

    // Lead source quality (15 points max)
    const leadSourceScores = {
        'demo-request': 15,
        'pricing-calculator': 12,
        'whitepaper-download': 8,
        'webinar-registration': 10,
        'referral': 12,
        'contact-form': 8,
        'social-media': 5,
        'cold-outreach': 3
    };
    score += leadSourceScores[this.leadSource] || 5;

    // Project timeframe (15 points max)
    const timeframeScores = {
        'immediate': 15,
        '1-3-months': 12,
        '3-6-months': 8,
        '6-12-months': 5,
        'planning-stage': 2
    };
    score += timeframeScores[this.projectTimeframe] || 0;

    // Budget (10 points max)
    const budgetScores = {
        '500k+': 10,
        '100k-500k': 8,
        '50k-100k': 6,
        '10k-50k': 4,
        '<10k': 2
    };
    if (this.budget && this.budget !== 'not-disclosed') {
        score += budgetScores[this.budget] || 0;
    }

    // Multiple pain points (5 points max)
    if (this.currentChallenges && this.currentChallenges.length > 0) {
        score += Math.min(this.currentChallenges.length * 2, 5);
    }

    // Qualification criteria (10 points max)
    const qualificationCount = Object.values(this.qualification).filter(Boolean).length;
    score += qualificationCount * 2.5;

    this.leadScore = Math.min(score, 100);
    return this.leadScore;
};

// Add activity
leadSchema.methods.addActivity = function (activityData, createdBy) {
    this.activities.push({
        ...activityData,
        createdBy,
        createdAt: new Date()
    });
    this.lastActivityDate = new Date();
    return this.save();
};

// Schedule demo
leadSchema.methods.scheduleDemo = function (demoData) {
    this.demos.push(demoData);
    this.status = 'demo-scheduled';
    return this.save();
};

// Send proposal
leadSchema.methods.sendProposal = function (proposalData, sentBy) {
    this.proposals.push({
        ...proposalData,
        sentBy,
        sentAt: new Date()
    });
    this.status = 'proposal-sent';
    return this.save();
};

// Update qualification
leadSchema.methods.updateQualification = function (criteria) {
    Object.assign(this.qualification, criteria);
    this.isQualified = Object.values(this.qualification).every(Boolean);
    if (this.isQualified && this.status === 'new') {
        this.status = 'qualified';
    }
    return this.save();
};

// Convert to customer
leadSchema.methods.convertToCustomer = function (conversionValue, updateContact = true) {
    this.isConverted = true;
    this.convertedAt = new Date();
    this.conversionValue = conversionValue;
    this.status = 'closed-won';

    // Update linked contact if exists
    if (updateContact && this.contactId) {
        // This would need to be handled in controller with Contact.findByIdAndUpdate
    }

    return this.save();
};

// Mark as lost
leadSchema.methods.markAsLost = function (reason, details, competitor) {
    this.status = 'closed-lost';
    this.lossReason = reason;
    this.lossDetails = details;
    this.competitor = competitor;
    return this.save();
};

// Static Methods

// Find leads by stage
leadSchema.statics.findByStage = function (stage) {
    return this.find({ stage, isDuplicate: false });
};

// Find qualified leads
leadSchema.statics.findQualified = function () {
    return this.find({
        isQualified: true,
        status: { $nin: ['closed-won', 'closed-lost', 'unqualified'] },
        isDuplicate: false
    });
};

// Find hot leads
leadSchema.statics.findHotLeads = function () {
    return this.find({
        $or: [
            { priority: 'hot' },
            { leadScore: { $gte: 80 } },
            { projectTimeframe: 'immediate' }
        ],
        status: { $nin: ['closed-won', 'closed-lost'] },
        isDuplicate: false
    }).sort({ leadScore: -1 });
};

// Get conversion statistics
leadSchema.statics.getConversionStats = async function () {
    const totalLeads = await this.countDocuments({ isDuplicate: false });
    const convertedLeads = await this.countDocuments({ isConverted: true });
    const qualifiedLeads = await this.countDocuments({ isQualified: true });

    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads * 100).toFixed(2) : 0;
    const qualificationRate = totalLeads > 0 ? (qualifiedLeads / totalLeads * 100).toFixed(2) : 0;

    const pipelineStats = await this.aggregate([
        { $match: { isDuplicate: false } },
        {
            $group: {
                _id: '$stage',
                count: { $sum: 1 },
                avgScore: { $avg: '$leadScore' },
                totalValue: { $sum: '$estimatedAnnualValue' }
            }
        }
    ]);

    return {
        totalLeads,
        convertedLeads,
        qualifiedLeads,
        conversionRate: parseFloat(conversionRate),
        qualificationRate: parseFloat(qualificationRate),
        pipelineStats
    };
};

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;