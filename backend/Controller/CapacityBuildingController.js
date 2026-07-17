const CapacityBuilding = require("../Schemas/CapacityBuilding");

exports.getAllCapacityBuilding = async (req, res) => {
  try {
    const capacityBuilding = await CapacityBuilding.find();
    res.json(capacityBuilding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCapacityBuildingById = async (req, res) => {
  try {
    const capacityBuilding = await CapacityBuilding.findById(req.params.id);
    if (!capacityBuilding) {
      return res.status(404).json({ error: "Capacity Building not found" });
    }
    res.json(capacityBuilding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createCapacityBuilding = async (req, res) => {
  try {
    const newCapacityBuilding = new CapacityBuilding(req.body);
    const savedCapacityBuilding = await newCapacityBuilding.save();
    res.status(201).json(savedCapacityBuilding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCapacityBuilding = async (req, res) => {
  try {
    const updatedCapacityBuilding = await CapacityBuilding.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedCapacityBuilding);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteCapacityBuilding = async (req, res) => {
  try {
    await CapacityBuilding.findByIdAndDelete(req.params.id);
    res.json({ message: "Capacity Building deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
