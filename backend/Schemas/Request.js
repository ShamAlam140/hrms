// Request.js
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  requestBy: {
    type: String,
    required: true,
  },
  sentTo: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
