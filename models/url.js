const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID: { type: String, required: true },
    redirectURL: { type: String, required: true },
    visitHistory: [
        {
            timestamp: { type: Date, default: Date.now }  // Ensure this is of type Date
        }
    ]
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;  // Corrected typo
