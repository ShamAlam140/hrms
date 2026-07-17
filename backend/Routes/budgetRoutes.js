const express = require("express");
const router = express.Router();
const budgetController = require("../Controller/budgetController");

router.get("/getAllbudget", budgetController.getAllBudgets);
router.post("/create-budget", budgetController.createBudget);
router.put("/:id", budgetController.updateBudget);
router.delete("/:id", budgetController.deleteBudget);
router.get('/budget-summary',budgetController.budgetSummary)
module.exports = router;
