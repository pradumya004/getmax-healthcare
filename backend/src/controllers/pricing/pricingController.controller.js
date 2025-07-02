// backend/src/controllers/pricing/pricingController.controller.js

import PricingRequest from "../../models/PricingRequest.models.js";
import Contact from "../../models/Contact.models.js";
import Lead from "../../models/Lead.models.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { sendEmail } from "../../services/emailService.js";

// Create New Pricing Request
export const createPricingRequest = asyncHandler(async (req, res) => {
    const {
        fullName, workEmail, companyName, phoneNumber, country, claimsPerMonth,
        monthlyCollections, ehrUsed, hasInHouseBillingStaff, inHouseStaffCount,
        currentVendor, currentVendorPricing, rcmServicesNeeded, specificServices,
        preferredPricingModel, budgetRange, currentChallenges, primaryPainPoint,
        implementationTimeframe, urgencyLevel, decisionMaker, decisionTimeline,
        evaluationCriteria, source, referralSource, utmSource, utmMedium,
        utmCampaign, utmTerm, utmContent, marketingConsent, termsAccepted
    } = req.body;

    // Check If Pricing Request Already Exists For This Email
    const existingRequest = await PricingRequest.findOne({ workEmail });
    if (existingRequest) {
        throw ApiError.conflict('Pricing Request For This Email Already Exists');
    }

    // Create Pricing Request
    const pricingRequest = await PricingRequest.create({
        fullName, workEmail, companyName, phoneNumber, country, claimsPerMonth,
        monthlyCollections, ehrUsed, hasInHouseBillingStaff, inHouseStaffCount,
        currentVendor, currentVendorPricing, rcmServicesNeeded, specificServices,
        preferredPricingModel, budgetRange, currentChallenges, primaryPainPoint,
        implementationTimeframe, urgencyLevel, decisionMaker, decisionTimeline,
        evaluationCriteria, source: source || 'pricing-calculator',
        referralSource, utmSource, utmMedium, utmCampaign, utmTerm, utmContent,
        marketingConsent, termsAccepted, ipAddress: req.ip,
        userAgent: req.get('User-Agent')
    });

    // Calculate Pricing Estimates
    pricingRequest.calculatePricing();
    pricingRequest.calculateSavings();
    await pricingRequest.save();

    // Check If Contact Exists, Create If Not
    let contact = await Contact.findOne({ email: workEmail });
    if (!contact) {
        const [firstName, ...lastNameParts] = fullName.split(' ');
        const lastName = lastNameParts.join(' ') || '';

        contact = await Contact.create({
            firstName,
            lastName,
            email: workEmail,
            phone: phoneNumber,
            companyName,
            country,
            inquiryType: 'pricing-request',
            subject: `Pricing Request - ${preferredPricingModel}`,
            message: `Pricing request for ${rcmServicesNeeded.join(', ')}`,
            interestedServices: rcmServicesNeeded,
            currentChallenges,
            monthlyClaimsVolume: claimsPerMonth,
            currentEHR: ehrUsed,
            timeframe: implementationTimeframe,
            budget: budgetRange,
            leadSource: 'pricing-calculator',
            utmSource, utmMedium, utmCampaign, utmTerm, utmContent,
            marketingConsent,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });

        contact.calculateLeadScore();
        await contact.save();
    }

    // Link Contact To Pricing Request
    pricingRequest.contactId = contact._id;
    await pricingRequest.save();

    // Auto-Qualify High-Value Requests
    const estimatedAnnual = pricingRequest.estimatedPricing?.fteModel?.annualCost || 0;
    if (estimatedAnnual > 100000 || urgencyLevel === 'Critical') {
        pricingRequest.priority = 'Hot';
        await pricingRequest.save();
    }

    // Send Auto-Response Email With Pricing
    try {
        await sendEmail({
            to: workEmail,
            subject: 'Your GetMax Healthcare Pricing Estimate',
            template: 'pricing-estimate',
            data: {
                name: fullName,
                companyName,
                estimatedPricing: pricingRequest.estimatedPricing,
                potentialSavings: pricingRequest.potentialSavings,
                requestId: pricingRequest.requestId
            }
        });

        pricingRequest.autoEmailSent = true;
        pricingRequest.autoEmailSentAt = new Date();
        await pricingRequest.save();
    } catch (error) {
        console.error('Failed To Send Pricing Email: ', error);
    }

    res.status(201).json(
        ApiResponse.created({
            pricingRequest: {
                requestId: pricingRequest.requestId,
                estimatedPricing: pricingRequest.estimatedPricing,
                potentialSavings: pricingRequest.potentialSavings
            }
        }, 'Pricing request created successfully')
    );
});

