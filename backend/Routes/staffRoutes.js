const express = require("express");
const router = express.Router();
const staffController = require("../Controller/staffController");

// Route to create new staff
router.post("/", staffController.createStaff);

// Route to get all staff
router.get("/", staffController.getAllStaff);

// Route to get staff by ID
router.get("/:id", staffController.getStaffById);

// Route to update staff by ID
router.put("/:id", staffController.updateStaff);

// Route to delete staff by ID
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
