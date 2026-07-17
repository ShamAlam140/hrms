const express = require("express");
const router = express.Router();
const salaryBreakdownController = require("../Controller/SalaryBreakdownController");

router.post("/create", salaryBreakdownController.createSalaryBreakdown);
router.get("/getsalarybreakdown", salaryBreakdownController.getAllSalaryBreakdowns);
router.get('/searchbytitle/:title', salaryBreakdownController.searchbytitle)
// router.get("/:id", salaryBreakdownController.getSalaryBreakdownById);
// router.put("/:id", salaryBreakdownController.updateSalaryBreakdown);
router.delete("/:id", salaryBreakdownController.deleteSalaryBreakdown);
router.get('/salary-total/:year/:month', salaryBreakdownController.dashboardInfo)
module.exports = router;
