const TaxDefinition = require("../Schemas/TaxDefinition");

exports.getAllTaxDefinitions = async (req, res) => {
  try {
    const taxDefinitions = await TaxDefinition.find();
    res.json(taxDefinitions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createTaxDefinition = async (req, res) => {
  try {
    const { taxType, percentValue } = req.body;
    const newTaxDefinition = new TaxDefinition({ taxType, percentValue });
    const savedTaxDefinition = await newTaxDefinition.save();
    res.status(201).json(savedTaxDefinition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTaxDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedTaxDefinition = await TaxDefinition.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedTaxDefinition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteTaxDefinition = async (req, res) => {
  try {
    const { id } = req.params;
    await TaxDefinition.findByIdAndDelete(id);
    res.json({ message: "Tax definition deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
