// routes/stockRoutes.js
const express = require("express");
const router = express.Router();
const stockController = require("../Controller/stockController");
const upload = require("../middleware/multerMiddleware");

// CRUD routes
router.get("/getStocks", stockController.getAllStocks);
router.post("/add-stock", upload.single('image'),stockController.createStock);
// router.get("/:id", stockController.getStockById);
// router.put("/:id", stockController.updateStock);
// router.delete("/:id", stockController.deleteStock);
router.get("/stock-summary", stockController.stockSummary)
module.exports = router;
