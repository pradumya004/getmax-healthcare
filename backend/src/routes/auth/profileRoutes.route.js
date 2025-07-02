// backend/src/routes/auth/profileRoutes.route.js

import express from 'express';
import {
    getProfile,
    updateProfile,
    deleteUserAvatar,
    uploadUserAvatar
} from '../../controllers/auth/profileController.controller.js';
import { generalLimiter } from '../../middleware/rateLimiting.middleware.js';
import { protect } from '../../middleware/auth.middleware.js';
import { uploadAvatar } from '../../middleware/upload.middleware.js';

const router = express.Router();

// Authentication
router.use(protect);
router.use(generalLimiter);

// Profile Routes
router.get('/', getProfile);
router.put('/', updateProfile);

// Avatar Routes
router.post('/', uploadAvatar, uploadUserAvatar);
router.delete('/', deleteUserAvatar);