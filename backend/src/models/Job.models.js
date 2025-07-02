// backend/src/models/Job.models.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const jobSchema = new mongoose.Schema({
    // Unique identifier
    jobId: {
        type: String,
        unique: true,
        default: () => `JOB-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Basic Information
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        maxlength: [100, 'Job title cannot exceed 100 characters']
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    summary: {
        type: String,
        required: [true, 'Job summary is required'],
        maxlength: [500, 'Job summary cannot exceed 500 characters']
    },

    // Job Classification
    department: {
        type: String,
        required: [true, 'Department is required'],
        enum: [
            'operations',
            'technology',
            'sales',
            'marketing',
            'hr',
            'finance',
            'customer-success',
            'rcm-services',
            'quality-assurance',
            'compliance',
            'executive',
            'other'
        ]
    },
    category: {
        type: String,
        required: [true, 'Job category is required'],
        enum: [
            'full-time',
            'part-time',
            'contract',
            'internship',
            'temporary',
            'consultant'
        ]
    },
    level: {
        type: String,
        required: [true, 'Job level is required'],
        enum: [
            'entry-level',
            'associate',
            'mid-level',
            'senior',
            'lead',
            'manager',
            'director',
            'vp',
            'c-level'
        ]
    },

    // Location and Remote Work
    location: {
        city: String,
        state: String,
        country: {
            type: String,
            required: true,
            enum: ['US', 'India', 'Remote', 'Multiple']
        },
        timezone: String,
        isRemote: {
            type: Boolean,
            default: false
        },
        remoteType: {
            type: String,
            enum: ['fully-remote', 'hybrid', 'office-based'],
            default: 'office-based'
        }
    },

    // Requirements
    requirements: {
        education: {
            level: {
                type: String,
                enum: ['high-school', 'associates', 'bachelors', 'masters', 'phd', 'certification']
            },
            field: String,
            required: Boolean
        },
        experience: {
            minimum: {
                type: Number,
                required: true,
                min: 0
            },
            preferred: Number,
            industry: [String],
            specific: [String]
        },
        skills: {
            required: [{
                skill: String,
                level: {
                    type: String,
                    enum: ['basic', 'intermediate', 'advanced', 'expert']
                }
            }],
            preferred: [String],
            technical: [String],
            soft: [String]
        },
        certifications: [{
            name: String,
            required: Boolean,
            preferred: Boolean
        }],
        languages: [{
            language: String,
            level: {
                type: String,
                enum: ['basic', 'conversational', 'fluent', 'native']
            },
            required: Boolean
        }]
    },

    // Responsibilities
    responsibilities: {
        primary: [String],
        secondary: [String],
        goals: [String],
        kpis: [String]
    },

    // Compensation
    compensation: {
        salary: {
            min: Number,
            max: Number,
            currency: {
                type: String,
                default: 'USD'
            },
            period: {
                type: String,
                enum: ['hour', 'month', 'year'],
                default: 'year'
            }
        },
        equity: {
            offered: Boolean,
            details: String
        },
        benefits: [{
            benefit: String,
            description: String
        }],
        bonuses: {
            performance: Boolean,
            signing: Boolean,
            annual: Boolean,
            details: String
        }
    },

    // Application Process
    applicationProcess: {
        steps: [String],
        timeline: String,
        interviewRounds: Number,
        assessments: [String],
        documentsRequired: [String]
    },

    // Job Status
    status: {
        type: String,
        enum: ['draft', 'open', 'paused', 'filled', 'cancelled', 'archived'],
        default: 'draft'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    openings: {
        type: Number,
        default: 1,
        min: 1
    },
    filled: {
        type: Number,
        default: 0
    },

    // Dates
    postedDate: Date,
    applicationDeadline: Date,
    startDate: Date,
    lastUpdated: Date,

    // Team and Reporting
    hiringManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reportsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: String
    }],
    collaborators: [String],

    // Application Statistics
    analytics: {
        views: {
            type: Number,
            default: 0
        },
        applications: {
            type: Number,
            default: 0
        },
        qualified: {
            type: Number,
            default: 0
        },
        interviewed: {
            type: Number,
            default: 0
        },
        hired: {
            type: Number,
            default: 0
        },
        averageTimeToHire: Number, // in days
        sources: [{
            source: String,
            count: Number
        }]
    },

    // Internal Information
    budget: {
        allocated: Number,
        spent: Number,
        currency: String
    },
    internalNotes: String,
    tags: [String],
    approvals: [{
        approver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected']
        },
        date: Date,
        comments: String
    }],

    // SEO and Marketing
    seoTitle: String,
    metaDescription: String,
    keywords: [String],

    // External Posting
    externalPostings: [{
        platform: {
            type: String,
            enum: ['linkedin', 'indeed', 'glassdoor', 'monster', 'angellist', 'other']
        },
        url: String,
        postedDate: Date,
        cost: Number,
        applications: Number,
        isActive: Boolean
    }],

    // Company Information
    companyInfo: {
        overview: String,
        culture: String,
        values: [String],
        perks: [String],
        workEnvironment: String
    },

    // Screening Questions
    screeningQuestions: [{
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['text', 'multiple-choice', 'yes-no', 'number', 'file-upload'],
            default: 'text'
        },
        options: [String], // for multiple choice
        required: {
            type: Boolean,
            default: false
        },
        order: Number
    }],

    // Diversity and Inclusion
    diversityCommitment: {
        statement: String,
        isEEO: {
            type: Boolean,
            default: true
        },
        accommodations: String
    },

    // Flags
    isFeatured: {
        type: Boolean,
        default: false
    },
    isUrgent: {
        type: Boolean,
        default: false
    },
    isRemoteFriendly: {
        type: Boolean,
        default: false
    },
    requiresVisa: {
        type: Boolean,
        default: false
    },
    hasESOP: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
jobSchema.virtual('url').get(function () {
    return `/careers/${this.slug}`;
});

jobSchema.virtual('daysPosted').get(function () {
    if (!this.postedDate) return 0;
    return Math.floor((Date.now() - this.postedDate) / (1000 * 60 * 60 * 24));
});

jobSchema.virtual('applicationRate').get(function () {
    return this.analytics.views > 0 ?
        ((this.analytics.applications / this.analytics.views) * 100).toFixed(2) : 0;
});

jobSchema.virtual('qualificationRate').get(function () {
    return this.analytics.applications > 0 ?
        ((this.analytics.qualified / this.analytics.applications) * 100).toFixed(2) : 0;
};

jobSchema.virtual('isExpired').get(function () {
    return this.applicationDeadline && this.applicationDeadline < new Date();
});

jobSchema.virtual('remainingOpenings').get(function () {
    return this.openings - this.filled;
});

// Indexes
jobSchema.index({ slug: 1 });
jobSchema.index({ jobId: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ department: 1 });
jobSchema.index({ category: 1 });
jobSchema.index({ level: 1 });
jobSchema.index({ 'location.country': 1 });
jobSchema.index({ postedDate: -1 });
jobSchema.index({ priority: 1 });

// Compound indexes
jobSchema.index({ status: 1, postedDate: -1 });
jobSchema.index({ department: 1, status: 1 });
jobSchema.index({ 'location.country': 1, status: 1 });

// Text search index
jobSchema.index({
    title: 'text',
    description: 'text',
    'requirements.skills.required.skill': 'text',
    keywords: 'text'
});

// Pre-save middleware
jobSchema.pre('save', function (next) {
    // Generate slug if not provided
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
    }

    // Update lastUpdated
    this.lastUpdated = new Date();

    next();
});

// Instance Methods

// Publish job
jobSchema.methods.publish = function () {
    this.status = 'open';
    this.postedDate = new Date();
    return this.save();
};

// Pause job
jobSchema.methods.pause = function () {
    this.status = 'paused';
    return this.save();
};

// Close job
jobSchema.methods.close = function (reason = 'filled') {
    this.status = reason === 'cancelled' ? 'cancelled' : 'filled';
    return this.save();
};

// Track view
jobSchema.methods.addView = function () {
    this.analytics.views += 1;
    return this.save();
};

// Track application
jobSchema.methods.addApplication = function (source = 'website') {
    this.analytics.applications += 1;

    // Update source tracking
    const sourceIndex = this.analytics.sources.findIndex(s => s.source === source);
    if (sourceIndex >= 0) {
        this.analytics.sources[sourceIndex].count += 1;
    } else {
        this.analytics.sources.push({ source, count: 1 });
    }

    return this.save();
};

// Update application status counts
jobSchema.methods.updateApplicationCounts = function (counts) {
    Object.assign(this.analytics, counts);
    return this.save();
};

// Check if candidate meets requirements
jobSchema.methods.checkEligibility = function (candidateProfile) {
    const { experience, education, skills, certifications } = candidateProfile;
    const issues = [];

    // Check experience
    if (experience < this.requirements.experience.minimum) {
        issues.push(`Minimum ${this.requirements.experience.minimum} years experience required`);
    }

    // Check education
    if (this.requirements.education.required &&
        !education.includes(this.requirements.education.level)) {
        issues.push(`${this.requirements.education.level} degree required`);
    }

    // Check required skills
    const missingSkills = this.requirements.skills.required
        .filter(req => !skills.some(skill => skill.name === req.skill))
        .map(req => req.skill);

    if (missingSkills.length > 0) {
        issues.push(`Missing required skills: ${missingSkills.join(', ')}`);
    }

    return {
        eligible: issues.length === 0,
        issues
    };
};

// Add external posting
jobSchema.methods.addExternalPosting = function (platform, url, cost = 0) {
    this.externalPostings.push({
        platform,
        url,
        postedDate: new Date(),
        cost,
        isActive: true
    });
    return this.save();
};

// Static Methods

// Find open jobs
jobSchema.statics.findOpen = function () {
    return this.find({
        status: 'open',
        $or: [
            { applicationDeadline: { $exists: false } },
            { applicationDeadline: { $gte: new Date() } }
        ]
    }).sort({ priority: -1, postedDate: -1 });
};

// Find by department
jobSchema.statics.findByDepartment = function (department) {
    return this.find({
        department,
        status: 'open'
    }).sort({ postedDate: -1 });
};

// Find by location
jobSchema.statics.findByLocation = function (country, city = null) {
    const query = {
        'location.country': country,
        status: 'open'
    };

    if (city) {
        query['location.city'] = city;
    }

    return this.find(query).sort({ postedDate: -1 });
};

// Find remote jobs
jobSchema.statics.findRemote = function () {
    return this.find({
        $or: [
            { 'location.isRemote': true },
            { 'location.remoteType': { $in: ['fully-remote', 'hybrid'] } }
        ],
        status: 'open'
    }).sort({ postedDate: -1 });
};

// Search jobs
jobSchema.statics.searchJobs = function (query) {
    return this.find({
        $text: { $search: query },
        status: 'open'
    }).sort({ score: { $meta: 'textScore' } });
};

// Get hiring statistics
jobSchema.statics.getHiringStats = async function () {
    const totalJobs = await this.countDocuments({ status: { $ne: 'draft' } });
    const openJobs = await this.countDocuments({ status: 'open' });
    const filledJobs = await this.countDocuments({ status: 'filled' });

    const totalApplications = await this.aggregate([
        { $match: { status: { $ne: 'draft' } } },
        { $group: { _id: null, total: { $sum: '$analytics.applications' } } }
    ]);

    const departmentStats = await this.aggregate([
        { $match: { status: 'open' } },
        {
            $group: {
                _id: '$department',
                openPositions: { $sum: 1 },
                totalApplications: { $sum: '$analytics.applications' }
            }
        }
    ]);

    const locationStats = await this.aggregate([
        { $match: { status: 'open' } },
        {
            $group: {
                _id: '$location.country',
                count: { $sum: 1 }
            }
        }
    ]);

    return {
        totalJobs,
        openJobs,
        filledJobs,
        totalApplications: totalApplications[0]?.total || 0,
        departmentBreakdown: departmentStats,
        locationBreakdown: locationStats
    };
};

const Job = mongoose.model('Job', jobSchema);

export default Job;