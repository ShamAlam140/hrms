const mongoose = require("mongoose");

const dashboardCardsSchema = new mongoose.Schema({
  totalStaff: {
    type: Number,
    required: true,
  },
  staffChange: {
    type: Number,
    required: true,
  },
  totalApplications: {
    type: Number,
    required: true,
  },
  applicationChange: {
    type: Number,
    required: true,
  },
  totalProjects: {
    type: Number,
    required: true,
  },
  projectChange: {
    type: Number,
    required: true,
  },
  totalDepartments: {
    type: Number,
    required: true,
  },
});

const DashboardCards = mongoose.model("DashboardCards", dashboardCardsSchema);

module.exports = DashboardCards;
