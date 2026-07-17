const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  paymentName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  dateGenerated: {
    type: Date,
    default: Date.now,
  },
  paymentMonth: {
    type: String,
    required: true,
  },
  paymentYear: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
