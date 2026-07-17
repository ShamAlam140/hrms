const MemoTitle = require("../Schemas/Memo");

// Create Memo Title
exports.createMemoTitle = async (req, res) => {
  try {

    
    const memoTitle = new MemoTitle(req.body);
    const savedMemoTitle = await memoTitle.save();
    res.status(201).json(savedMemoTitle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all Memo Titles
exports.getAllMemoTitles = async (req, res) => {
  try {
    const memoTitles = await MemoTitle.find();
    res.json(memoTitles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Memo Title by ID
exports.getMemoTitleById = async (req, res) => {
  try {
    const memoTitle = await MemoTitle.findById(req.params.id);
    if (!memoTitle) {
      return res.status(404).json({ error: "Memo Title not found" });
    }
    res.json(memoTitle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Memo Title
exports.updateMemoTitle = async (req, res) => {
  try {
    const updatedMemoTitle = await MemoTitle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMemoTitle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Memo Title
exports.deleteMemoTitle = async (req, res) => {
  try {
    await MemoTitle.findByIdAndDelete(req.params.id);
    res.json({ message: "Memo Title deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
