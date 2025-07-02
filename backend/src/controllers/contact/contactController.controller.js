// backend/src/controllers/contact/contactController.controller.js

import Contact from "../../models/Contact.models.js";
import Lead from "../../models/Lead.models.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { sendEmail } from "../../services/emailService.js";

// Create new contact
export const createContact = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, companyName, jobTitle, companySize,
        industryType, country, state, city, zipCode, inquiryType, subject, message,
        interestedServices, interestedProducts, currentChallenges, monthlyClaimsVolume,
        currentEHR, timeframe, budget, leadSource, referralSource, utmSource,
        utmMedium, utmCampaign, utmTerm, utmContent, marketingConsent } = req.body;

    // Check if contact already exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
        throw ApiError.conflict('Contact with this email already exists');
    }

    const contact = await Contact.create({
        firstName, lastName, email, phone, companyName, jobTitle, companySize,
        industryType, country, state, city, zipCode, inquiryType, subject, message,
        interestedServices, interestedProducts, currentChallenges, monthlyClaimsVolume,
        currentEHR, timeframe, budget, leadSource: leadSource || 'website', referralSource, utmSource, utmMedium, utmCampaign, utmTerm, utmContent, marketingConsent, ipAddress: req.ip, userAgent: req.get('User-Agent')
    })

    // Calculate Lead Score
    contact.calculateLeadScore();
    await contact.save();

    // Auto-Qualify High-Scoring Contacts
    if (contact.leadScore >= 70) {
        contact.status = 'qualified';
        await contact.save();
    }

    // Send Auto-Response Email
    try {
        await sendEmail({
            to: contact.email,
            subject: 'Thank You For Contacting GetMax Healthcare',
            template: 'contact-confirmation',
            data: {
                name: contact.fullName,
                inquiryType: contact.inquiryType,
                contactId: contact.contactId
            }
        });

        contact.autoResponseSent = true;
        contact.autoResponseSentAt = new Date();
        await contact.save();
    } catch (error) {
        console.error('Failed To Send Auto-Response: ', error);
    }

    res.status(201).json(
        ApiResponse.created({ contact }, 'Contact Created Successfully')
    );
});

// Get All Contacts
export const getAllContacts = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        status,
        priority,
        inquiryType,
        leadSource,
        assignedTo,
        search
    } = req.query;

    const query = { isSpam: false };

    // Add Filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (inquiryType) query.inquiryType = inquiryType;
    if (leadSource) query.leadSource = leadSource;
    if (assignedTo) query.assignedTo = assignedTo;

    // Search Functionality
    if (search) {
        query.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { companyName: { $regex: search, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;

    const contacts = await Contact.find(query)
        .populate('assignedTo', 'firstName lastName email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json(
        ApiResponse.success({
            contacts,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        }, 'Contacts Retrieved Successfully')
    );
});

// Get Single Contact
export const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
        .populate('assignedTo', 'firstName lastName email')
        .populate('leadId', 'leadId status stage leadScore');

    if (!contact) {
        throw ApiError.notFound('Contact Not Found');
    }

    res.json(
        ApiResponse.success({ contact }, 'Contact Retrieved Successfully')
    );
});

// Update Contact
export const updateContact = asyncHandler(async (req, res) => {
    const allowedUpdates = [
        'firstName', 'lastName', 'phone', 'companyName', 'jobTitle', 'companySize',
        'industryType', 'country', 'state', 'city', 'zipCode', 'interestedServices',
        'interestedProducts', 'currentChallenges', 'monthlyClaimsVolume', 'currentEHR',
        'timeframe', 'budget', 'status', 'priority', 'assignedTo', 'nextFollowUp'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    });

    if (Object.keys(updates).length === 0) {
        throw ApiError.badRequest('No Valid Fields To Update');
    }

    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
    ).populate('assignedTo', 'firstName lastName email');

    if (!contact) {
        throw ApiError.notFound('Contact Not Found');
    }

    // Recalculate Lead Score If Relevant Fields Updated
    const scoreFields = ['companySize', 'monthlyClaimsVolume', 'timeframe', 'budget', 'interestedServices', 'interestedProducts'];
    if (scoreFields.some(field => updates.hasOwnProperty(field))) {
        contact.calculateLeadScore();
        await contact.save();
    }

    res.json(
        ApiResponse.success({ contact }, 'Contact Updated Successfully')
    );
});

// Delete Contact
export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        throw ApiError.notFound('Contact Not Found');
    }

    await contact.deleteOne();

    res.json(
        ApiResponse.success({}, 'Contact Deleted Successfully')
    );
});

// Convert Contact To Lead
export const convertToLead = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        throw ApiError.notFound('Contact Not Found');
    }

    if (contact.isConverted) {
        throw ApiError.badRequest('Contact Has Already Been Converted');
    }

    // Create Lead From Contact Data
    const lead = await Lead.create({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        companyName: contact.companyName,
        jobTitle: contact.jobTitle,
        companySize: contact.companySize,
        industryType: contact.industryType,
        country: contact.country,
        state: contact.state,
        city: contact.city,
        leadSource: contact.leadSource,
        monthlyClaimsVolume: contact.monthlyClaimsVolume,
        currentEHR: contact.currentEHR,
        currentChallenges: contact.currentChallenges,
        interestedServices: contact.interestedServices,
        interestedProducts: contact.interestedProducts,
        projectTimeframe: contact.timeframe,
        budget: contact.budget,
        assignedTo: contact.assignedTo,
        contactId: contact._id,
        utmSource: contact.utmSource,
        utmMedium: contact.utmMedium,
        utmCampaign: contact.utmCampaign
    });

    // Calculate Lead Score
    lead.calculateLeadScore();
    await lead.save();

    // Update Contact
    await contact.markAsConverted('lead', lead._id);

    res.json(
        ApiResponse.success({
            contact,
            lead: {
                id: lead._id,
                leadId: lead.leadId,
                leadScore: lead.leadScore
            }
        }, 'Contact Converted To Lead Successfully')
    );
});

// Add Note To Contact
export const addNote = asyncHandler(async (req, res) => {
    const { content, type = 'general' } = req.body;

    if (!content) {
        throw ApiError.badRequest('Note Content Is Required');
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        throw ApiError.notFound('Contact Not Found');
    }

    await contact.addNote(content, req.user._id, type);

    res.json(
        ApiResponse.success({}, 'Note Added Successfully')
    );
});

// Get Contact Statistics
export const getContactStats = asyncHandler(async (req, res) => {
    const stats = await Contact.getLeadStats();

    res.json(
        ApiResponse.success({ stats }, 'Contact Statistics Retrieved Successfully')
    );
});

// Get Overdue Follow-ups
export const getOverdueFollowUps = asyncHandler(async (req, res) => {
    const contacts = await Contact.findOverdueFollowUps()
        .populate('assignedTo', 'firstName lastName email')
        .sort({ nextFollowUp: 1 });

    res.json(
        ApiResponse.success({ contacts }, 'Overdue Follow-ups Retrieved Successfully')
    );
});

// Assign Contact To User
export const assignContact = asyncHandler(async (req, res) => {
    const { assignedTo } = req.body;

    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
            assignedTo,
            assignedAt: new Date()
        },
        { new: true }
    ).populate('assignedTo', 'firstName lastName email');

    if (!contact) {
        throw ApiError.notFound('Contact not found');
    }

    res.json(
        ApiResponse.success({ contact }, 'Contact Assigned Successfully')
    );
});