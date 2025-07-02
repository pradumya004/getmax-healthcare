// backend/src/models/Product.models.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const productSchema = new mongoose.Schema({
    // Unique identifier
    productId: {
        type: String,
        unique: true,
        default: () => `PRD-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Information
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        unique: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    codeName: {
        type: String,
        enum: ['bet-tool', 'qms', 'ebv-bot', 'rcm-blackbox', 'smartdash'],
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    tagline: {
        type: String,
        maxlength: [150, 'Tagline cannot exceed 150 characters']
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description is required'],
        maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    detailedDescription: String,

    // Product Classification
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: [
            'rcm-automation',
            'quality-management',
            'analytics-reporting',
            'workflow-management',
            'integration-tools'
        ]
    },
    type: {
        type: String,
        required: [true, 'Product type is required'],
        enum: ['saas', 'desktop', 'mobile', 'api', 'plugin', 'integrated-solution']
    },
    industry: {
        type: String,
        enum: ['healthcare', 'billing', 'rcm', 'general'],
        default: 'healthcare'
    },

    // Target Audience
    targetUsers: [{
        type: String,
        enum: [
            'billing-managers',
            'rcm-directors',
            'coding-specialists',
            'ar-specialists',
            'compliance-officers',
            'practice-administrators',
            'healthcare-executives',
            'it-administrators'
        ]
    }],
    targetCompanies: [{
        type: String,
        enum: [
            'hospitals',
            'clinics',
            'billing-companies',
            'rcm-companies',
            'laboratories',
            'ambulatory-centers'
        ]
    }],
    companySizeRange: [String],

    // Features and Capabilities
    coreFeatures: [{
        name: {
            type: String,
            required: true
        },
        description: String,
        category: String,
        isHighlighted: {
            type: Boolean,
            default: false
        },
        isNew: {
            type: Boolean,
            default: false
        }
    }],
    modules: [{
        name: String,
        description: String,
        features: [String],
        isOptional: {
            type: Boolean,
            default: false
        },
        additionalCost: Number
    }],
    integrations: [{
        name: String,
        type: {
            type: String,
            enum: ['ehr', 'pms', 'clearinghouse', 'payer', 'crm', 'accounting', 'other']
        },
        status: {
            type: String,
            enum: ['native', 'api', 'planned', 'third-party']
        },
        complexity: String
    }],

    // Technical Specifications
    technical: {
        platform: [{
            type: String,
            enum: ['web', 'windows', 'mac', 'linux', 'ios', 'android', 'cloud']
        }],
        architecture: String,
        database: String,
        apiVersion: String,
        systemRequirements: {
            os: [String],
            memory: String,
            storage: String,
            processor: String,
            network: String
        },
        security: {
            encryption: String,
            authentication: [String],
            compliance: [String],
            certifications: [String]
        },
        performance: {
            uptime: String,
            responseTime: String,
            concurrentUsers: Number,
            dataProcessing: String
        }
    },

    // Pricing and Plans
    pricingModel: {
        type: String,
        enum: ['subscription', 'one-time', 'usage-based', 'freemium', 'custom'],
        required: true
    },
    plans: [{
        name: String,
        price: Number,
        billingCycle: {
            type: String,
            enum: ['monthly', 'annual', 'one-time', 'usage']
        },
        features: [String],
        limitations: [{
            feature: String,
            limit: String
        }],
        isPopular: {
            type: Boolean,
            default: false
        },
        trialDays: Number
    }],
    freeTrial: {
        available: {
            type: Boolean,
            default: true
        },
        duration: Number, // days
        limitations: [String],
        requiresCreditCard: {
            type: Boolean,
            default: false
        }
    },

    // Deployment and Implementation
    deployment: {
        options: [{
            type: String,
            enum: ['cloud', 'on-premise', 'hybrid']
        }],
        setupTime: String,
        implementation: {
            duration: String,
            phases: [String],
            training: String,
            support: String
        },
        migration: {
            supported: Boolean,
            tools: [String],
            timeline: String
        }
    },

    // Support and Documentation
    support: {
        channels: [{
            type: String,
            enum: ['email', 'phone', 'chat', 'ticket', 'knowledge-base']
        }],
        hours: String,
        responseTime: String,
        training: {
            available: Boolean,
            format: [String],
            duration: String
        },
        documentation: {
            userGuide: String,
            apiDocs: String,
            tutorials: [String],
            videos: [String]
        }
    },

    // Product Status and Lifecycle
    status: {
        type: String,
        enum: ['development', 'beta', 'active', 'maintenance', 'deprecated', 'discontinued'],
        default: 'development'
    },
    availability: {
        type: String,
        enum: ['available', 'limited-access', 'waitlist', 'coming-soon', 'unavailable'],
        default: 'coming-soon'
    },
    version: {
        current: String,
        releaseDate: Date,
        changelog: [String]
    },
    roadmap: [{
        feature: String,
        description: String,
        plannedRelease: String,
        status: {
            type: String,
            enum: ['planned', 'in-development', 'testing', 'released']
        }
    }],

    // Media and Assets
    logo: {
        url: String,
        alt: String,
        publicId: String
    },
    featuredImage: {
        url: String,
        alt: String,
        publicId: String
    },
    screenshots: [{
        url: String,
        alt: String,
        caption: String,
        category: String
    }],
    videos: [{
        title: String,
        url: String,
        thumbnail: String,
        duration: String,
        type: {
            type: String,
            enum: ['demo', 'tutorial', 'overview', 'testimonial']
        }
    }],
    documents: [{
        title: String,
        description: String,
        fileUrl: String,
        fileType: String,
        category: String,
        isPublic: Boolean
    }],

    // User Experience
    userInterface: {
        design: String,
        accessibility: [String],
        customization: {
            themes: Boolean,
            dashboards: Boolean,
            workflows: Boolean
        },
        mobileOptimized: Boolean,
        offlineCapability: Boolean
    },
    usability: {
        learningCurve: {
            type: String,
            enum: ['easy', 'moderate', 'complex']
        },
        trainingRequired: Boolean,
        userSatisfaction: Number
    },

    // Analytics and Metrics
    analytics: {
        activeUsers: Number,
        totalDownloads: Number,
        trialSignups: Number,
        conversions: Number,
        churnRate: Number,
        averageUsage: String,
        popularFeatures: [String],
        supportTickets: Number
    },
    feedback: {
        rating: Number,
        reviews: Number,
        testimonials: [{
            quote: String,
            author: String,
            company: String,
            rating: Number
        }],
        featureRequests: [{
            feature: String,
            votes: Number,
            status: String
        }]
    },

    // Marketing and Sales
    salesPoints: [String],
    competitiveAdvantages: [String],
    useCases: [{
        title: String,
        description: String,
        benefits: [String],
        industry: String
    }],
    caseStudies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaseStudy'
    }],

    // SEO and Content
    seoTitle: String,
    metaDescription: String,
    keywords: [String],
    canonicalUrl: String,

    // Related Products
    relatedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    bundles: [{
        name: String,
        products: [String],
        discount: Number,
        description: String
    }],
    addOns: [String],

    // Internal Management
    productManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    developmentTeam: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Flags
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    isNew: {
        type: Boolean,
        default: false
    },
    requiresDemo: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
productSchema.virtual('url').get(function () {
    return `/products/${this.slug}`;
});

productSchema.virtual('conversionRate').get(function () {
    const { trialSignups, conversions } = this.analytics;
    return trialSignups > 0 ? ((conversions / trialSignups) * 100).toFixed(2) : 0;
});

productSchema.virtual('startingPrice').get(function () {
    if (this.plans && this.plans.length > 0) {
        const prices = this.plans.map(plan => plan.price).filter(price => price > 0);
        return prices.length > 0 ? Math.min(...prices) : 0;
    }
    return 0;
});

// Indexes
productSchema.index({ slug: 1 });
productSchema.index({ productId: 1 });
productSchema.index({ codeName: 1 });
productSchema.index({ category: 1 });
productSchema.index({ status: 1 });
productSchema.index({ availability: 1 });
productSchema.index({ isFeatured: 1 });

// Text search index
productSchema.index({
    name: 'text',
    description: 'text',
    'coreFeatures.name': 'text',
    keywords: 'text'
});

// Instance Methods

// Track trial signup
productSchema.methods.trackTrialSignup = function () {
    this.analytics.trialSignups += 1;
    return this.save();
};

// Track conversion
productSchema.methods.trackConversion = function () {
    this.analytics.conversions += 1;
    return this.save();
};

// Add user
productSchema.methods.addUser = function () {
    this.analytics.activeUsers += 1;
    return this.save();
};

// Check feature availability
productSchema.methods.hasFeature = function (featureName, planName = null) {
    if (planName) {
        const plan = this.plans.find(p => p.name === planName);
        return plan ? plan.features.includes(featureName) : false;
    }
    return this.coreFeatures.some(f => f.name === featureName);
};

// Get plan by name
productSchema.methods.getPlan = function (planName) {
    return this.plans.find(plan => plan.name === planName);
};

// Static Methods

// Find active products
productSchema.statics.findActive = function () {
    return this.find({
        status: 'active',
        availability: { $in: ['available', 'limited-access'] }
    });
};

// Find by category
productSchema.statics.findByCategory = function (category) {
    return this.find({
        category,
        status: 'active',
        availability: 'available'
    }).sort({ isFeatured: -1, isPopular: -1 });
};

// Find featured products
productSchema.statics.findFeatured = function () {
    return this.find({
        isFeatured: true,
        status: 'active',
        availability: 'available'
    });
};

// Get product analytics
productSchema.statics.getAnalytics = async function () {
    const totalProducts = await this.countDocuments({ status: 'active' });
    const totalUsers = await this.aggregate([
        { $match: { status: 'active' } },
        { $group: { _id: null, total: { $sum: '$analytics.activeUsers' } } }
    ]);

    const categoryStats = await this.aggregate([
        { $match: { status: 'active' } },
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 },
                totalUsers: { $sum: '$analytics.activeUsers' },
                totalTrials: { $sum: '$analytics.trialSignups' }
            }
        }
    ]);

    return {
        totalProducts,
        totalUsers: totalUsers[0]?.total || 0,
        categoryBreakdown: categoryStats
    };
};

const Product = mongoose.model('Product', productSchema);

export default Product;