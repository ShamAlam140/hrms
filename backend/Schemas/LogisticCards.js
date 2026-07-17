const mongoose = require("mongoose");

const dashboardStatsSchema = new mongoose.Schema({
  totalRequests: {
    type: Number,
    required: true,
  },
  requestsChange: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  pendingRequests: {
    type: Number,
    required: true,
  },
  approvedRequests: {
    type: Number,
    required: true,
  },
  approvalChange: {
    type: Number,
    required: true,
  },
});

const DashboardStats = mongoose.model("DashboardStats", dashboardStatsSchema);

module.exports = DashboardStats;
