const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    message: { type: String, required: true }, // Stores activity description
    timestamp: { type: Date, default: Date.now },
    type: { type: String, enum: ['PRICE_UPDATE', 'STOCK_UPDATE', 'LOW_STOCK', 'OUT_OF_STOCK', 'PROMOTION'], required: true }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);