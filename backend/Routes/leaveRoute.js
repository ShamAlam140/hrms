

const express = require('express');
const router = express.Router();
const leaveController = require('../Controller/leaveController');

router.post('/apply', leaveController.applyLeave);
router.get('/allLeaves', leaveController.allLeaves);
router.get('/empleave/:employeeId', leaveController.Empleave);
router.put('/approve', leaveController.approveLeave);
router.put('/reject', leaveController.rejectLeave);
router.get('/leavesUnderManager/:managerId', leaveController.getLeaveRequeststoManager);
router.get('/unpaid-leaves/:employeeId', leaveController.getMonthwiseUnpaidLeaves);

module.exports = router;
