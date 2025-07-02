// backend/src/controllers/auth/profileController.controller.js

import User from "../../models/User.models.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { uploadAvatar, deleteFile } from "../../services/fileService";
import { body } from 'express-validator';

// Get user info
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        throw new ApiError.notFound('User not found');
    }

    res.json(
        ApiResponse.success({ user }, 'Profile retrieved successfully')
    );
});

// Update Profile
export const updateProfile = asyncHandler(async (req, res) => {
    const allowedUpdates = [
        'firstName', 'lastName', 'phone', 'companyName', 'jobTitle',
        'country', 'state', 'city', 'industryType', 'companySize',
        'monthlyClaimsVolume', 'currentEHR', 'preferences'
    ];

    const updates = {};

    Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key) && key.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    });

    if (Object.keys(updates).length === 0) {
        throw ApiError.badRequest('No valid fields to update');
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true, runValidators: true }
    );

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    res.json(
        ApiResponse.success({ user }, 'Profile updated successfully')
    );
});

// Upload Avatar
export const uploadUserAvatar = asyncHandler(async (req, res) => {
    const file = req.file;

    if (!file) {
        throw ApiError.badRequest('No image file provided');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    try {
        // Delete old avatar if exists
        if (user.avatar && user.avatar.publicId) {
            await deleteFile(user.avatar.publicId);
        }

        // Upload new one
        const result = await uploadAvatar(file, req.user.id);

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            {
                avatar: {
                    url: result.url,
                    publicId: result.publicId
                }
            },
            { new: true }
        );

        res.json(
            ApiResponse.success({
                avatar: updatedUser.avatar,
                user: updatedUser
            }, 'Avatar Uploaded Successfully')
        );
    } catch (error) {
        console.error(`Avatar upload failed: ${error}`);
        throw ApiError.internalServerError('Failed to upload avatar');
    }
});

// Delete Avatar
export const deleteUserAvatar = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    if (!(user.avatar && user.avatar.publicId)) {
        throw ApiError.badRequest('No avatar to delete');
    }

    try {
        // Delete url from cloudinary
        await deleteFile(user.avatar.publicId);

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $unset: { avatar: 1 } },
            { new: true }
        );

        res.json(
            ApiResponse.success({ updatedUser }, 'Avatar deleted successfully')
        );
    } catch (error) {
        console.error(`Unable to delete avatar: ${error}`);
        throw ApiError.internalServerError('Failed to delete avatar');
    }
});