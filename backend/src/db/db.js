const mongoose = require('mongoose');

// Cache the connection promise so all concurrent requests share it
let cachedConnection = null;

async function connectDB() {
    // If already connected, return immediately
    if (mongoose.connection.readyState === 1) {
        return;
    }

    // If a connection attempt is already in progress, reuse it
    if (cachedConnection) {
        await cachedConnection;
        return;
    }

    try {
        cachedConnection = mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false,       // Fail fast instead of buffering for 10s
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });

        await cachedConnection;
        console.log("MongoDB connected successfully");
    } catch (err) {
        // Reset the cache so the next request can retry
        cachedConnection = null;
        console.error("MongoDB connection error:", err);
        throw err; // Re-throw so the caller knows connection failed
    }
}

module.exports = connectDB;