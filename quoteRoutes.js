const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// IMPORTANT: Specific routes FIRST
router.get('/quotes/stats', quoteController.getQuotesStats);  // This FIRST

// Then general routes
router.post('/quotes', quoteController.submitQuote);
router.get('/quotes', quoteController.getAllQuotes);

// Parameterized routes LAST
router.get('/quotes/:id', quoteController.getQuoteById);
router.put('/quotes/:id/status', quoteController.updateQuoteStatus);

module.exports = router;
