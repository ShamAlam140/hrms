const express = require("express");
const router = express.Router();
const LogisticController = require("../Controller/LogisticController");

router.get("/getAllLogistics", LogisticController.getAllLogistic);
router.post("/create", LogisticController.createLogistic);
router.put("/approve/:id", LogisticController.approveLogistic);
router.put("/reject/:id", LogisticController.rejectLogistic);
router.delete("/:id", LogisticController.deleteLogistic);
router.get('/logistics-summary',LogisticController.logisticSummary)
module.exports = router;
