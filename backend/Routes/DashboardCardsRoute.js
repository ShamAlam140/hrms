const express = require("express");
const router = express.Router();
const dashboardController = require("../Controller/DashboardCardsController");

// Route to create a new dashboard card
router.post("/dashboard-cards", dashboardController.createDashboardCard);

// Route to get all dashboard cards
router.get("/dashboard-cards", dashboardController.getAllDashboardCards);

// Route to get a specific dashboard card by ID
router.get("/dashboard-cards/:id", dashboardController.getDashboardCardById);

// Route to update a specific dashboard card by ID
router.put("/dashboard-cards/:id", dashboardController.updateDashboardCard);

// Route to delete a specific dashboard card by ID
router.delete("/dashboard-cards/:id", dashboardController.deleteDashboardCard);

module.exports = router;
