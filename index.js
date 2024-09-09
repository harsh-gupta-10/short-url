const express = require('express');
const urlRoute = require('./routes/url');
const { connecttoMongoDB } = require('./connect');
const URL = require('./models/url');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// MongoDB connection
connecttoMongoDB('mongodb://localhost:27017/short-url')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection failed', err));

// URL route
app.use("/url", urlRoute);

// Redirect handler with IP tracking (without location data)
app.get('/:shortid', async (req, res) => {
    const shortid = req.params.shortid;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        // Update the visit history without location data
        const result = await URL.findOneAndUpdate(
            { shortID: shortid },
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date(),
                        ipAddress: ip,
                        // Removed location data from visitHistory
                    }
                }
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        return res.redirect(result.redirectURL);
    } catch (error) {
        return res.status(500).json({ message: 'Error handling the redirect', error });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
