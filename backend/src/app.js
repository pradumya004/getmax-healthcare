// backend/src/app.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
// import rateLimit from 'express-rate-limit';

// Import middleware and config
import errorHandler from './middleware/errorHandler.js';
import config from './config/environment.config.js';

const app = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: config.frontendUrl,
    credentials: true
}));

// Compression middleware
app.use(compression());

// Request logging
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false
// });

// app.use(limiter); // Apply globally without path

// app.use('/api', limiter);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'GetMax Healthcare API is running! 🏥',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Test route for development
app.get('/api/test', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API is working perfectly!',
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
import authRoutes from './routes/auth/authRoutes.route.js';
import contactRoutes from './routes/contact/contactRoutes.route.js';
import leadRoutes from './routes/contact/leadRoutes.route.js'
import pricingRoutes from './routes/pricing/pricingRoutes.route.js';
import newsletterRoutes from './routes/contact/newsletterRoutes.route.js';


app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/lead', leadRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/newsletter', newsletterRoutes);
// app.use('/api/content', blogRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/careers', careerRoutes);
// app.use('/api/admin', adminRoutes);

// Catch 404 routes
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler
app.use(errorHandler);

export default app;