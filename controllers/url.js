const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if(!body.url) {
        return res.status(400).json({ message: 'URL is required' });
    }
    const shortID = shortid( );
    await create({ shortID, 
        redirectURL: body.url,
        
        visitHistory: []
    
     });
     return res.json({ id: shortID });
}
module.exports = { handleGenerateShortURL };
