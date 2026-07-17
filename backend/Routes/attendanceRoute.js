const express = require("express");
const router = express.Router();
const attendanceController= require('../Controller/attendanceController')
router.post('/mark-attendance',attendanceController.MarkAttendance )
router.get('/employee-attendance/:employeeId',attendanceController.getAttendanceByEmployeeId )
router.get('/attendance-monthwise/:employeeId', attendanceController.MonthwiseAttendance)
router.get('/getAllAttendance', attendanceController.getAllattendance)
module.exports = router;
