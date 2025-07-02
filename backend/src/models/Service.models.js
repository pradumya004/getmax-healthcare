// backend/src/models/Service.models.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const serviceSchema = new mongoose.Schema({
    // Unique identifier
    serviceId: {
        type: String,
        unique: true,
        default: () => `SVC-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Information
    name: {
        type: String,
        required: [true, 'Service name is required'],
        trim: true,
        unique: true,
        maxlength: [100, 'Service name cannot exceed 100 characters']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        trim: true,
        maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    detailedDescription: String,

    // Service Classification
    category: {
        type: String,
        required: [true, 'Service category is required'],
        enum: [
            'provider-rcm',
            'billing-company-support',
            'revenue-cycle-services',
            'coding-services',
            'compliance-services',
            'technology-services',
            'consulting-services'
        ]
    },
    type: {
        type: String,
        required: [true, 'Service type is required'],
        enum: [
            'full-rcm',
            'ar-management',
            'coding',
            'credentialing',
            'denial-management',
            'payment-posting',
            'eligibility-verification',
            'collections',
            'consulting',
            'automation-setup',
            'qa-auditing',
            'reporting-analytics'
        ]
    },
    subServices: [String],

    // Target Audience
    targetClients: [{
        type: String,
        enum: [
            'hospitals',
            'clinics',
            'multi-specialty-practices',
            'billing-companies',
            'tpas',
            'laboratories',
            'ambulatory-centers',
            'individual-practitioners'
        ]
    }],
    industryFocus: [String],
    clientSizeRange: [{
        type: String,
        enum: ['small', 'medium', 'large', 'enterprise']
    }],

    // Service Features and Benefits
    keyFeatures: [{
        feature: {
            type: String,
            required: true
        },
        description: String,
        isHighlighted: {
            type: Boolean,
            default: false
        }
    }],
    benefits: [String],
    outcomes: [String],
    deliverables: [String],

    // Pricing Information
    pricingModel: {
        type: String,
        enum: ['percentage-based', 'per-claim', 'fte-based', 'hourly', 'fixed-price', 'hybrid', 'custom'],
        required: true
    },
    pricingTiers: [{
        name: String,
        description: String,
        basePrice: Number,
        unit: {
            type: String,
            enum: ['per-claim', 'per-month', 'per-hour', 'percentage', 'per-fte']
        },
        volumeDiscounts: [{
            minVolume: Number,
            maxVolume: Number,
            discountPercentage: Number
        }],
        features: [String]
    }],
    basePrice: {
        amount: Number,
        unit: String,
        currency: {
            type: String,
            default: 'USD'
        }
    },
    customPricingAvailable: {
        type: Boolean,
        default: true
    },

    // Service Level Agreements
    sla: {
        responseTime: {
            initial: String, // e.g., "24 hours"
            resolution: String // e.g., "48 hours"
        },
        availability: {
            uptime: String, // e.g., "99.9%"
            supportHours: String // e.g., "24/7"
        },
        performanceMetrics: [{
            metric: String,
            target: String,
            measurement: String
        }],
        penalties: String,
        escalationProcess: String
    },

    // Requirements and Prerequisites
    requirements: {
        technical: [String],
        operational: [String],
        compliance: [String],
        training: [String]
    },
    prerequisites: [String],
    integrations: [{
        system: String,
        type: {
            type: String,
            enum: ['ehr', 'pms', 'clearinghouse', 'payer', 'other']
        },
        required: Boolean,
        complexity: {
            type: String,
            enum: ['simple', 'moderate', 'complex']
        }
    }],

    // Implementation Process
    implementation: {
        duration: String,
        phases: [{
            name: String,
            description: String,
            duration: String,
            deliverables: [String]
        }],
        timeline: String,
        resources: [String],
        training: {
            duration: String,
            format: {
                type: String,
                enum: ['online', 'onsite', 'hybrid']
            },
            materials: [String]
        }
    },

    // Team and Resources
    teamStructure: [{
        role: String,
        count: Number,
        experience: String,
        certifications: [String]
    }],
    dedicatedTeam: {
        type: Boolean,
        default: false
    },
    teamLocation: {
        type: String,
        enum: ['onshore', 'offshore', 'hybrid']
    },

    // Quality and Compliance
    qualityStandards: [String],
    certifications: [String],
    complianceFrameworks: [{
        type: String,
        enum: ['hipaa', 'sox', 'iso27001', 'mgma', 'aapc', 'ahima']
    }],
    auditFrequency: String,
    reportingFrequency: String,

    // Technology and Tools
    technologyStack: [String],
    proprietaryTools: [String],
    thirdPartyTools: [String],
    securityMeasures: [String],
    dataBackup: String,
    disasterRecovery: String,

    // Performance Metrics
    kpis: [{
        metric: String,
        target: String,
        current: String,
        trend: {
            type: String,
            enum: ['improving', 'stable', 'declining']
        }
    }],
    benchmarks: [{
        metric: String,
        industryAverage: String,
        ourPerformance: String
    }],

    // Status and Availability
    status: {
        type: String,
        enum: ['active', 'inactive', 'deprecated', 'coming-soon', 'pilot'],
        default: 'active'
    },
    availability: {
        type: String,
        enum: ['available', 'waitlist', 'capacity-limited', 'unavailable'],
        default: 'available'
    },
    launchDate: Date,
    lastUpdated: Date,

    // Marketing and Sales
    salesPitch: String,
    competitiveAdvantages: [String],
    useCases: [{
        title: String,
        description: String,
        industry: String,
        clientSize: String
    }],
    testimonials: [{
        quote: String,
        author: String,
        company: String,
        industry: String
    }],

    // Content and Resources
    featuredImage: {
        url: String,
        alt: String,
        publicId: String
    },
    gallery: [{
        url: String,
        alt: String,
        caption: String,
        type: String
    }],
    documents: [{
        title: String,
        description: String,
        fileUrl: String,
        fileType: String,
        isPublic: Boolean
    }],
    videos: [{
        title: String,
        url: String,
        duration: String,
        thumbnail: String
    }],

    // SEO and Marketing
    seoTitle: String,
    metaDescription: String,
    keywords: [String],
    canonicalUrl: String,

    // Related Services and Packages
    relatedServices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    packageDeals: [{
        name: String,
        services: [String],
        discount: Number,
        description: String
    }],
    addOnServices: [String],

    // Analytics
    inquiries: {
        type: Number,
        default: 0
    },
    demos: {
        type: Number,
        default: 0
    },
    conversions: {
        type: Number,
        default: 0
    },
    activeClients: {
        type: Number,
        default: 0
    },
    revenue: {
        monthly: Number,
        annual: Number
    },

    // Internal Information
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    serviceManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    internalNotes: String,

    // Flags
    isPopular: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isCustomizable: {
        type: Boolean,
        default: true
    },
    requiresApproval: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
serviceSchema.virtual('url').get(function () {
    return `/services/${this.slug}`;
});

serviceSchema.virtual('conversionRate').get(function () {
    return this.inquiries > 0 ? ((this.conversions / this.inquiries) * 100).toFixed(2) : 0;
});

serviceSchema.virtual('averagePrice').get(function () {
    if (this.pricingTiers && this.pricingTiers.length > 0) {
        const prices = this.pricingTiers.map(tier => tier.basePrice).filter(price => price);
        return prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    }
    return this.basePrice?.amount || 0;
});

// Indexes
serviceSchema.index({ slug: 1 });
serviceSchema.index({ serviceId: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ type: 1 });
serviceSchema.index({ status: 1 });
serviceSchema.index({ availability: 1 });
serviceSchema.index({ isPopular: 1 });
serviceSchema.index({ isFeatured: 1 });

// Compound indexes
serviceSchema.index({ category: 1, status: 1 });
serviceSchema.index({ type: 1, availability: 1 });
serviceSchema.index({ targetClients: 1, status: 1 });

// Text search index
serviceSchema.index({
    name: 'text',
    description: 'text',
    'keyFeatures.feature': 'text',
    keywords: 'text'
});

// Instance Methods

// Calculate pricing for specific volume
serviceSchema.methods.calculatePricing = function (volume, clientType = 'standard') {
    if (!this.pricingTiers || this.pricingTiers.length === 0) {
        return this.basePrice?.amount || 0;
    }

    // Find appropriate tier based on volume
    let applicableTier = this.pricingTiers[0];
    for (const tier of this.pricingTiers) {
        if (tier.volumeDiscounts && tier.volumeDiscounts.length > 0) {
            for (const discount of tier.volumeDiscounts) {
                if (volume >= discount.minVolume && volume <= discount.maxVolume) {
                    const basePrice = tier.basePrice || this.basePrice?.amount || 0;
                    return basePrice * (1 - discount.discountPercentage / 100);
                }
            }
        }
    }

    return applicableTier.basePrice || this.basePrice?.amount || 0;
};

// Track inquiry
serviceSchema.methods.trackInquiry = function () {
    this.inquiries += 1;
    return this.save();
};

// Track demo
serviceSchema.methods.trackDemo = function () {
    this.demos += 1;
    return this.save();
};

// Track conversion
serviceSchema.methods.trackConversion = function () {
    this.conversions += 1;
    return this.save();
};

// Add client
serviceSchema.methods.addClient = function () {
    this.activeClients += 1;
    return this.save();
};

// Check eligibility
serviceSchema.methods.checkEligibility = function (clientProfile) {
    const { industryType, companySize, monthlyVolume } = clientProfile;

    // Check target clients
    if (this.targetClients.length > 0 && !this.targetClients.includes(industryType)) {
        return { eligible: false, reason: 'Industry type not supported' };
    }

    // Check client size
    if (this.clientSizeRange.length > 0 && !this.clientSizeRange.includes(companySize)) {
        return { eligible: false, reason: 'Company size not in target range' };
    }

    // Check availability
    if (this.availability !== 'available') {
        return { eligible: false, reason: 'Service currently unavailable' };
    }

    return { eligible: true, reason: 'Eligible for service' };
};

// Static Methods

// Find active services
serviceSchema.statics.findActive = function () {
    return this.find({ status: 'active', availability: 'available' });
};

// Find by category
serviceSchema.statics.findByCategory = function (category) {
    return this.find({
        category,
        status: 'active',
        availability: 'available'
    }).sort({ isPopular: -1, isFeatured: -1 });
};

// Find popular services
serviceSchema.statics.findPopular = function () {
    return this.find({
        isPopular: true,
        status: 'active',
        availability: 'available'
    }).sort({ conversions: -1 });
};

// Search services
serviceSchema.statics.searchServices = function (query) {
    return this.find({
        $text: { $search: query },
        status: 'active',
        availability: 'available'
    }).sort({ score: { $meta: 'textScore' } });
};

// Get service analytics
serviceSchema.statics.getAnalytics = async function () {
    const totalServices = await this.countDocuments({ status: 'active' });
    const totalInquiries = await this.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, total: { $sum: '$inquiries' } } }
    ]);

    const categoryStats = await this.aggregate([
        { $match: { status: 'active' } },
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 },
                totalInquiries: { $sum: '$inquiries' },
                totalConversions: { $sum: '$conversions' }
            }
        }
    ]);

    const avgConversionRate = await this.aggregate([
        { $match: { status: 'active', inquiries: { $gt: 0 } } },
        {
            $group: {
                _id: null,
                avgRate: { $avg: { $multiply: [{ $divide: ['$conversions', '$inquiries'] }, 100] } }
            }
        }
    ]);

    return {
        totalServices,
        totalInquiries: totalInquiries[0]?.total || 0,
        categoryBreakdown: categoryStats,
        averageConversionRate: avgConversionRate[0]?.avgRate || 0
    };
};

const Service = mongoose.model('Service', serviceSchema);

export default Service;