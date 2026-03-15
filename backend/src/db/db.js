const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS to resolve MongoDB SRV records when local DNS fails
dns.setServers(['8.8.8.8', '8.8.4.4']);



function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err);
        })
}

module.exports = connectDB;