// backend/src/models/PricingRequest.models.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const pricingRequestSchema = new mongoose.Schema({
    // Unique identifier
    requestId: {
        type: String,
        default: () => `PRC-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Contact Information
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    workEmail: {
        type: String,
        required: [true, 'Work email is required'],
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address'
        ]
    },
    companyName: {
        type: String,
        required: [true, 'Company/Practice name is required'],
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    phoneNumber: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please provide a valid phone number']
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        enum: ['US', 'India', 'Other']
    },

    // Business Volume Information
    claimsPerMonth: {
        type: String,
        required: [true, 'Number of claims billed per month is required'],
        enum: ['<1000', '1000-5000', '5000-10000', '10000-50000', '50000+']
    },
    annualClaimVolume: {
        type: Number,
        min: 0,
        max: 10000000
    },
    monthlyCollections: {
        type: String,
        required: [true, 'Monthly collections is required'],
        enum: ['<10K', '10-50K', '50-100K', '100K+']
    },
    ehrUsed: {
        type: String,
        trim: true,
        maxlength: [100, 'EHR/EMR system cannot exceed 100 characters']
    },

    // Current Setup
    hasInHouseBillingStaff: {
        type: String,
        required: [true, 'In-house billing staff information is required'],
        enum: ['Yes', 'No', 'Partially']
    },
    inHouseStaffCount: {
        type: Number,
        min: 0,
        max: 1000
    },
    currentVendor: {
        type: String,
        trim: true,
        maxlength: [100, 'Current vendor cannot exceed 100 characters']
    },
    currentVendorPricing: {
        type: String,
        trim: true,
        maxlength: [200, 'Current vendor pricing cannot exceed 200 characters']
    },

    // Service Requirements
    rcmServicesNeeded: [{
        type: String,
        enum: [
            'billing-coding',
            'ar-calling-followup',
            'eligibility-verification',
            'payment-posting',
            'denial-management',
            'qa-audits',
            'credentialing',
            'revenue-analytics',
            'dedicated-staff-fte',
            'software-only-access'
        ]
    }],
    specificServices: {
        billingCoding: { type: Boolean, default: false },
        arFollowup: { type: Boolean, default: false },
        eligibilityVerification: { type: Boolean, default: false },
        paymentPosting: { type: Boolean, default: false },
        denialManagement: { type: Boolean, default: false },
        qaAudits: { type: Boolean, default: false },
        credentialing: { type: Boolean, default: false },
        revenueAnalytics: { type: Boolean, default: false },
        dedicatedStaff: { type: Boolean, default: false },
        softwareOnly: { type: Boolean, default: false }
    },

    // Pricing Model Preferences
    preferredPricingModel: {
        type: String,
        required: [true, 'Preferred pricing model is required'],
        enum: ['FTE', 'Per Claim', 'Hybrid', 'Not Sure']
    },
    budgetRange: {
        type: String,
        enum: ['<5K', '5K-15K', '15K-30K', '30K-50K', '50K+', 'Not Disclosed']
    },

    // Current Challenges
    currentChallenges: [{
        type: String,
        enum: [
            'high-denial-rate',
            'slow-ar-recovery',
            'staff-shortage',
            'compliance-issues',
            'lack-of-transparency',
            'poor-reporting',
            'high-costs',
            'technology-gaps',
            'claim-errors',
            'other'
        ]
    }],
    primaryPainPoint: {
        type: String,
        trim: true,
        maxlength: [500, 'Primary pain point cannot exceed 500 characters']
    },

    // Timeline and Urgency
    implementationTimeframe: {
        type: String,
        enum: ['Immediate', '1-3 months', '3-6 months', '6+ months', 'Just exploring']
    },
    urgencyLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },

    // Decision Making
    decisionMaker: {
        type: String,
        enum: ['Yes', 'No', 'Part of team']
    },
    decisionTimeline: {
        type: String,
        enum: ['Within 1 month', '1-3 months', '3-6 months', '6+ months', 'No timeline']
    },
    evaluationCriteria: [{
        type: String,
        enum: ['Cost', 'Quality', 'Technology', 'Support', 'Compliance', 'Speed', 'Transparency']
    }],

    // Calculated Pricing Information
    estimatedPricing: {
        fteModel: {
            monthlyCost: Number,
            annualCost: Number,
            staffCount: Number
        },
        perClaimModel: {
            costPerClaim: Number,
            monthlyCost: Number,
            annualCost: Number
        },
        hybridModel: {
            baseCost: Number,
            variableCost: Number,
            monthlyCost: Number,
            annualCost: Number
        },
        recommendedModel: {
            type: String,
            enum: ['FTE', 'Per Claim', 'Hybrid']
        }
    },

    // ROI and Savings
    potentialSavings: {
        annualSavings: Number,
        costReduction: Number, // percentage
        efficiencyGain: Number, // percentage
        revenueIncrease: Number // percentage
    },

    // Request Status and Management
    status: {
        type: String,
        enum: ['new', 'reviewed', 'quoted', 'follow-up', 'converted', 'lost', 'archived'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Hot'],
        default: 'Medium'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedAt: Date,

    // Follow-up Information
    followUpDate: Date,
    lastContactDate: Date,
    contactAttempts: {
        type: Number,
        default: 0
    },

    // Quote and Proposal
    quoteSent: {
        type: Boolean,
        default: false
    },
    quoteSentAt: Date,
    quoteSentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quoteValidUntil: Date,
    proposalDocument: {
        filename: String,
        url: String,
        uploadedAt: Date
    },

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
            enum: ['call', 'email', 'meeting', 'note', 'quote'],
            default: 'note'
        }
    }],

    // Source and Attribution
    source: {
        type: String,
        enum: ['pricing-calculator', 'contact-form', 'phone-call', 'email', 'referral', 'website', 'other'],
        default: 'pricing-calculator'
    },
    referralSource: String,
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
    utmTerm: String,
    utmContent: String,

    // Technical Information
    ipAddress: String,
    userAgent: String,
    formData: {
        type: mongoose.Schema.Types.Mixed // Store raw form submission data
    },

    // Conversion Tracking
    convertedToLead: {
        type: Boolean,
        default: false
    },
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead'
    },
    convertedToCustomer: {
        type: Boolean,
        default: false
    },
    conversionValue: Number,
    conversionDate: Date,

    // Loss Information
    lostReason: {
        type: String,
        enum: [
            'price-too-high',
            'feature-mismatch',
            'timing-not-right',
            'chose-competitor',
            'internal-solution',
            'budget-constraints',
            'no-response',
            'other'
        ]
    },
    lostDetails: String,
    competitor: String,

    // Email Automation
    autoEmailSent: {
        type: Boolean,
        default: false
    },
    autoEmailSentAt: Date,
    followUpEmailsSent: [{
        emailType: String,
        sentAt: Date,
        opened: Boolean,
        clicked: Boolean
    }],

    // Compliance and Consent
    marketingConsent: {
        type: Boolean,
        default: false
    },
    termsAccepted: {
        type: Boolean,
        default: true
    },

    // Integration Data
    crmId: String,
    salesforceId: String,
    hubspotId: String,

    // Conversion References
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
pricingRequestSchema.virtual('daysSinceRequest').get(function () {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

pricingRequestSchema.virtual('isOverdue').get(function () {
    return this.followUpDate && this.followUpDate < new Date();
});

pricingRequestSchema.virtual('serviceCount').get(function () {
    return this.rcmServicesNeeded ? this.rcmServicesNeeded.length : 0;
});

// Indexes
pricingRequestSchema.index({ workEmail: 1 });
pricingRequestSchema.index({ requestId: 1 }, { unique: true });
pricingRequestSchema.index({ status: 1 });
pricingRequestSchema.index({ assignedTo: 1 });
pricingRequestSchema.index({ createdAt: -1 });
pricingRequestSchema.index({ followUpDate: 1 });
pricingRequestSchema.index({ priority: 1 });

// Compound indexes
pricingRequestSchema.index({ status: 1, createdAt: -1 });
pricingRequestSchema.index({ assignedTo: 1, status: 1 });
pricingRequestSchema.index({ priority: 1, createdAt: -1 });

// Instance Methods

// Calculate estimated pricing based on form data
pricingRequestSchema.methods.calculatePricing = function () {
    const claimsVolumeMap = {
        '<1000': 500,
        '1000-5000': 3000,
        '5000-10000': 7500,
        '10000-50000': 30000,
        '50000+': 75000
    };

    const estimatedClaims = claimsVolumeMap[this.claimsPerMonth] || 3000;
    const serviceMultiplier = Math.max(this.serviceCount * 0.1, 1);

    // FTE Model Calculation
    const fteBaseCost = 4000; // Base cost per FTE
    const requiredFTEs = Math.ceil(estimatedClaims / 2000); // 2000 claims per FTE
    const fteMonthlyCost = requiredFTEs * fteBaseCost * serviceMultiplier;

    // Per Claim Model Calculation
    const basePerClaim = 3; // Base cost per claim
    const perClaimCost = basePerClaim * serviceMultiplier;
    const perClaimMonthlyCost = estimatedClaims * perClaimCost;

    // Hybrid Model Calculation
    const hybridBaseCost = fteMonthlyCost * 0.6;
    const hybridVariableCost = perClaimMonthlyCost * 0.4;
    const hybridMonthlyCost = hybridBaseCost + hybridVariableCost;

    // Determine recommended model
    let recommendedModel = 'FTE';
    if (estimatedClaims < 5000) {
        recommendedModel = 'Per Claim';
    } else if (estimatedClaims > 20000) {
        recommendedModel = 'Hybrid';
    }

    this.estimatedPricing = {
        fteModel: {
            monthlyCost: Math.round(fteMonthlyCost),
            annualCost: Math.round(fteMonthlyCost * 12),
            staffCount: requiredFTEs
        },
        perClaimModel: {
            costPerClaim: Math.round(perClaimCost * 100) / 100,
            monthlyCost: Math.round(perClaimMonthlyCost),
            annualCost: Math.round(perClaimMonthlyCost * 12)
        },
        hybridModel: {
            baseCost: Math.round(hybridBaseCost),
            variableCost: Math.round(hybridVariableCost),
            monthlyCost: Math.round(hybridMonthlyCost),
            annualCost: Math.round(hybridMonthlyCost * 12)
        },
        recommendedModel
    };

    return this.estimatedPricing;
};

// Calculate potential savings
pricingRequestSchema.methods.calculateSavings = function () {
    if (!this.estimatedPricing) {
        this.calculatePricing();
    }

    const currentCostEstimate = this.hasInHouseBillingStaff === 'Yes'
        ? (this.inHouseStaffCount || 3) * 5000 // Estimated cost per in-house staff
        : this.estimatedPricing.fteModel.monthlyCost * 1.3; // 30% higher than our pricing

    const ourCost = this.estimatedPricing[this.estimatedPricing.recommendedModel.toLowerCase() + 'Model'].monthlyCost;
    const annualSavings = (currentCostEstimate - ourCost) * 12;
    const costReduction = ((currentCostEstimate - ourCost) / currentCostEstimate) * 100;

    this.potentialSavings = {
        annualSavings: Math.max(annualSavings, 0),
        costReduction: Math.max(costReduction, 0),
        efficiencyGain: 25, // Estimated efficiency gain
        revenueIncrease: 10 // Estimated revenue increase
    };

    return this.potentialSavings;
};

// Add note to request
pricingRequestSchema.methods.addNote = function (content, addedBy, type = 'note') {
    this.notes.push({
        content,
        addedBy,
        type,
        addedAt: new Date()
    });
    return this.save();
};

// Send quote
pricingRequestSchema.methods.sendQuote = function (sentBy, validDays = 30) {
    this.quoteSent = true;
    this.quoteSentAt = new Date();
    this.quoteSentBy = sentBy;
    this.quoteValidUntil = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000);
    this.status = 'quoted';
    return this.save();
};

// Convert to lead
pricingRequestSchema.methods.convertToLead = function (leadId, contactId = null) {
    this.convertedToLead = true;
    this.leadId = leadId;
    this.status = 'converted';

    // Link contact if provided
    if (contactId) {
        this.contactId = contactId;
    }

    return this.save();
};

// Mark as lost
pricingRequestSchema.methods.markAsLost = function (reason, details, competitor) {
    this.status = 'lost';
    this.lostReason = reason;
    this.lostDetails = details;
    this.competitor = competitor;
    return this.save();
};

// Schedule follow-up
pricingRequestSchema.methods.scheduleFollowUp = function (days = 7) {
    this.followUpDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return this.save();
};

// Static Methods

// Find requests by status
pricingRequestSchema.statics.findByStatus = function (status) {
    return this.find({ status });
};

// Find overdue follow-ups
pricingRequestSchema.statics.findOverdueFollowUps = function () {
    return this.find({
        followUpDate: { $lt: new Date() },
        status: { $nin: ['converted', 'lost', 'archived'] }
    });
};

// Find high-priority requests
pricingRequestSchema.statics.findHighPriority = function () {
    return this.find({
        priority: { $in: ['High', 'Hot'] },
        status: { $nin: ['converted', 'lost', 'archived'] }
    }).sort({ createdAt: -1 });
};

// Get pricing statistics
pricingRequestSchema.statics.getPricingStats = async function () {
    const totalRequests = await this.countDocuments();
    const convertedRequests = await this.countDocuments({ convertedToLead: true });
    const quoteSent = await this.countDocuments({ quoteSent: true });

    const conversionRate = totalRequests > 0 ? (convertedRequests / totalRequests * 100).toFixed(2) : 0;
    const quoteRate = totalRequests > 0 ? (quoteSent / totalRequests * 100).toFixed(2) : 0;

    const statusStats = await this.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    const avgRequestValue = await this.aggregate([
        { $match: { 'estimatedPricing.fteModel.annualCost': { $exists: true } } },
        {
            $group: {
                _id: null,
                avgValue: { $avg: '$estimatedPricing.fteModel.annualCost' }
            }
        }
    ]);

    return {
        totalRequests,
        convertedRequests,
        quoteSent,
        conversionRate: parseFloat(conversionRate),
        quoteRate: parseFloat(quoteRate),
        statusBreakdown: statusStats,
        averageRequestValue: avgRequestValue[0]?.avgValue || 0
    };
};

const PricingRequest = mongoose.model('PricingRequest', pricingRequestSchema);

export default PricingRequest;