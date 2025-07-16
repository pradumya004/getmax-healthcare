// backend/server.js

import app from "./src/app.js";
import connectDB from "./src/config/database.config.js"
import config from "./src/config/environment.config.js";
import dotenv from 'dotenv';

dotenv.config();

console.log("📦 Loaded .env EMAIL_USER:", process.env.EMAIL_USER);

const PORT = config.port;

connectDB();

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌍 Frontend URL: ${config.frontendUrl}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`❌ Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`❌ Uncaught Exception: ${err.message}`);
    process.exit(1);
});

import fs from 'fs';
import path from 'path';

fs.watch('./', { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`🌀 Change detected in: ${filename} [${eventType}]`);
  }
});