const mongoose = require('mongoose');
const dns = require('dns');

// Only override DNS for local development. In Vercel (production), this can break AWS Lambda networking.
if (process.env.NODE_ENV !== 'production') {
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
    } catch (e) {
        console.warn("Failed to set DNS servers:", e.message);
    }
}

// Global variable to track connection state in Serverless environment (Vercel)
let isConnected = false;

async function connectDB() {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("MongoDB connection error:", err);
    }
}

module.exports = connectDB;