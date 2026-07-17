const express = require("express");
const router = express.Router();
const circularController = require("../Controller/CircularController");

router.post("/create-circular", circularController.createCircular);
router.get("/getCircular", circularController.getAllCirculars);
router.get("/:id", circularController.getCircularById);
router.put("/:id", circularController.updateCircular);
router.delete("/:id", circularController.deleteCircular);

module.exports = router;
