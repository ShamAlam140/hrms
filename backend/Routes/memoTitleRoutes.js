const express = require("express");
const router = express.Router();
const memoTitleController = require("../Controller/memoTitleController");

// Create Memo Title
router.post("/create-memo", memoTitleController.createMemoTitle);

// Get all Memo Titles
router.get("/getMemo", memoTitleController.getAllMemoTitles);

// Get Memo Title by ID
// router.get("/:id", memoTitleController.getMemoTitleById);

// Update Memo Title
// router.put("/:id", memoTitleController.updateMemoTitle);

// Delete Memo Title
router.delete("/:id", memoTitleController.deleteMemoTitle);

module.exports = router;
