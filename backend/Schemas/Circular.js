const mongoose = require("mongoose");

const circularSchema = new mongoose.Schema({
  circularTitle: {
    type: String,
    required: true,
  },
  sentFrom: {
    type: String,
    required: true,
  },
  sentTo: {
    type: String,
    required: true,
  },
  generatedDate: {
    type: String,
    required: true,
  },
  // attachment: {
  //   type: Boolean,
  //   default: false,
  // },
  circularType: {
    type: String,
    required: true,
  },
  circularMessage: {
    type: String,
    required: true,
  },
});

const Circular = mongoose.model("Circular", circularSchema);

module.exports = Circular;
