const express = require("express");
const router = express.Router();
const procurementRequestController = require("../Controller/procurementRequestController");

// CRUD operations
router.get("/getallProcurements", procurementRequestController.getAll);
router.post("/create", procurementRequestController.create);
router.get("/procurement-summary", procurementRequestController.Summary)
// router.get("/:id", procurementRequestController.getById);
router.put("/approve/:id", procurementRequestController.approveRequest);
router.put("/reject/:id", procurementRequestController.rejectRequest);
// router.delete("/:id", procurementRequestController.delete);

module.exports = router;