// Get All Pricing Requests
export const getAllPricingRequests = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        status,
        priority,
        urgencyLevel,
        implementationTimeframe,
        assignedTo,
        search
    } = req.query;

    const query = {};

    // Add filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (urgencyLevel) query.urgencyLevel = urgencyLevel;
    if (implementationTimeframe) query.implementationTimeframe = implementationTimeframe;
    if (assignedTo) query.assignedTo = assignedTo;

    // Search functionality
    if (search) {
        query.$or = [
            { fullName: { $regex: search, $options: 'i' } },
            { workEmail: { $regex: search, $options: 'i' } },
            { companyName: { $regex: search, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;

    const requests = await PricingRequest.find(query)
        .populate('assignedTo', 'firstName lastName email')
        .populate('contactId', 'contactId status leadScore')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const total = await PricingRequest.countDocuments(query);

    res.json(
        ApiResponse.success({
            requests,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        }, 'Pricing Requests Retrieved Successfully')
    );
});

// Get Single Pricing Request
export const getPricingRequest = asyncHandler(async (req, res) => {
    const request = await PricingRequest.findById(req.params.id)
        .populate('assignedTo', 'firstName lastName email')
        .populate('contactId', 'contactId status leadScore')
        .populate('leadId', 'leadId status stage');

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    res.json(
        ApiResponse.success({ request }, 'Pricing Request Retrieved Successfully')
    );
});

// Update Pricing Request
export const updatePricingRequest = asyncHandler(async (req, res) => {
    const allowedUpdates = [
        'status', 'priority', 'assignedTo', 'followUpDate', 'urgencyLevel',
        'implementationTimeframe', 'budgetRange', 'rcmServicesNeeded',
        'currentChallenges', 'decisionTimeline'
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

    const request = await PricingRequest.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
    ).populate('assignedTo', 'firstName lastName email');

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    // Recalculate Pricing If Services Changed
    if (updates.rcmServicesNeeded) {
        request.calculatePricing();
        request.calculateSavings();

        await request.save();
    }

    res.json(
        ApiResponse.success({ request }, 'Pricing Request Updated Successfully')
    )
});

// Delete Pricing Request
export const deletePricingRequest = asyncHandler(async (req, res) => {
    const request = await PricingRequest.findById(req.params.id);

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    await request.deleteOne();

    res.json(
        ApiResponse({}, 'Pricing Request Deleted Successfully')
    );
});

// Send Quote
export const sendQuote = asyncHandler(async (req, res) => {
    const { validDays = 30, customPricing, additionalNotes } = req.body;

    const request = await PricingRequest.findById(req.params.id);

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    if (request.quoteSent) {
        throw ApiError.badRequest('Quote Has Already Been Sent');
    }

    // Use Custom Pricing If Provided, Otherwise Use Calculated Pricing
    const finalPricing = customPricing || request.estimatedPricing;

    await request.sendQuote(req.user._id, validDays);

    // Send Quote Email
    try {
        await sendEmail({
            to: request.workEmail,
            subject: 'Your Custom Quote - GetMax Healthcare',
            template: 'custom-quote',
            data: {
                name: request.fullName,
                companyName: request.companyName,
                pricing: finalPricing,
                validUntil: new Date(Date.now() + validDays * 24 * 60 * 60 * 1000).toLocaleDateString(),
                additionalNotes,
                requestId: request.requestId
            }
        });
    } catch (error) {
        console.error('Failed To Send Quote Email: ', error);
        throw ApiError.internalServerError('Quote Updated But Email Failed To Send');
    }

    res.json(
        ApiResponse.success({}, 'Quote Sent Successfully')
    );
});

// Convert To Lead
export const convertToLead = asyncHandler(async (req, res) => {
    const request = await PricingRequest.findById(req.params.id)
        .populate('contactId');

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    if (request.convertedToLead) {
        throw ApiError.badRequest('Request Has Already Been Converted To Lead');
    }

    // Create Lead From Pricing Request Data
    const [firstName, ...lastNameParts] = request.fullName.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    const lead = await Lead.create({
        firstName,
        lastName,
        email: request.workEmail,
        phone: request.phoneNumber,
        companyName: request.companyName,
        country: request.country,
        leadSource: 'pricing-calculator',
        monthlyClaimsVolume: request.claimsPerMonth,
        currentEHR: request.ehrUsed,
        currentChallenges: request.currentChallenges,
        interestedServices: request.rcmServicesNeeded,
        serviceType: 'full-rcm',
        preferredPricingModel: request.preferredPricingModel,
        projectTimeframe: request.implementationTimeframe,
        budget: request.budgetRange,
        decisionCriteria: request.evaluationCriteria,
        estimatedAnnualValue: request.estimatedPricing?.fteModel?.annualCost,
        assignedTo: request.assignedTo,
        contactId: request.contactId?._id,
        pricingRequestId: request._id,
        utmSource: request.utmSource,
        utmMedium: request.utmMedium,
        utmCampaign: request.utmCampaign
    });

    // Set Qualification Based On Pricing Request Data
    lead.qualification = {
        budget: request.budgetRange !== 'not-disclosed',
        authority: request.decisionMaker === 'Yes',
        need: request.currentChallenges.length > 0,
        timeline: request.implementationTimeframe !== 'Just exploring'
    };

    lead.calculateLeadScore();
    await lead.save();

    // Update Pricing Request
    await request.convertToLead(lead._id, request.contactId?._id);

    // Update Linked Contact
    if (request.contactId) {
        await Contact.findByIdAndUpdate(request.contactId._id, {
            leadId: lead._id,
            isConverted: true,
            convertedTo: 'lead',
            convertedAt: new Date()
        });
    }

    res.json(
        ApiResponse.success({
            request,
            lead: {
                id: lead._id,
                leadId: lead.leadId,
                leadScore: lead.leadScore
            }
        }, 'Pricing Request Converted To Lead Successfully')
    );
});

// Add Note To Pricing Request
export const addNote = asyncHandler(async (req, res) => {
    const { content, type = 'note' } = req.body;

    if (!content) {
        throw ApiError.badRequest('Note Content Is Required');
    }

    const request = await PricingRequest.findById(req.params.id);

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    await request.addNote(content, req.user._id, type);

    res.json(
        ApiResponse.success({}, 'Note Added Successfully')
    );
});

// Mark As Lost
export const markAsLost = asyncHandler(async (req, res) => {
    const { reason, details, competitor } = req.body;

    if (!reason) {
        throw ApiError.badRequest('Loss Reason Is Required');
    }

    const request = await PricingRequest.findById(req.params.id);

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    await request.markAsLost(reason, details, competitor);

    res.json(
        ApiResponse.success({}, 'Pricing Request Marked As Lost')
    );
});

// Get Pricing Statistics
export const getPricingStats = asyncHandler(async (req, res) => {
    const stats = await PricingRequest.getPricingStats();

    res.json(
        ApiResponse.success({ stats }, 'Pricing Statistics Retrieved Successfully')
    );
});

// Get Overdue Follow-ups
export const getOverdueFollowUps = asyncHandler(async (req, res) => {
    const requests = await PricingRequest.findOverdueFollowUps()
        .populate('assignedTo', 'firstName lastName email')
        .sort({ followUpDate: 1 });

    res.json(
        ApiResponse.success({ requests }, 'Overdue Follow-ups Retrieved Successfully')
    );
});

// Get High Priority Requests
export const getHighPriorityRequests = asyncHandler(async (req, res) => {
    const requests = await PricingRequest.findHighPriority()
        .populate('assignedTo', 'firstName lastName email')
        .limit(10);

    res.json(
        ApiResponse.success({ requests }, 'High Priority Requests Retrieved Successfully')
    );
});

// Schedule Follow-up
export const scheduleFollowUp = asyncHandler(async (req, res) => {
    const { days = 7 } = req.body;

    const request = await PricingRequest.findById(req.params.id);

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    await request.scheduleFollowUp(days);

    res.json(
        ApiResponse.success({}, 'Follow-up Scheduled Successfully')
    );
});

// Assign Pricing Request To User
export const assignPricingRequest = asyncHandler(async (req, res) => {
    const { assignedTo } = req.body;

    const request = await PricingRequest.findByIdAndUpdate(
        req.params.id,
        {
            assignedTo,
            assignedAt: new Date()
        },
        { new: true }
    ).populate('assignedTo', 'firstName lastName email');

    if (!request) {
        throw ApiError.notFound('Pricing Request Not Found');
    }

    res.json(
        ApiResponse.success({ request }, 'Pricing Request Assigned Successfully')
    );
});