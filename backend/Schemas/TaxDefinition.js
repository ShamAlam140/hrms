const mongoose = require("mongoose");

const taxDefinitionSchema = new mongoose.Schema({
  taxType: {
    type: String,
    required: true,
  },
  percentValue: {
    type: Number,
    required: true,
  },
});

const TaxDefinition = mongoose.model("TaxDefinition", taxDefinitionSchema);

module.exports = TaxDefinition;
