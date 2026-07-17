const express = require("express");
const router = express.Router();
const capacityBuildingController = require("../Controller/CapacityBuildingController");

router.get("/gettraining", capacityBuildingController.getAllCapacityBuilding);
router.get("/:id", capacityBuildingController.getCapacityBuildingById);
router.post("/create-training", capacityBuildingController.createCapacityBuilding);
router.put("/:id", capacityBuildingController.updateCapacityBuilding);
router.delete("/:id", capacityBuildingController.deleteCapacityBuilding);

module.exports = router;
