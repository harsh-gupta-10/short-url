const shortid = require('shortid');
const URL = require('../models/url');

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

module.exports = { handleGenerateShortURL };
