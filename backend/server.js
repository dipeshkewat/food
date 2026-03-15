// start server
require('dotenv').config();
const app = require('./src/app');

// Only listen locally if we are not in a Vercel serverless environment
if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}

// Export the app for Vercel
module.exports = app;