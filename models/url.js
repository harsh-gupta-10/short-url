const { type, redirect } = require('express/lib/response');
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String, 
        required: true,
        unqiue: true
    },

    redirectURL: {
        type: String,
        required: true
    },
    countclicks: {
        type: Number,
        default: 0
    },
    visitHistory: [ { timestamp: {type: Number} } ],
    }, 
    {timestamp: true}
);

const { URL } = mongoose.model('URL', urlSchema);

module.exports = URL;