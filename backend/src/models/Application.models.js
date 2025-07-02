// backend/src/models/Application.models.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const applicationSchema = new mongoose.Schema({
    // Unique identifier
    applicationId: {
        type: String,
        unique: true,
        default: () => `APP-${uuidv4().substring(0, 8).toUpperCase()}`
    },

    // Job Reference
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true, 'Job ID is required']
    },
    jobTitle: {
        type: String,
        required: true
    },
    department: String,

    // Candidate Information
    candidate: {
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
            required: [true, 'Phone number is required'],
            trim: true
        },
        alternatePhone: String,

        // Location
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: {
                type: String,
                required: true
            }
        },

        // Personal Details
        dateOfBirth: Date,
        nationality: String,
        workAuthorization: {
            hasAuthorization: Boolean,
            type: {
                type: String,
                enum: ['citizen', 'permanent-resident', 'h1b', 'opt', 'other']
            },
            expiryDate: Date,
            requiresSponsorship: Boolean
        },

        // Professional Summary
        currentTitle: String,
        currentCompany: String,
        totalExperience: Number, // in years
        relevantExperience: Number,
        currentSalary: {
            amount: Number,
            currency: String
        },
        expectedSalary: {
            amount: Number,
            currency: String
        },
        noticePeriod: String,

        // Social Links
        linkedinProfile: String,
        githubProfile: String,
        portfolioWebsite: String,
        otherProfiles: [String]
    },

    // Documents
    documents: {
        resume: {
            filename: String,
            originalName: String,
            url: String,
            uploadedAt: Date,
            fileSize: Number,
            mimeType: String
        },
        coverLetter: {
            filename: String,
            originalName: String,
            url: String,
            uploadedAt: Date,
            content: String // extracted text content
        },
        portfolio: [{
            title: String,
            filename: String,
            url: String,
            description: String,
            uploadedAt: Date
        }],
        certifications: [{
            title: String,
            filename: String,
            url: String,
            uploadedAt: Date
        }],
        other: [{
            title: String,
            filename: String,
            url: String,
            uploadedAt: Date
        }]
    },

    // Application Details
    applicationSource: {
        type: String,
        enum: [
            'website',
            'linkedin',
            'indeed',
            'glassdoor',
            'referral',
            'campus-recruitment',
            'job-fair',
            'direct-email',
            'headhunter',
            'other'
        ],
        default: 'website'
    },
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    referrerName: String,
    referrerEmail: String,

    // Screening Responses
    screeningResponses: [{
        questionId: String,
        question: String,
        answer: mongoose.Schema.Types.Mixed, // Can be string, number, array, etc.
        score: Number
    }],
    screeningScore: {
        type: Number,
        default: 0
    },

    // Application Status
    status: {
        type: String,
        enum: [
            'submitted',
            'under-review',
            'screening-passed',
            'screening-failed',
            'interview-scheduled',
            'interview-completed',
            'technical-assessment',
            'reference-check',
            'background-check',
            'offer-pending',
            'offer-extended',
            'offer-accepted',
            'offer-declined',
            'hired',
            'rejected',
            'withdrawn',
            'on-hold'
        ],
        default: 'submitted'
    },
    stage: {
        type: String,
        enum: [
            'application',
            'screening',
            'interview',
            'assessment',
            'final-review',
            'offer',
            'closed'
        ],
        default: 'application'
    },

    // Interview Process
    interviews: [{
        round: Number,
        type: {
            type: String,
            enum: ['phone', 'video', 'in-person', 'technical', 'panel', 'final']
        },
        scheduledAt: Date,
        completedAt: Date,
        duration: Number, // in minutes
        interviewers: [{
            interviewer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: String,
            email: String,
            role: String
        }],
        location: String,
        meetingLink: String,
        feedback: {
            technical: {
                score: Number,
                comments: String
            },
            communication: {
                score: Number,
                comments: String
            },
            cultural: {
                score: Number,
                comments: String
            },
            overall: {
                score: Number,
                recommendation: {
                    type: String,
                    enum: ['strong-hire', 'hire', 'no-hire', 'strong-no-hire']
                },
                comments: String
            }
        },
        status: {
            type: String,
            enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
            default: 'scheduled'
        }
    }],

    // Assessments
    assessments: [{
        type: {
            type: String,
            enum: ['coding', 'technical', 'aptitude', 'personality', 'case-study']
        },
        title: String,
        assignedAt: Date,
        submittedAt: Date,
        dueDate: Date,
        score: Number,
        maxScore: Number,
        feedback: String,
        assessmentUrl: String,
        resultUrl: String,
        status: {
            type: String,
            enum: ['assigned', 'in-progress', 'submitted', 'evaluated'],
            default: 'assigned'
        }
    }],

    // Offer Details
    offer: {
        extendedAt: Date,
        expiryDate: Date,
        salary: {
            base: Number,
            bonus: Number,
            equity: String,
            currency: String
        },
        benefits: [String],
        startDate: Date,
        workLocation: String,
        workArrangement: {
            type: String,
            enum: ['remote', 'hybrid', 'office']
        },
        offerLetter: {
            url: String,
            sentAt: Date
        },
        negotiationNotes: String,
        finalOffer: {
            accepted: Boolean,
            acceptedAt: Date,
            declinedAt: Date,
            declineReason: String
        }
    },

    // Background Check
    backgroundCheck: {
        initiated: Boolean,
        completedAt: Date,
        status: {
            type: String,
            enum: ['pending', 'clear', 'concerns', 'failed']
        },
        vendor: String,
        reportUrl: String,
        notes: String
    },

    // Reference Check
    references: [{
        name: String,
        title: String,
        company: String,
        email: String,
        phone: String,
        relationship: String,
        contacted: Boolean,
        contactedAt: Date,
        feedback: String,
        rating: Number
    }],

    // Timeline and Activity
    timeline: [{
        action: String,
        description: String,
        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        performedAt: {
            type: Date,
            default: Date.now
        },
        metadata: mongoose.Schema.Types.Mixed
    }],

    // Assignment and Management
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedAt: Date,
    hiringManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Communication
    communications: [{
        type: {
            type: String,
            enum: ['email', 'phone', 'sms', 'in-person']
        },
        direction: {
            type: String,
            enum: ['inbound', 'outbound']
        },
        subject: String,
        content: String,
        sentBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        sentAt: {
            type: Date,
            default: Date.now
        },
        opened: Boolean,
        replied: Boolean
    }],

    // Notes and Comments
    notes: [{
        content: {
            type: String,
            required: true,
            maxlength: [2000, 'Note cannot exceed 2000 characters']
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
            enum: ['general', 'interview', 'assessment', 'reference', 'offer'],
            default: 'general'
        },
        isPrivate: {
            type: Boolean,
            default: false
        }
    }],

    // Scoring and Evaluation
    evaluation: {
        technical: Number,
        experience: Number,
        communication: Number,
        cultural: Number,
        overall: Number,
        recommendation: {
            type: String,
            enum: ['strong-hire', 'hire', 'maybe', 'no-hire', 'strong-no-hire']
        },
        evaluatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        evaluatedAt: Date
    },

    // Technical Information
    applicationData: {
        ipAddress: String,
        userAgent: String,
        browserInfo: String,
        deviceInfo: String,
        sessionData: mongoose.Schema.Types.Mixed
    },

    // Rejection Information
    rejection: {
        reason: {
            type: String,
            enum: [
                'underqualified',
                'overqualified',
                'skills-mismatch',
                'experience-mismatch',
                'cultural-mismatch',
                'salary-expectations',
                'location-constraints',
                'background-issues',
                'reference-issues',
                'position-filled',
                'budget-constraints',
                'other'
            ]
        },
        feedback: String,
        rejectedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rejectedAt: Date,
        feedbackSent: Boolean
    },

    // Diversity and Analytics
    diversity: {
        gender: String,
        ethnicity: String,
        veteran: Boolean,
        disability: Boolean,
        voluntaryDisclosure: Boolean
    },

    // Flags
    isStarred: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    requiresFollowUp: {
        type: Boolean,
        default: false
    },
    followUpDate: Date

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
applicationSchema.virtual('candidate.fullName').get(function () {
    return `${this.candidate.firstName} ${this.candidate.lastName}`;
});

