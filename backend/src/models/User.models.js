// backend/src/models/User.models.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/environment.config.js';
import { USER_ROLES } from '../utils/constants.js';

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false // Don't include password in queries by default
    },

    // Profile Information
    phone: {
        type: String,
        trim: true
    },
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

    // Professional Information
    industryType: {
        type: String,
        default: 'Other'
    },
    companySize: {
        type: String,
    },
    monthlyClaimsVolume: {
        type: String,
    },
    currentEHR: {
        type: String,
        trim: true
    },

    // Account Status
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.USER
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },

    // Security
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: Date,

    // Preferences
    preferences: {
        emailNotifications: {
            type: Boolean,
            default: true
        },
        smsNotifications: {
            type: Boolean,
            default: false
        },
        marketingEmails: {
            type: Boolean,
            default: true
        },
        newsletter: {
            type: Boolean,
            default: false
        }
    },

    // Interaction Tracking
    lastLogin: Date,
    lastActivity: Date,
    ipAddress: String,
    userAgent: String,

    // Lead Source Tracking
    leadSource: {
        type: String,
        default: 'website'
    },
    referralCode: String,

    // Avatar
    avatar: {
        url: String,
        publicId: String // For cloudinary
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function () {
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Index for performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
    // Only hash if password is modified
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Update lastActivity on save
userSchema.pre('save', function (next) {
    if (this.isNew || this.isModified()) {
        this.lastActivity = new Date();
    }
    next();
});

// Instance Methods

// Check password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw Error('Error comparing passwords');
    }
};

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role
        },
        config.jwtSecret,
        { expiresIn: config.jwtExpire }
    );
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function () {
    const verificationToken = uuidv4().replace(/-/g, ''); // Remove dashes for cleaner token

    this.emailVerificationToken = verificationToken;
    this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    return verificationToken;
};

// Generate reset password token
userSchema.methods.generateResetPasswordToken = function () {
    const resetToken = uuidv4().replace(/-/g, ''); // Remove dashes for cleaner token

    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour

    return resetToken;
};

// Handle failed login attempts
userSchema.methods.incLoginAttempts = function () {
    // If we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.updateOne({
            $unset: { lockUntil: 1 },
            $set: { loginAttempts: 1 }
        });
    }

    const updates = { $inc: { loginAttempts: 1 } };

    // Lock account after 5 failed attempts for 2 hours
    if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
    }

    return this.updateOne(updates);
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = function () {
    return this.updateOne({
        $unset: { loginAttempts: 1, lockUntil: 1 }
    });
};

// Update last login
userSchema.methods.updateLastLogin = function (ipAddress, userAgent) {
    return this.updateOne({
        $set: {
            lastLogin: new Date(),
            lastActivity: new Date(),
            ipAddress: ipAddress,
            userAgent: userAgent
        }
    });
};

// Static Methods

// Find user by email
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email.toLowerCase() });
};

// Find active users
userSchema.statics.findActive = function () {
    return this.find({ isActive: true });
};

// Find by role
userSchema.statics.findByRole = function (role) {
    return this.find({ role: role, isActive: true });
};

const User = mongoose.model('User', userSchema);

export default User;