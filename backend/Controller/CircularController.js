const Circular = require("../Schemas/Circular");

exports.createCircular = async (req, res) => {
  try {
    const circular = await Circular.create(req.body);
    res.status(201).json(circular);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllCirculars = async (req, res) => {
  try {
    const circulars = await Circular.find();
    res.json(circulars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCircularById = async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id);
    if (!circular) {
      return res.status(404).json({ error: "Circular not found" });
    }
    res.json(circular);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCircular = async (req, res) => {
  try {
    const updatedCircular = await Circular.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCircular);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCircular = async (req, res) => {
  try {
    await Circular.findByIdAndDelete(req.params.id);
    res.json({ message: "Circular deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
