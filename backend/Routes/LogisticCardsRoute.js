const express = require("express");
const router = express.Router();
const dashboardStatsController = require("../Controller/LogisticCardsController");

router.get("/", dashboardStatsController.getAllDashboardStats);
router.post("/", dashboardStatsController.createDashboardStats);
router.put("/:id", dashboardStatsController.updateDashboardStats);
router.delete("/:id", dashboardStatsController.deleteDashboardStats);

module.exports = router;
