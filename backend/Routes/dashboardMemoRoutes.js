const express = require("express");
const router = express.Router();
const dashboardMemoController = require("../Controller/dashboardMemoController");

// Route to create a new memo
router.post("/", dashboardMemoController.createMemo);

// Route to get all memos
router.get("/", dashboardMemoController.getAllMemos);

// Route to get a specific memo by ID
router.get("/:id", dashboardMemoController.getMemoById);

// Route to update a specific memo by ID
router.put("/:id", dashboardMemoController.updateMemo);

// Route to delete a specific memo by ID
router.delete("/:id", dashboardMemoController.deleteMemo);

module.exports = router;
