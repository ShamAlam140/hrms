const SalaryBreakdown = require("../Schemas/SalaryBreakdown");

// Create a new salary breakdown
exports.createSalaryBreakdown = async (req, res) => {
  try {


    const salaryBreakdown = new SalaryBreakdown(req.body);
    await salaryBreakdown.save();
    res.status(201).json(salaryBreakdown);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all salary breakdowns
exports.getAllSalaryBreakdowns = async (req, res) => {
  try {
    const salaryBreakdowns = await SalaryBreakdown.find();
    res.json(salaryBreakdowns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get salary breakdown by ID
exports.getSalaryBreakdownById = async (req, res) => {
  try {
    const salaryBreakdown = await SalaryBreakdown.findById(req.params.id);
    if (!salaryBreakdown) {
      return res.status(404).json({ error: "Salary breakdown not found" });
    }
    res.json(salaryBreakdown);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update salary breakdown
exports.updateSalaryBreakdown = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSalaryBreakdown = await SalaryBreakdown.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updatedSalaryBreakdown);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete salary breakdown
exports.deleteSalaryBreakdown = async (req, res) => {
  try {
    const { id } = req.params;
    await SalaryBreakdown.findByIdAndDelete(id);
    res.json({ message: "Salary breakdown deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.dashboardInfo= async(req, res)=>{
  try {
    const { year, month } = req.params;

    // Calculate start and end date of the specified month
    const startDate = new Date(year, month - 1, 1); // First day of the month
    const endDate = new Date(year, month, 0); // Last day of the month

    // Fetch salary breakdown records for the specified month and year
    const salaryBreakdowns = await SalaryBreakdown.find({
        createdAt: { $gte: startDate, $lte: endDate }
    });

    // Calculate total gross salary, net salary, and tax deductions
    let totalGrossSalary = 0;
    let totalNetSalary = 0;
    let totalDeductions = 0;

    salaryBreakdowns.forEach(record => {
        totalGrossSalary += record.grossSalary;
        totalNetSalary += record.netSalary;
        totalDeductions += record.deductions;
    });

    res.json({
        totalGrossSalary,
        totalNetSalary,
        totalDeductions
    });
} catch (error) {
    console.error('Error fetching salary breakdown:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}


exports.searchbytitle = async(req, res)=>{
  try {
    const title = req.params.title;

    const data = await SalaryBreakdown.findOne({ title: { $regex: new RegExp(title, 'i') } });

    if (data.length === 0) {
        return res.status(404).json({ message: 'Data not found' });
    }

    // Return the data as JSON response 
    res.json({ data });
} catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}
