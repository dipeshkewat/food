// start server
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

// Connect to the database
connectDB();

// Only listen locally if we are not in a Vercel serverless environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

// Export the app for Vercel
module.exports = app;