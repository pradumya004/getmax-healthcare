// backend/src/controllers/contact/leadController.controller.js

import Lead from "../../models/Lead.models.js";
import Contact from "../../models/Contact.models.js";
import PricingRequest from './../../models/PricingRequest.models.js';
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { sendEmail } from "../../services/emailService.js";

// Create New Lead
export const createLead = asyncHandler(async (req, res) => {
    const {
        firstName, lastName, email, phone, companyName, jobTitle, companySize,
        industryType, country, state, city, leadSource, monthlyClaimsVolume,
        currentEHR, currentChallenges, interestedServices, interestedProducts,
        projectTimeframe, budget, contactId, pricingRequestId
    } = req.body;

    // Check If Lead Already Exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
        throw ApiError.conflict('Lead With This Email Already Exists');
    }

    // Create Lead
    const lead = await Lead.create({
        firstName, lastName, email, phone, companyName, jobTitle, companySize,
        industryType, country, state, city, leadSource: leadSource || 'manual',
        monthlyClaimsVolume, currentEHR, currentChallenges, interestedServices,
        interestedProducts, projectTimeframe, budget, contactId, pricingRequestId,
        assignedTo: req.user._id, assignedAt: new Date()
    });

    // Calculate Lead Score
    lead.calculateLeadScore();
    await lead.save();

    // Update Linked Contact If Exists
    if (contactId) {
        await Contact.findByIdAndUpdate(contactId, {
            leadId: lead._id,
            isConverted: true,
            convertedTo: 'lead',
            convertedAt: new Date()
        });
    }

    // Update Linked Pricing Request If Exists
    if (pricingRequestId) {
        await PricingRequest.findByIdAndUpdate(pricingRequestId, {
            leadId: lead._id,
            convertedToLead: true
        });
    }

    res.status(201).json(
        ApiResponse.created({ lead }, 'Lead Created Successfully')
    );
});

// Get All Leads
export const getAllLeads = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        status,
        stage,
        priority,
        leadSource,
        assignedTo,
        search
    } = req.query;

    const query = { isDuplicate: false };

    // Add filters
    if (status) query.status = status;
    if (stage) query.stage = stage;
    if (priority) query.priority = priority;
    if (leadSource) query.leadSource = leadSource;
    if (assignedTo) query.assignedTo = assignedTo;

    // Search functionality
    if (search) {
        query.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { companyName: { $regex: search, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;

    const leads = await Lead.find(query)
        .populate('assignedTo', 'firstName lastName email')
        .populate('contactId', 'contactId inquiryType')
        .sort({ leadScore: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await Lead.countDocuments(query);

    res.json(
        ApiResponse.success({
            leads,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        }, 'Leads Retrieved Successfully')
    );
});

// Get Single Lead
export const getLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id)
        .populate('assignedTo', 'firstName lastName email')
        .populate('contactId', 'contactId inquiryType subject')
        .populate('pricingRequestId', 'requestId estimatedPricing')
        .populate('activities.createdBy', 'firstName lastName');

    if (!lead) {
        throw ApiError.notFound('Lead not found');
    }

    res.json(
        ApiResponse.success({ lead }, 'Lead Retrieved Successfully')
    );
});

// Update Lead
export const updateLead = asyncHandler(async (req, res) => {
    const allowedUpdates = [
        'firstName', 'lastName', 'phone', 'companyName', 'jobTitle', 'companySize',
        'industryType', 'country', 'state', 'city', 'interestedServices',
        'interestedProducts', 'currentChallenges', 'monthlyClaimsVolume', 'currentEHR',
        'projectTimeframe', 'budget', 'status', 'stage', 'priority', 'assignedTo',
        'nextFollowUp', 'qualification'
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

    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
    ).populate('assignedTo', 'firstName lastName email');

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    // Recalculate lead score if relevant fields updated
    const scoreFields = ['companySize', 'monthlyClaimsVolume', 'projectTimeframe', 'budget', 'interestedServices', 'interestedProducts'];
    if (scoreFields.some(field => updates.hasOwnProperty(field))) {
        lead.calculateLeadScore();
        await lead.save();
    }

    res.json(
        ApiResponse.success({ lead }, 'Lead Updated Successfully')
    );
});

// Delete Lead
export const deleteLead = asyncHandler(async (req, res) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    await lead.deleteOne();

    res.json(
        ApiResponse.success({}, 'Lead Deleted Successfully')
    );
});

