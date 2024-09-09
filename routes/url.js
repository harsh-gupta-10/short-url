const express = require('express');
const { handleGenerateShortURL, handleGetAnalytics, handleRedirect } = require('../controllers/url');

const router = express.Router();

// POST route for generating short URL
router.post('/', handleGenerateShortURL);

// GET route for redirecting and tracking
router.get('/:shortid', handleRedirect);

// GET route for analytics
router.get('/analytics/:shortid', handleGetAnalytics);

module.exports = router;
