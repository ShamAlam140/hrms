const express = require("express");
const router = express.Router();
const dashboardStaffController = require("../Controller/dashboardStaffController");

// Route to create a new staff member
router.post("/staff", dashboardStaffController.createStaff);

// Route to get all staff members
router.get("/staff", dashboardStaffController.getAllStaff);

// Route to get a specific staff member by ID
router.get("/staff/:id", dashboardStaffController.getStaffById);

// Route to update a specific staff member by ID
router.put("/staff/:id", dashboardStaffController.updateStaff);

// Route to delete a specific staff member by ID
router.delete("/staff/:id", dashboardStaffController.deleteStaff);

module.exports = router;
