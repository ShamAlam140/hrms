const mongoose = require("mongoose");

const dashboardMemoSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  memoTitle: {
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
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
});

const DashboardMemo = mongoose.model("DashboardMemo", dashboardMemoSchema);

module.exports = DashboardMemo;
