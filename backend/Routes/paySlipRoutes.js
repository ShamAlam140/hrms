const express = require("express");
const router = express.Router();
const PaySlipController = require("../Controller/PaySlipController");

router.get("/getAllPayslips", PaySlipController.getAllPaySlips);
router.post("/create-payslip", PaySlipController.createPaySlip);
router.get('/totals', PaySlipController.payrolldashboardsummary)
router.get('/pay-slip/:employeeId/:month/:year', PaySlipController.individualPayslip)
router.get('/employeePayslips/:employeeId', PaySlipController.EmployeePayslips)
router.put("/:id", PaySlipController.updatePaySlip);
router.delete("/:id", PaySlipController.deletePaySlip);

module.exports = router;
