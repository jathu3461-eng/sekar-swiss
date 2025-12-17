const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    productType: { type: String, required: true },
    designDetails: { type: String, required: true },
    quantity: { type: Number, default: 100 },
    status: { type: String, default: 'pending' },
    estimatedCost: { type: Number },
    finalCost: { type: Number },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', quoteSchema);
