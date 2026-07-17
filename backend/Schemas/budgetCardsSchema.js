const mongoose = require("mongoose");

const budgetCardsSchema = new mongoose.Schema({
  totalAnnualBudget: {
    type: Number,
    required: true,
  },
  annualBudgetChange: {
    type: Number,
    required: true,
  },
  amountUsed: {
    type: Number,
    required: true,
  },
  totalBudgetBalance: {
    type: Number,
    required: true,
  },
  budgetPercentageUsed: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("BudgetCards", budgetCardsSchema);
