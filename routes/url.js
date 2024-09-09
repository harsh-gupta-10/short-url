const express = require('express');
const { handleGenerateShortURL } = require('../controllers/url');

const router = express.Router();

// POST route for generating short URL
router.post('/', handleGenerateShortURL);

module.exports = router;  // Corrected typo
