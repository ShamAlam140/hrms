const DashboardStaff = require("../Schemas/dashboardStaffSchema");

// Create a new staff member
exports.createStaff = async (req, res) => {
  try {
    const staff = await DashboardStaff.create(req.body);
    res.status(201).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await DashboardStaff.find();
    res.json(staffList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get staff member by ID
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await DashboardStaff.findById(id);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    res.json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update staff member by ID
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedStaff = await DashboardStaff.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    res.json(updatedStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete staff member by ID
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await DashboardStaff.findByIdAndDelete(id);
    res.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
