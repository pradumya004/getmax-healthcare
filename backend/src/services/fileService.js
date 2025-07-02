// backend/src/services/fileService.js

import cloudinary from "../config/cloudinary.config.js";
import ApiError from "../utils/ApiError.js";

// Uploading On Cloudinary
const uploadToCloudinary = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                ...options
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
        uploadStream.end(buffer);
    });
};

// Upload Single File
export const uploadFile = async (file, options = {}) => {
    try {
        const result = await uploadToCloudinary(file.buffer,
            {
                folder: options.folder || 'getmax',
                transformation: options.transformation,
                ...options
            }
        );

        return {
            publicId: result.public_id,
            url: result.secure_url,
            format: result.format,
            width: result.width,
            height: result.height,
            size: result.bytes
        };
    } catch (error) {
        console.error('Upload Failed: ', error);
        throw new ApiError(500, 'File upload failed!');
    }
};

// Upload Avatar
export const uploadAvatar = async (file, userId) => {
    return uploadFile(file,
        {
            folder: `getmax/avatars/${userId}`,
            transformation: [
                { width: 400, height: 400, crop: 'fill' },
                { quality: 'auto' }
            ]
        }
    );
};

// Upload Image
export const uploadImage = async (file, folder = 'getmax/images') => {
    return uploadFile(file,
        {
            folder: folder,
            transformation: [
                { width: 1200, height: 800, crop: 'limit' },
                { quality: 'auto' }
            ]
        }
    );
};

// Upload Document
export const uploadDocument = async (file, folder = 'getmax/documents') => {
    return uploadFile(file,
        {
            folder: folder,
            resource_type: 'raw'
        }
    )
};

// Delete File
export const deleteFile = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === 'ok';
    } catch (error) {
        console.error(`Error Deleting File: ${error}`);
        throw new ApiError(500, 'File Deletion Failed');
    }
};

export default {
    uploadFile,
    uploadAvatar,
    uploadDocument,
    uploadImage,
    deleteFile
};