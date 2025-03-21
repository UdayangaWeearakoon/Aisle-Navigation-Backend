const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    current_stock: { type: Number, required: true },
    min_quan: { type: Number, required: true },
    max_quan: { type: Number, required: true },
    last_updated: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Inventory', inventorySchema);