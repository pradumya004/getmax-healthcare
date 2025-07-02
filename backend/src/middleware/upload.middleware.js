// backend/src/middleware/upload.middleware.js

import multer from 'multer';
import ApiError from '../utils/ApiError.js';

// Allowed File Types
const allowedImages = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const allowedDocs = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const maxFileSize = 10 * 1024 * 1024;
const maxFileCount = 5;

// Validating Files
const validateFile = (req, file, cb) => {

    const allowedAll = [...allowedImages, ...allowedDocs];

    if (!allowedAll.includes(file.mimeType)) {
        return cb(new ApiError(400, 'File Type Not Allowed'), false);
    }

    cb(null, true);
};



// Basic Upload Configuration
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: validateFile,
    limits: {
        fileSize: maxFileSize,
        files: maxFileCount
    }
});

// Handle Upload Errors
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new ApiError(400, `File(s) too large! Maximum size allowed - ${maxFileSize}MB`));
        }

        if (err.code === 'LIMIT_FILE_COUNT') {
            return next(new ApiError(400, `Too many files! Maximum files allowed - ${maxFileCount}`));
        }

        return next(new ApiError(400, `Upload error: ${err.message}`));
    }

    if (err) {
        return next(err);
    }

    next();
};

// Single File Upload
export const uploadSingle = (file) => {
    return [upload.single(file), handleUploadError];
}

// Multiple File Upload
export const uploadMultiple = (file, maxCount = 5) => {
    return [upload.array(file, maxCount), handleUploadError];
}

export const uploadAvatar = uploadSingle('avatar');
export const uploadImages = uploadMultiple('images', 5);
export const uploadDocuments = uploadMultiple('documents', 3);

export default { uploadSingle, uploadMultiple, uploadAvatar, uploadImages, uploadDocuments };