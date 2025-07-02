// backend/src/models/Blog.models.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const blogSchema = new mongoose.Schema({
    // Unique identifier
    postId: {
        type: String,
        unique: true,
        default: () => `BLOG-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Content
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
        trim: true,
        match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required'],
        trim: true,
        maxlength: [500, 'Excerpt cannot exceed 500 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    metaDescription: {
        type: String,
        maxlength: [160, 'Meta description cannot exceed 160 characters']
    },

    // Media
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
        publicId: String
    }],

    // Categorization
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'rcm-insights',
            'industry-news',
            'product-updates',
            'best-practices',
            'case-studies',
            'technology',
            'compliance',
            'automation',
            'analytics',
            'company-news'
        ]
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    topics: [{
        type: String,
        enum: [
            'revenue-cycle-management',
            'medical-billing',
            'claim-denials',
            'ar-management',
            'coding',
            'credentialing',
            'eligibility-verification',
            'payment-posting',
            'analytics',
            'automation',
            'compliance',
            'hipaa',
            'mgma',
            'ehr-integration'
        ]
    }],

    // Publishing
    status: {
        type: String,
        enum: ['draft', 'review', 'scheduled', 'published', 'archived'],
        default: 'draft'
    },
    publishedAt: Date,
    scheduledFor: Date,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewedAt: Date,

    // SEO and Marketing
    seoTitle: String,
    seoKeywords: [String],
    targetKeywords: [String],
    readingTime: {
        type: Number, // in minutes
        default: 0
    },
    wordCount: {
        type: Number,
        default: 0
    },

    // Engagement
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    },
    comments: [{
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        content: {
            type: String,
            required: true,
            maxlength: [1000, 'Comment cannot exceed 1000 characters']
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'spam'],
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        ipAddress: String,
        userAgent: String
    }],

    // Analytics
    analytics: {
        uniqueViews: { type: Number, default: 0 },
        avgTimeOnPage: { type: Number, default: 0 },
        bounceRate: { type: Number, default: 0 },
        clickThroughRate: { type: Number, default: 0 },
        conversionRate: { type: Number, default: 0 }
    },

    // Lead Generation
    leadMagnet: {
        enabled: { type: Boolean, default: false },
        title: String,
        description: String,
        downloadUrl: String,
        fileName: String
    },
    ctaButtons: [{
        text: String,
        url: String,
        type: {
            type: String,
            enum: ['primary', 'secondary', 'lead-magnet', 'newsletter', 'demo', 'pricing']
        },
        clicks: { type: Number, default: 0 }
    }],

    // Related Content
    relatedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    series: {
        name: String,
        part: Number,
        totalParts: Number
    },

    // Content Structure
    tableOfContents: [{
        heading: String,
        anchor: String,
        level: Number
    }],
    sections: [{
        title: String,
        content: String,
        order: Number
    }],

    // Versioning
    version: {
        type: Number,
        default: 1
    },
    revisions: [{
        version: Number,
        content: String,
        changedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        changedAt: {
            type: Date,
            default: Date.now
        },
        changeNote: String
    }],

    // Social Media
    socialShares: {
        facebook: { type: Number, default: 0 },
        twitter: { type: Number, default: 0 },
        linkedin: { type: Number, default: 0 },
        whatsapp: { type: Number, default: 0 }
    },
    socialTitle: String,
    socialDescription: String,
    socialImage: {
        url: String,
        alt: String
    },

    // Newsletter Integration
    includeInNewsletter: {
        type: Boolean,
        default: false
    },
    newsletterSentAt: Date,
    newsletterRecipients: Number,
    newsletterOpens: Number,
    newsletterClicks: Number,

    // External Links
    canonicalUrl: String,
    externalSources: [String],
    backlinks: [{
        url: String,
        domain: String,
        anchorText: String,
        discoveredAt: Date
    }],

    // Content Quality
    qualityScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    readabilityScore: Number,
    seoScore: Number,

    // Featured and Promotion
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },

    // Flags
    isEvergreen: {
        type: Boolean,
        default: false
    },
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
blogSchema.virtual('url').get(function () {
    return `/blog/${this.slug}`;
});

blogSchema.virtual('commentsCount').get(function () {
    return this.comments ? this.comments.filter(c => c.status === 'approved').length : 0;
});

blogSchema.virtual('engagementRate').get(function () {
    if (this.views === 0) return 0;
    return ((this.likes + this.shares + this.commentsCount) / this.views * 100).toFixed(2);
});

blogSchema.virtual('daysPublished').get(function () {
    if (!this.publishedAt) return 0;
    return Math.floor((Date.now() - this.publishedAt) / (1000 * 60 * 60 * 24));
});

// Indexes
blogSchema.index({ slug: 1 });
blogSchema.index({ postId: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ views: -1 });
blogSchema.index({ qualityScore: -1 });

// Compound indexes
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, publishedAt: -1 });
blogSchema.index({ isFeatured: 1, publishedAt: -1 });

// Text indexes for search
blogSchema.index({
    title: 'text',
    content: 'text',
    excerpt: 'text',
    tags: 'text'
});

// Pre-save middleware
blogSchema.pre('save', function (next) {
    // Generate slug if not provided
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    // Calculate word count and reading time
    if (this.isModified('content')) {
        const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        this.wordCount = words;
        this.readingTime = Math.ceil(words / 200); // Assuming 200 words per minute
    }

    // Update lastUpdatedAt
    if (this.isModified('content') || this.isModified('title')) {
        this.lastUpdatedAt = new Date();
    }

    // Set meta description from excerpt if not provided
    if (!this.metaDescription && this.excerpt) {
        this.metaDescription = this.excerpt.substring(0, 160);
    }

    next();
});

// Instance Methods

// Publish post
blogSchema.methods.publish = function () {
    this.status = 'published';
    this.publishedAt = new Date();
    return this.save();
};

// Schedule post
blogSchema.methods.schedule = function (publishDate) {
    this.status = 'scheduled';
    this.scheduledFor = publishDate;
    return this.save();
};

// Add view
blogSchema.methods.addView = function () {
    this.views += 1;
    this.analytics.uniqueViews += 1;
    return this.save();
};

// Add comment
blogSchema.methods.addComment = function (commentData) {
    this.comments.push(commentData);
    return this.save();
};

// Approve comment
blogSchema.methods.approveComment = function (commentId) {
    const comment = this.comments.id(commentId);
    if (comment) {
        comment.status = 'approved';
        return this.save();
    }
    return Promise.reject(new Error('Comment not found'));
};

// Add like
blogSchema.methods.addLike = function () {
    this.likes += 1;
    return this.save();
};

// Add share
blogSchema.methods.addShare = function (platform) {
    this.shares += 1;
    if (this.socialShares[platform] !== undefined) {
        this.socialShares[platform] += 1;
    }
    return this.save();
};

// Calculate quality score
blogSchema.methods.calculateQualityScore = function () {
    let score = 0;

    // Content length (30 points)
    if (this.wordCount >= 1500) score += 30;
    else if (this.wordCount >= 1000) score += 20;
    else if (this.wordCount >= 500) score += 10;

    // SEO elements (25 points)
    if (this.metaDescription) score += 5;
    if (this.seoTitle) score += 5;
    if (this.targetKeywords && this.targetKeywords.length > 0) score += 5;
    if (this.featuredImage && this.featuredImage.url) score += 5;
    if (this.featuredImage && this.featuredImage.alt) score += 5;

    // Engagement (25 points)
    const engagementRate = parseFloat(this.engagementRate);
    if (engagementRate >= 5) score += 25;
    else if (engagementRate >= 3) score += 15;
    else if (engagementRate >= 1) score += 10;

    // Structure (20 points)
    if (this.tableOfContents && this.tableOfContents.length > 0) score += 10;
    if (this.sections && this.sections.length > 0) score += 5;
    if (this.excerpt) score += 5;

    this.qualityScore = Math.min(score, 100);
    return this.qualityScore;
};

// Create revision
blogSchema.methods.createRevision = function (changedBy, changeNote) {
    this.revisions.push({
        version: this.version,
        content: this.content,
        changedBy,
        changeNote
    });
    this.version += 1;
    return this.save();
};

// Static Methods

// Find published posts
blogSchema.statics.findPublished = function () {
    return this.find({
        status: 'published',
        publishedAt: { $lte: new Date() }
    }).sort({ publishedAt: -1 });
};

// Find by category
blogSchema.statics.findByCategory = function (category) {
    return this.find({
        category,
        status: 'published',
        publishedAt: { $lte: new Date() }
    }).sort({ publishedAt: -1 });
};

// Find featured posts
blogSchema.statics.findFeatured = function () {
    return this.find({
        isFeatured: true,
        status: 'published',
        publishedAt: { $lte: new Date() }
    }).sort({ publishedAt: -1 });
};

// Search posts
blogSchema.statics.searchPosts = function (query) {
    return this.find({
        $text: { $search: query },
        status: 'published',
        publishedAt: { $lte: new Date() }
    }).sort({ score: { $meta: 'textScore' } });
};

// Get popular posts
blogSchema.statics.getPopularPosts = function (days = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return this.find({
        status: 'published',
        publishedAt: { $gte: since }
    }).sort({ views: -1 }).limit(10);
};

// Get blog statistics
blogSchema.statics.getBlogStats = async function () {
    const totalPosts = await this.countDocuments({ status: 'published' });
    const totalViews = await this.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    const categoryStats = await this.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const avgQualityScore = await this.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: null, avgScore: { $avg: '$qualityScore' } } }
    ]);

    return {
        totalPosts,
        totalViews: totalViews[0]?.totalViews || 0,
        categoryBreakdown: categoryStats,
        averageQualityScore: avgQualityScore[0]?.avgScore || 0
    };
};

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;