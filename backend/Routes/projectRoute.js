const express = require("express");
const router = express.Router();
const projectController= require('../Controller/projectController')
router.post('/create-project',projectController.createProject )
router.get('/get-projects', projectController.getProjects)
router.get('/getProject/:projectId', projectController.getProjectById)
router.get('/getManagerProject/:managerId', projectController.getProjectsByManager)
router.post('/ChangeProjetcStatus/:projectId', projectController.changeProjectStatus)
router.get('/getEmployeeProject/:employeeId', projectController.getProjectsOfEmployee)
router.post('/assign-employee', projectController.assignEmployeeToProjectTeam)


module.exports = router;