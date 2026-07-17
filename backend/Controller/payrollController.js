const Payroll = require("../Schemas/Payroll");

// Get all payrolls
exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    res.json(payrolls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single payroll by ID
exports.getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);
    if (!payroll) {
      return res.status(404).json({ error: "Payroll not found" });
    }
    res.json(payroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new payroll
exports.createPayroll = async (req, res) => {
  try {
    const newPayroll = new Payroll(req.body);
    const savedPayroll = await newPayroll.save();
    res.status(201).json(savedPayroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing payroll
exports.updatePayroll = async (req, res) => {
  try {
    const updatedPayroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedPayroll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a payroll by ID
exports.deletePayroll = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ message: "Payroll deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