applicationSchema.virtual('daysInProcess').get(function () {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

applicationSchema.virtual('averageInterviewScore').get(function () {
    if (!this.interviews || this.interviews.length === 0) return 0;

    const scores = this.interviews
        .filter(interview => interview.feedback && interview.feedback.overall)
        .map(interview => interview.feedback.overall.score);

    return scores.length > 0 ?
        (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0;
});

applicationSchema.virtual('isOfferPending').get(function () {
    return ['offer-pending', 'offer-extended'].includes(this.status);
});

// Indexes
applicationSchema.index({ applicationId: 1 });
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ 'candidate.email': 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ stage: 1 });
applicationSchema.index({ assignedTo: 1 });
applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ followUpDate: 1 });

// Compound indexes
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ assignedTo: 1, status: 1 });
applicationSchema.index({ status: 1, createdAt: -1 });

// Instance Methods

// Update status with timeline
applicationSchema.methods.updateStatus = function (newStatus, performedBy, notes = '') {
    const oldStatus = this.status;
    this.status = newStatus;

    // Update stage based on status
    const statusToStage = {
        'submitted': 'application',
        'under-review': 'application',
        'screening-passed': 'screening',
        'screening-failed': 'screening',
        'interview-scheduled': 'interview',
        'interview-completed': 'interview',
        'technical-assessment': 'assessment',
        'reference-check': 'final-review',
        'background-check': 'final-review',
        'offer-pending': 'offer',
        'offer-extended': 'offer',
        'offer-accepted': 'offer',
        'offer-declined': 'offer',
        'hired': 'closed',
        'rejected': 'closed',
        'withdrawn': 'closed'
    };

    this.stage = statusToStage[newStatus] || this.stage;

    // Add to timeline
    this.timeline.push({
        action: 'status_change',
        description: `Status changed from ${oldStatus} to ${newStatus}. ${notes}`,
        performedBy,
        metadata: { oldStatus, newStatus }
    });

    return this.save();
};

