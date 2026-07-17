const Staff = require("../Schemas/Staff");

// Create new staff
exports.createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    const savedStaff = await staff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update staff by ID
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedStaff = await Staff.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.json(updatedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete staff by ID
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
