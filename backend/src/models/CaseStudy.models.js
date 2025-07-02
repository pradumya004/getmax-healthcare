// backend/src/models/CaseStudy.models.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const caseStudySchema = new mongoose.Schema({
    // Unique identifier
    caseId: {
        type: String,
        unique: true,
        default: () => `CASE-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Information
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true,
        maxlength: [300, 'Subtitle cannot exceed 300 characters']
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required'],
        trim: true,
        maxlength: [500, 'Excerpt cannot exceed 500 characters']
    },

    // Client Information
    client: {
        name: {
            type: String,
            required: [true, 'Client name is required'],
            trim: true
        },
        displayName: {
            type: String, // Anonymized name if needed
            trim: true
        },
        industry: {
            type: String,
            enum: ['hospital', 'clinic', 'billing-company', 'tpa', 'laboratory', 'multi-specialty', 'other'],
            required: true
        },
        size: {
            type: String,
            enum: ['small', 'medium', 'large', 'enterprise'],
            required: true
        },
        location: {
            city: String,
            state: String,
            country: String
        },
        website: String,
        logo: {
            url: String,
            alt: String,
            publicId: String
        }
    },

    // Project Overview
    challenge: {
        summary: {
            type: String,
            required: [true, 'Challenge summary is required'],
            maxlength: [1000, 'Challenge summary cannot exceed 1000 characters']
        },
        painPoints: [{
            type: String,
            enum: [
                'high-denial-rate',
                'slow-ar-recovery',
                'staff-shortage',
                'compliance-issues',
                'poor-visibility',
                'manual-processes',
                'technology-gaps',
                'cost-overruns',
                'billing-errors',
                'credentialing-delays',
                'payment-delays',
                'other'
            ]
        }],
        specificChallenges: [String],
        impactOnBusiness: String
    },

    solution: {
        summary: {
            type: String,
            required: [true, 'Solution summary is required'],
            maxlength: [1000, 'Solution summary cannot exceed 1000 characters']
        },
        servicesImplemented: [{
            type: String,
            enum: [
                'full-rcm',
                'ar-management',
                'coding',
                'credentialing',
                'denial-management',
                'payment-posting',
                'eligibility-verification',
                'consulting',
                'automation-setup'
            ]
        }],
        productsUsed: [{
            type: String,
            enum: ['bet-tool', 'qms', 'ebv-bot', 'rcm-blackbox', 'smartdash']
        }],
        implementationDetails: String,
        timeline: {
            startDate: Date,
            endDate: Date,
            duration: String // e.g., "3 months"
        }
    },

    // Results and Metrics
    results: {
        summary: {
            type: String,
            required: [true, 'Results summary is required'],
            maxlength: [1000, 'Results summary cannot exceed 1000 characters']
        },
        keyMetrics: [{
            metric: {
                type: String,
                required: true,
                enum: [
                    'denial-rate-reduction',
                    'ar-days-improvement',
                    'clean-claim-rate',
                    'collection-rate',
                    'cost-reduction',
                    'revenue-increase',
                    'efficiency-gain',
                    'staff-productivity',
                    'compliance-score',
                    'patient-satisfaction'
                ]
            },
            beforeValue: {
                type: String,
                required: true
            },
            afterValue: {
                type: String,
                required: true
            },
            improvement: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                enum: ['percentage', 'days', 'dollars', 'count', 'score']
            }
        }],
        financialImpact: {
            costSavings: Number,
            revenueIncrease: Number,
            roi: Number, // Return on investment percentage
            paybackPeriod: String
        },
        operationalImpact: [String],
        qualitativeResults: [String]
    },

    // Testimonials and Quotes
    testimonials: [{
        quote: {
            type: String,
            required: true,
            maxlength: [1000, 'Quote cannot exceed 1000 characters']
        },
        author: {
            name: String,
            title: String,
            company: String
        },
        featured: {
            type: Boolean,
            default: false
        }
    }],

    // Media and Assets
    featuredImage: {
        url: String,
        alt: String,
        caption: String,
        publicId: String
    },
    images: [{
        url: String,
        alt: String,
        caption: String,
        publicId: String,
        type: {
            type: String,
            enum: ['before', 'after', 'process', 'team', 'results', 'other']
        }
    }],
    charts: [{
        title: String,
        description: String,
        chartType: {
            type: String,
            enum: ['bar', 'line', 'pie', 'comparison', 'timeline']
        },
        data: mongoose.Schema.Types.Mixed,
        imageUrl: String
    }],
    documents: [{
        title: String,
        description: String,
        fileUrl: String,
        fileName: String,
        fileType: String,
        isPublic: {
            type: Boolean,
            default: false
        }
    }],

    // Content Structure
    content: {
        overview: String,
        challengeDetails: String,
        solutionDetails: String,
        implementationProcess: String,
        resultsDetails: String,
        conclusion: String
    },

    // Categorization
    category: {
        type: String,
        enum: [
            'revenue-optimization',
            'cost-reduction',
            'process-improvement',
            'technology-implementation',
            'compliance-enhancement',
            'staff-augmentation',
            'automation-success',
            'digital-transformation'
        ],
        required: true
    },
    tags: [String],
    industries: [String],
    services: [String],

    // Publishing and Status
    status: {
        type: String,
        enum: ['draft', 'review', 'client-approval', 'approved', 'published', 'archived'],
        default: 'draft'
    },
    publishedAt: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Client Approval
    clientApproval: {
        status: {
            type: String,
            enum: ['pending', 'approved', 'requires-changes', 'denied'],
            default: 'pending'
        },
        approvedBy: String,
        approvedAt: Date,
        comments: String
    },

    // SEO and Marketing
    seoTitle: String,
    metaDescription: String,
    targetKeywords: [String],
    canonicalUrl: String,

    // Analytics and Performance
    views: {
        type: Number,
        default: 0
    },
    downloads: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    leadGenerated: {
        type: Number,
        default: 0
    },
    conversionRate: {
        type: Number,
        default: 0
    },

    // Lead Generation
    leadMagnet: {
        enabled: {
            type: Boolean,
            default: true
        },
        title: String,
        description: String,
        downloadUrl: String,
        fileName: String,
        gated: {
            type: Boolean,
            default: true
        }
    },
    ctaButtons: [{
        text: String,
        url: String,
        type: {
            type: String,
            enum: ['demo-request', 'consultation', 'download', 'contact', 'pricing']
        },
        clicks: {
            type: Number,
            default: 0
        }
    }],

    // Related Content
    relatedCaseStudies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CaseStudy'
    }],
    relatedServices: [String],
    relatedProducts: [String],

    // Visibility and Permissions
    isPublic: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isConfidential: {
        type: Boolean,
        default: false
    },
    accessLevel: {
        type: String,
        enum: ['public', 'registered-users', 'qualified-leads', 'internal'],
        default: 'public'
    },

    // Data Protection
    isAnonymized: {
        type: Boolean,
        default: false
    },
    dataRetentionDate: Date,
    clientConsentDate: Date,

    // Awards and Recognition
    awards: [{
        name: String,
        organization: String,
        year: Number,
        description: String
    }],

    // Project Timeline
    milestones: [{
        title: String,
        description: String,
        date: Date,
        status: {
            type: String,
            enum: ['completed', 'in-progress', 'delayed', 'cancelled']
        }
    }],

    // Team Information
    projectTeam: [{
        role: String,
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        contribution: String
    }],

    // External References
    externalLinks: [String],
    pressLinks: [String],
    videoLinks: [String],

    // Flags
    requiresUpdate: {
        type: Boolean,
        default: false
    },
    lastUpdatedAt: Date

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
caseStudySchema.virtual('url').get(function () {
    return `/case-studies/${this.slug}`;
});

caseStudySchema.virtual('projectDuration').get(function () {
    if (this.solution.timeline.startDate && this.solution.timeline.endDate) {
        const days = Math.floor((this.solution.timeline.endDate - this.solution.timeline.startDate) / (1000 * 60 * 60 * 24));
        return `${days} days`;
    }
    return this.solution.timeline.duration || 'Not specified';
});

caseStudySchema.virtual('averageImprovement').get(function () {
    if (!this.results.keyMetrics || this.results.keyMetrics.length === 0) return 0;

    const improvements = this.results.keyMetrics
        .map(metric => parseFloat(metric.improvement.replace(/[^0-9.-]/g, '')))
        .filter(val => !isNaN(val));

    return improvements.length > 0
        ? (improvements.reduce((a, b) => a + b, 0) / improvements.length).toFixed(1)
        : 0;
});

// Indexes
caseStudySchema.index({ slug: 1 });
caseStudySchema.index({ caseId: 1 });
caseStudySchema.index({ status: 1 });
caseStudySchema.index({ category: 1 });
caseStudySchema.index({ 'client.industry': 1 });
caseStudySchema.index({ tags: 1 });
caseStudySchema.index({ publishedAt: -1 });
caseStudySchema.index({ views: -1 });
caseStudySchema.index({ isFeatured: 1 });

// Compound indexes
caseStudySchema.index({ status: 1, publishedAt: -1 });
caseStudySchema.index({ category: 1, isFeatured: 1 });
caseStudySchema.index({ 'client.industry': 1, status: 1 });

// Text search index
caseStudySchema.index({
    title: 'text',
    'content.overview': 'text',
    excerpt: 'text',
    tags: 'text'
});

// Instance Methods

// Publish case study
caseStudySchema.methods.publish = function () {
    this.status = 'published';
    this.publishedAt = new Date();
    return this.save();
};

// Add view
caseStudySchema.methods.addView = function () {
    this.views += 1;
    return this.save();
};

// Add download
caseStudySchema.methods.addDownload = function () {
    this.downloads += 1;
    return this.save();
};

// Track lead generation
caseStudySchema.methods.trackLead = function () {
    this.leadGenerated += 1;
    this.conversionRate = this.views > 0 ? (this.leadGenerated / this.views * 100) : 0;
    return this.save();
};

// Add testimonial
caseStudySchema.methods.addTestimonial = function (testimonialData) {
    this.testimonials.push(testimonialData);
    return this.save();
};

// Update client approval
caseStudySchema.methods.updateClientApproval = function (status, approvedBy, comments) {
    this.clientApproval.status = status;
    this.clientApproval.approvedBy = approvedBy;
    this.clientApproval.approvedAt = new Date();
    this.clientApproval.comments = comments;

    if (status === 'approved') {
        this.status = 'approved';
    }

    return this.save();
};

// Calculate ROI
caseStudySchema.methods.calculateROI = function () {
    const { costSavings, revenueIncrease } = this.results.financialImpact;
    if (costSavings || revenueIncrease) {
        const totalBenefit = (costSavings || 0) + (revenueIncrease || 0);
        // Assuming investment is roughly 20% of first year benefits
        const investment = totalBenefit * 0.2;
        this.results.financialImpact.roi = investment > 0 ? ((totalBenefit - investment) / investment * 100) : 0;
    }
    return this.results.financialImpact.roi;
};

// Static Methods

// Find published case studies
caseStudySchema.statics.findPublished = function () {
    return this.find({
        status: 'published',
        isPublic: true
    }).sort({ publishedAt: -1 });
};

// Find by industry
caseStudySchema.statics.findByIndustry = function (industry) {
    return this.find({
        'client.industry': industry,
        status: 'published',
        isPublic: true
    }).sort({ publishedAt: -1 });
};

// Find featured case studies
caseStudySchema.statics.findFeatured = function () {
    return this.find({
        isFeatured: true,
        status: 'published',
        isPublic: true
    }).sort({ publishedAt: -1 });
};

// Get success metrics
caseStudySchema.statics.getSuccessMetrics = async function () {
    const totalCases = await this.countDocuments({ status: 'published' });

    const avgMetrics = await this.aggregate([
        { $match: { status: 'published' } },
        { $unwind: '$results.keyMetrics' },
        {
            $group: {
                _id: '$results.keyMetrics.metric',
                avgImprovement: {
                    $avg: {
                        $toDouble: {
                            $replaceAll: {
                                input: '$results.keyMetrics.improvement',
                                find: '%',
                                replacement: ''
                            }
                        }
                    }
                },
                count: { $sum: 1 }
            }
        }
    ]);

    const totalViews = await this.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    return {
        totalCases,
        totalViews: totalViews[0]?.totalViews || 0,
        averageMetrics: avgMetrics
    };
};

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

export default CaseStudy;