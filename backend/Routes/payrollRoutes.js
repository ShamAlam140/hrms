const express = require("express");
const router = express.Router();
const payrollController = require("../Controller/payrollController");

// Routes
router.get("/getAllPayroll", payrollController.getAllPayrolls);
router.get("/payrolls/:id", payrollController.getPayrollById);
router.post("/create-payroll", payrollController.createPayroll);
router.put("/payrolls/:id", payrollController.updatePayroll);
router.delete("/payrolls/:id", payrollController.deletePayroll);

module.exports = router;