// Add Activity To Lead
export const addActivity = asyncHandler(async (req, res) => {
    const { type, subject, description, outcome, nextAction, scheduledFor, duration, attendees } = req.body;

    if (!type || !subject) {
        throw ApiError.badRequest('Activity Type And Subject Are Required');
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    await lead.addActivity({
        type, subject, description, outcome, nextAction,
        scheduledFor, duration, attendees
    }, req.user._id);

    res.json(
        ApiResponse.success({}, 'Activity Added Successfully')
    );
});

// Schedule Demo
export const scheduleDemo = asyncHandler(async (req, res) => {
    const { scheduledAt, demoType, attendees, conductedBy } = req.body;

    if (!scheduledAt || !demoType) {
        throw ApiError.badRequest('Demo Date And Type Are Required');
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    await lead.scheduleDemo({
        scheduledAt, demoType, attendees,
        conductedBy: conductedBy || req.user._id
    });

    // Send demo confirmation email
    try {
        await sendEmail({
            to: lead.email,
            subject: 'Demo Scheduled - GetMax Healthcare',
            template: 'demo-confirmation',
            data: {
                name: lead.fullName,
                demoDate: new Date(scheduledAt).toLocaleDateString(),
                demoTime: new Date(scheduledAt).toLocaleTimeString(),
                demoType: demoType
            }
        });
    } catch (error) {
        console.error('Failed To Send Demo Confirmation:', error);
    }

    res.json(
        ApiResponse.success({}, 'Demo Scheduled Successfully')
    );
});

// Send Proposal
export const sendProposal = asyncHandler(async (req, res) => {
    const { proposalType, services, estimatedValue, validUntil } = req.body;

    if (!proposalType || !services || !estimatedValue) {
        throw ApiError.badRequest('Proposal Type, Services, And Estimated Value Are Required');
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    await lead.sendProposal({
        proposalType, services, estimatedValue, validUntil
    }, req.user._id);

    // Send proposal email
    try {
        await sendEmail({
            to: lead.email,
            subject: 'Proposal - GetMax Healthcare',
            template: 'proposal-sent',
            data: {
                name: lead.fullName,
                proposalType: proposalType,
                estimatedValue: estimatedValue,
                validUntil: validUntil ? new Date(validUntil).toLocaleDateString() : 'No expiry'
            }
        });
    } catch (error) {
        console.error('Failed To Send Proposal Email:', error);
    }

    res.json(
        ApiResponse.success({}, 'Proposal Sent Successfully')
    );
});

// Update Qualification
export const updateQualification = asyncHandler(async (req, res) => {
    const { budget, authority, need, timeline } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    await lead.updateQualification({ budget, authority, need, timeline });

    res.json(
        ApiResponse.success({
            qualification: lead.qualification,
            qualificationScore: lead.qualificationScore,
            isQualified: lead.isQualified
        }, 'Qualification updated successfully')
    );
});

// Convert Lead To Customer
export const convertToCustomer = asyncHandler(async (req, res) => {
    const { conversionValue } = req.body;

    if (!conversionValue) {
        throw ApiError.badRequest('Conversion Value Is Required');
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    if (lead.isConverted) {
        throw ApiError.badRequest('Lead Has Already Been Converted');
    }

    await lead.convertToCustomer(conversionValue);

    // Update linked contact if exists
    if (lead.contactId) {
        await Contact.findByIdAndUpdate(lead.contactId, {
            isConverted: true,
            convertedTo: 'customer',
            convertedAt: new Date()
        });
    }

    res.json(
        ApiResponse.success({ lead }, 'Lead Converted To Customer Successfully')
    );
});

// Mark Lead As Lost
export const markAsLost = asyncHandler(async (req, res) => {
    const { reason, details, competitor } = req.body;

    if (!reason) {
        throw ApiError.badRequest('Loss Reason Is Required');
    }

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    await lead.markAsLost(reason, details, competitor);

    res.json(
        ApiResponse.success({}, 'Lead Marked As Lost')
    );
});

// Get Lead Stats
export const getLeadStats = asyncHandler(async (req, res) => {
    const stats = await Lead.getConversionStats();

    res.json(
        ApiResponse.success({ stats }, 'Lead Statistics Retrieved Successfully')
    );
});

// Get Hot Leads
export const getHotLeads = asyncHandler(async (req, res) => {
    const leads = await Lead.findHotLeads()
        .populate('assignedTo', 'firstName lastName email')
        .limit(10);

    res.json(
        ApiResponse.success({ leads }, 'Hot Leads Retrieved Successfully')
    );
});

// Get Qualified Leads
export const getQualifiedLeads = asyncHandler(async (req, res) => {
    const leads = await Lead.findQualified()
        .populate('assignedTo', 'firstName lastName email')
        .sort({ leadScore: -1 });

    res.json(
        ApiResponse.success({ leads }, 'Qualified Leads Retrieved Successfully')
    );
});

// Assign Lead To User
export const assignLead = asyncHandler(async (req, res) => {
    const { assignedTo } = req.body;

    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        {
            assignedTo,
            assignedAt: new Date()
        },
        { new: true }
    ).populate('assignedTo', 'firstName lastName email');

    if (!lead) {
        throw ApiError.notFound('Lead Not Found');
    }

    res.json(
        ApiResponse.success({ lead }, 'Lead Assigned Successfully')
    );
});