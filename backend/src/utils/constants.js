// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};

// User Roles
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    MODERATOR: 'moderator',
}

// Service Types
export const SERVICE_TYPES = {
    PROVIDER_RCM: 'provider-rcm',
    BILLING_COMPANY: 'billing-company',
    AR_MANAGEMENT: 'ar-management',
    CODING: 'coding',
    CREDENTIALING: 'credentialing',
    DENIAL_MANAGEMENT: 'denial-management',
}

// Product Types
export const PRODUCT_TYPES = {
    BET_TOOL: 'bet-tool',
    QMS: 'qms',
    EBV_BOT: 'ebv-bot',
    RCM_BLACKBOX: 'rcm-blackbox',
    SMARTDASH: 'smartdash'
};

// Email Types
export const EMAIL_TYPES = {
    CONTACT: 'contact',
    NEWSLETTER: 'newsletter',
    PRICING_REQUEST: 'pricing-request',
    DEMO_REQUEST: 'demo-request',
    CAREER_APPLICATION: 'career-application'
};

// File Upload Limits
export const FILE_LIMITS = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB for images
    MAX_DOCUMENT_SIZE: 25 * 1024 * 1024, // 25MB for documents
    MAX_VIDEO_SIZE: 100 * 1024 * 1024, // 100MB for videos

    ALLOWED_TYPES: [
        // Images
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'image/bmp',
        'image/tiff',

        // Documents
        'application/pdf',
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/vnd.ms-excel', // .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-powerpoint', // .ppt
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'text/plain', // .txt
        'text/csv', // .csv
        'application/rtf', // .rtf

        // Archives
        'application/zip',
        'application/x-rar-compressed',
        'application/x-7z-compressed',
        'application/gzip',

        // Medical Files (DICOM, etc)
        'application/dicom',
        'application/octet-stream',

        // Video Files
        'video/mp4',
        'video/avi',
        'video/quicktime',
        'video/x-msvideo',
        'video/webm',

        // Audio Files
        'audio/mpeg',
        'audio/wav',
        'audio/ogg',
        'audio/mp3',

        // Other
        'application/json',
        'application/xml',
        'text/xml'
    ],

    // File type categories
    IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    SPREADSHEET_TYPES: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
    VIDEO_TYPES: ['video/mp4', 'video/avi', 'video/quicktime', 'video/webm'],
    AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3']
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
};

// Rate Limiting
export const RATE_LIMITS = {
    GENERAL: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100
    },
    AUTH: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 5
    },
    CONTACT: {
        windowMs: 60 * 60 * 1000, // 1 hour
        max: 3
    }
};