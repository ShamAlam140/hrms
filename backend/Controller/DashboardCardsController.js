const DashboardCards = require("../Schemas/DashboardCards");

exports.createDashboardCard = async (req, res) => {
  try {
    const {
      totalStaff,
      staffChange,
      totalApplications,
      applicationChange,
      totalProjects,
      projectChange,
      totalDepartments,
    } = req.body;

    // Ensure all required fields are present in the request body
    if (
      !totalStaff ||
      !staffChange ||
      !totalApplications ||
      !applicationChange ||
      !totalProjects ||
      !projectChange ||
      !totalDepartments
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newCard = new DashboardCards({
      totalStaff,
      staffChange,
      totalApplications,
      applicationChange,
      totalProjects,
      projectChange,
      totalDepartments,
    });
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateDashboardCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Ensure all required fields are present in the request body
    if (
      !updateData.totalStaff ||
      !updateData.staffChange ||
      !updateData.totalApplications ||
      !updateData.applicationChange ||
      !updateData.totalProjects ||
      !updateData.projectChange ||
      !updateData.totalDepartments
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const updatedCard = await DashboardCards.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensure validators are run during update
    });
    res.json(updatedCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllDashboardCards = async (req, res) => {
  try {
    const cards = await DashboardCards.find();
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDashboardCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await DashboardCards.findById(id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.deleteDashboardCard = async (req, res) => {
  try {
    const { id } = req.params;
    await DashboardCards.findByIdAndDelete(id);
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
