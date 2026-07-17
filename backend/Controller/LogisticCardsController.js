const DashboardStats = require("../Schemas/LogisticCards");

exports.getAllDashboardStats = async (req, res) => {
  try {
    const stats = await DashboardStats.find();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createDashboardStats = async (req, res) => {
  try {
    const {
      totalRequests,
      requestsChange,
      totalCost,
      pendingRequests,
      approvedRequests,
      approvalChange,
    } = req.body;
    const newStats = new DashboardStats({
      totalRequests,
      requestsChange,
      totalCost,
      pendingRequests,
      approvedRequests,
      approvalChange,
    });
    const savedStats = await newStats.save();
    res.status(201).json(savedStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateDashboardStats = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedStats = await DashboardStats.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(updatedStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteDashboardStats = async (req, res) => {
  try {
    const { id } = req.params;
    await DashboardStats.findByIdAndDelete(id);
    res.json({ message: "Dashboard stats deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
