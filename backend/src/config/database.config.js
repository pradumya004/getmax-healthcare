// backend/src/config/database.js

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://sriram:sriram@getmax.dllahhz.mongodb.net/?retryWrites=true&w=majority&appName=GetMax");

        console.log(`🍃 MongoDB Connected: ${connectionInstance.connection.host}`);

        // Connection Event Listeners
        mongoose.connection.on('disconnected', () => {
            console.log('❌ MongoDB disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.log(`❌ MongoDB connection error: ${err}`);
        });
    } catch (err) {
        console.error(`❌ Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;