// Schedule interview
applicationSchema.methods.scheduleInterview = function (interviewData) {
    this.interviews.push({
        ...interviewData,
        status: 'scheduled'
    });

    this.updateStatus('interview-scheduled', interviewData.scheduledBy);
    return this.save();
};

// Add assessment
applicationSchema.methods.assignAssessment = function (assessmentData, assignedBy) {
    this.assessments.push({
        ...assessmentData,
        assignedAt: new Date()
    });

    this.timeline.push({
        action: 'assessment_assigned',
        description: `${assessmentData.type} assessment assigned`,
        performedBy: assignedBy
    });

    return this.save();
};

// Extend offer
applicationSchema.methods.extendOffer = function (offerData, extendedBy) {
    this.offer = {
        ...offerData,
        extendedAt: new Date()
    };

    this.updateStatus('offer-extended', extendedBy, 'Offer extended to candidate');
    return this.save();
};

// Accept/Decline offer
applicationSchema.methods.respondToOffer = function (accepted, performedBy, reason = '') {
    this.offer.finalOffer = {
        accepted,
        [accepted ? 'acceptedAt' : 'declinedAt']: new Date(),
        declineReason: accepted ? null : reason
    };

    const newStatus = accepted ? 'offer-accepted' : 'offer-declined';
    this.updateStatus(newStatus, performedBy, reason);
    return this.save();
};

// Reject application
applicationSchema.methods.reject = function (rejectionData, rejectedBy) {
    this.rejection = {
        ...rejectionData,
        rejectedBy,
        rejectedAt: new Date()
    };

    this.updateStatus('rejected', rejectedBy, rejectionData.feedback || 'Application rejected');
    return this.save();
};

// Add note
applicationSchema.methods.addNote = function (content, addedBy, type = 'general', isPrivate = false) {
    this.notes.push({
        content,
        addedBy,
        type,
        isPrivate
    });

    return this.save();
};

// Calculate screening score
applicationSchema.methods.calculateScreeningScore = function () {
    if (!this.screeningResponses || this.screeningResponses.length === 0) {
        this.screeningScore = 0;
        return 0;
    }

    const totalScore = this.screeningResponses.reduce((sum, response) => {
        return sum + (response.score || 0);
    }, 0);

    this.screeningScore = Math.round(totalScore / this.screeningResponses.length);
    return this.screeningScore;
};

// Static Methods

// Find applications by status
applicationSchema.statics.findByStatus = function (status) {
    return this.find({ status }).sort({ createdAt: -1 });
};

// Find applications by job
applicationSchema.statics.findByJob = function (jobId) {
    return this.find({ jobId }).sort({ createdAt: -1 });
};

// Find applications requiring follow-up
applicationSchema.statics.findRequiringFollowUp = function () {
    return this.find({
        $or: [
            { requiresFollowUp: true },
            { followUpDate: { $lte: new Date() } }
        ],
        status: { $nin: ['hired', 'rejected', 'withdrawn'] }
    });
};

// Get hiring funnel analytics
applicationSchema.statics.getHiringFunnel = async function (jobId = null) {
    const matchCondition = jobId ? { jobId } : {};

    const funnel = await this.aggregate([
        { $match: matchCondition },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    const stageStats = await this.aggregate([
        { $match: matchCondition },
        {
            $group: {
                _id: '$stage',
                count: { $sum: 1 },
                avgDays: { $avg: { $divide: [{ $subtract: [new Date(), '$createdAt'] }, 86400000] } }
            }
        }
    ]);

    return {
        statusBreakdown: funnel,
        stageBreakdown: stageStats
    };
};

// Get application statistics
applicationSchema.statics.getApplicationStats = async function () {
    const totalApplications = await this.countDocuments();
    const activeApplications = await this.countDocuments({
        status: { $nin: ['hired', 'rejected', 'withdrawn'] }
    });

    const sourceStats = await this.aggregate([
        {
            $group: {
                _id: '$applicationSource',
                count: { $sum: 1 }
            }
        }
    ]);

    const avgProcessingTime = await this.aggregate([
        { $match: { status: { $in: ['hired', 'rejected'] } } },
        {
            $group: {
                _id: null,
                avgDays: { $avg: { $divide: [{ $subtract: ['$updatedAt', '$createdAt'] }, 86400000] } }
            }
        }
    ]);

    return {
        totalApplications,
        activeApplications,
        sourceBreakdown: sourceStats,
        averageProcessingTime: avgProcessingTime[0]?.avgDays || 0
    };
};

const Application = mongoose.model('Application', applicationSchema);

export default Application;