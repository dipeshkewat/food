// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');
const connectDB = require('./db/db');

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "https://food-backend-seven-khaki.vercel.app"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Ensure DB is connected before handling any request
// Critical for Vercel serverless cold starts
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;