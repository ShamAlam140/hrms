// models/stock.js
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false,
  },
  productName: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantityPurchased: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
},
{
  timestamps:true
});

module.exports = mongoose.model("Stock", stockSchema);
