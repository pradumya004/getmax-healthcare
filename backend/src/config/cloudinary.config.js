// backend/src/config/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';
import config from './environment.config.js';

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// Test Cloudinary Connection
export const testCloudinaryConnection = async () => {
    try {
        const result = await cloudinary.api.ping();
        console.log('Cloudinary Connection Established! ', result);
        return true;
    } catch (error) {
        console.error('Cloudinary Connection Failed: ', error);
        return false;
    }
}

// Upload Configuration Presets
export const uploadPresets = {
    avatars: {
        folder: 'getmax/avatars',
        transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' },
            { quality: 'auto:good' },
            { format: 'auto' }
        ],
        file_types: ['jpg', 'jpeg', 'png', 'webp'],
        max_file_size: 10000000,
    },
    blogImages: {
        folder: 'getmax/blog',
        transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' },
            { quality: 'auto:good' },
            { format: 'auto' }
        ],
        file_types: ['jpg', 'jpeg', 'png', 'webp'],
        max_file_size: 10000000,
    },
    caseStudyImages: {
        folder: 'getmax/case-studies',
        transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' },
            { quality: 'auto:good' },
            { format: 'auto' }
        ],
        file_types: ['jpg', 'jpeg', 'png', 'webp'],
        max_file_size: 10000000,
    },
    productImages: {
        folder: 'getmax/products',
        transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' },
            { quality: 'auto:good' },
            { format: 'auto' }
        ],
        file_types: ['jpg', 'jpeg', 'png', 'webp'],
        max_file_size: 10000000,
    },
    logos: {
        folder: 'getmax/logos',
        transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' },
            { quality: 'auto:good' },
            { format: 'auto' }
        ],
        file_types: ['jpg', 'jpeg', 'png', 'webp'],
        max_file_size: 10000000,
    },
    documents: {
        folder: 'getmax/documents',
        transformation: [
            { width: 400, height: 400, crop: 'fill', gravity: 'face' },
            { quality: 'auto:good' },
            { format: 'auto' }
        ],
        file_types: ['jpg', 'jpeg', 'png', 'webp'],
        max_file_size: 25000000,
    },
    raw: {
        folder: 'getmax/raw',
        resource_type: 'raw',
        max_file_size: 50000000, // 50MB
        tags: ['raw', 'original']
    }
};

export default cloudinary;