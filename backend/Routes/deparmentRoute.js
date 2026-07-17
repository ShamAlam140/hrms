const express = require("express");
const router = express.Router();
const departmentController = require("../Controller/departmentController");

router.post("/create-department", departmentController.createDeparment);
router.post("/:departmentId/addEmployee", departmentController.enrollEmployee)
router.get("/:departmentId", departmentController.getSingleDeparment)
router.get("/all/departments", departmentController.AllDeparment)
router.delete("/delete/:id", departmentController.DeleteDepartment)
module.exports = router;