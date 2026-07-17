
const DashboardMemo = require("../Schemas/dashboardmemo");

// Create a new memo
exports.createMemo = async (req, res) => {
  try {
    const { serialNumber, memoTitle, sentFrom, sentTo, status } = req.body;
    const newMemo = new DashboardMemo({
      serialNumber,
      memoTitle,
      sentFrom,
      sentTo,
      status,
    });
    const savedMemo = await newMemo.save();
    res.status(201).json(savedMemo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all memos
exports.getAllMemos = async (req, res) => {
  try {
    const memos = await DashboardMemo.find();
    res.json(memos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a memo by ID
exports.getMemoById = async (req, res) => {
  try {
    const { id } = req.params;
    const memo = await DashboardMemo.findById(id);
    if (!memo) {
      return res.status(404).json({ error: "Memo not found" });
    }
    res.json(memo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a memo
exports.updateMemo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedMemo = await DashboardMemo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedMemo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a memo
exports.deleteMemo = async (req, res) => {
  try {
    const { id } = req.params;
    await DashboardMemo.findByIdAndDelete(id);
    res.json({ message: "Memo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
