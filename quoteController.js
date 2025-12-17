const Quote = require('../models/Quote');

exports.submitQuote = async (req, res) => {
    try {
        const quote = new Quote(req.body);
        await quote.save();
        res.status(201).json({ success: true, data: quote });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json({ success: true, data: quotes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getQuoteById = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: quote });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateQuoteStatus = async (req, res) => {
    try {
        const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!quote) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: quote });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getQuotesStats = async (req, res) => {
    try {
        const total = await Quote.countDocuments();
        const pending = await Quote.countDocuments({ status: 'pending' });
        const completed = await Quote.countDocuments({ status: 'completed' });
        res.json({ success: true, data: { total, pending, completed } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
