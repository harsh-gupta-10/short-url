const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    device: { type: String },
    browser: { type: String }
});

const urlSchema = new mongoose.Schema({
    shortID: { type: String, required: true },
    redirectURL: { type: String, required: true },
    visitHistory: [visitSchema]
});

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
