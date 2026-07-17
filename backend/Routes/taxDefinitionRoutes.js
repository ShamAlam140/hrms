const express = require("express");
const router = express.Router();
const TaxDefinitionController = require("../Controller/TaxDefinitionController");

router.get("/get", TaxDefinitionController.getAllTaxDefinitions);
router.post("/create", TaxDefinitionController.createTaxDefinition);
router.put("/:id", TaxDefinitionController.updateTaxDefinition);
router.delete("/:id", TaxDefinitionController.deleteTaxDefinition);

module.exports = router;
