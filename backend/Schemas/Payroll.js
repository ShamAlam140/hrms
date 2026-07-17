const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  paymentName: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  paymentName: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  generatedDate: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default:"pending",
    required: true,
  },
});

const Payroll = mongoose.model("Payroll", payrollSchema);

module.exports = Payroll;
