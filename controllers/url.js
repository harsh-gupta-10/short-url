const axios = require('axios');
const URL = require('../models/url');
const shortid = require('shortid');

// Function to get IP location (now a placeholder as location is not needed)
async function getIpLocation(ip) {
    // Simply return an empty object or mock data if necessary
    return {};
}

// Function to handle URL redirection and tracking
async function handleRedirect(req, res) {
    const shortid = req.params.shortid;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        // Fetch IP location (not used anymore, but kept for future use if needed)
        const location = await getIpLocation(ip);

        // Extract device and browser info
        const userAgent = req.headers['user-agent'] || '';
        const device = /Mobile|Android|iP(ad|hone|od)|IEMobile|Opera Mini/i.test(userAgent) ? 'Mobile' : 'Desktop';
        const browser = userAgent.split(' ')[0]; // Simple browser detection, could be enhanced

        // Update the visit history without location
        const result = await URL.findOneAndUpdate(
            { shortID: shortid },
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date(),
                        ipAddress: ip,
                        device,
                        browser
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
}

// Function to generate short URL
async function handleGenerateShortURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    const shortID = shortid.generate(); // Generate shortID

    try {
        // Create a new document in the database
        const newURL = await URL.create({
            shortID,
            redirectURL: body.url,
            visitHistory: []
        });

        // Return the generated short ID
        return res.json({ id: newURL.shortID });
    } catch (err) {
        return res.status(500).json({ message: 'Error generating short URL', error: err.message });
    }
}

// Function to get analytics for a short URL
async function handleGetAnalytics(req, res) {
    const shortID = req.params.shortid;

    try {
        const result = await URL.findOne({ shortID });

        if (!result) {
            return res.status(404).json({ message: 'Short URL not found' });
        }

        return res.json({ 
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching analytics', error });
    }
}

module.exports = { 
    handleGenerateShortURL,
    handleGetAnalytics,
    handleRedirect // Ensure you export the new function
};
