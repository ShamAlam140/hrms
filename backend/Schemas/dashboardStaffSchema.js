const mongoose = require("mongoose");

const dashboardStaffSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  staffName: {
    type: String,
    required: true,
  },
  staffRole: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
});

const DashboardStaffSchema = mongoose.model(
  "DashboardStaff",
  dashboardStaffSchema
);

module.exports = DashboardStaffSchema;
