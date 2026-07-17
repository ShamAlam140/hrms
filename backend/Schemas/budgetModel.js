const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  budgetNo: {
    type: String,
    required: true,
  },
  budgetDescription: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: false,
  },
  budgetedAmount: {
    type: Number,
    required: true,
  },
  actualAmount: {
    type: Number,
    required: true,
  },
  variance: {
    type: Number,
    required: true,
  },
  generatedDate: {
    type: String,
    required: true,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
