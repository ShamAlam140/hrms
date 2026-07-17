const PaySlip = require("../Schemas/PaySlip");
const { v4: uuidv4 } = require('uuid');
exports.getAllPaySlips = async (req, res) => {
  try {
    const paySlips = await PaySlip.find();
    paySlips.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    res.json(paySlips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPaySlip = async (req, res) => {
  try {
    const payslipNo = uuidv4();
    
    const paySlip = new PaySlip({ ...req.body, payslipNo });
    const savedPaySlip = await paySlip.save();
    res.status(201).json(savedPaySlip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePaySlip = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedPaySlip = await PaySlip.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    res.json(updatedPaySlip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePaySlip = async (req, res) => {
  try {
    const { id } = req.params;
    await PaySlip.findByIdAndDelete(id);
    res.json({ message: "Pay slip deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.payrolldashboardsummary=async(req, res)=>{
  try {
    let { month, year } = req.query;

    if (!month || !year || month === "null" || year === "null" || month === "undefined" || year === "undefined") {
      return res.json({
        totalGrossSalary: 0,
        totalNetSalary: 0,
        totalTax: 0
      });
    }

    month = parseInt(month, 10);
    year = parseInt(year, 10);

    if (isNaN(month) || isNaN(year)) {
      return res.json({
        totalGrossSalary: 0,
        totalNetSalary: 0,
        totalTax: 0
      });
    }

    // Find all pay slips for the given month and year
    const paySlips = await PaySlip.find({ month, year });

    let totalGrossSalary = 0;
    let totalNetSalary = 0;
    let totalTax = 0;

    for (const paySlip of paySlips) {
      totalGrossSalary += parseFloat(paySlip.grossSalary);
      totalNetSalary += parseFloat(paySlip.netSalary);
      totalTax += parseFloat(paySlip.deductions.tax);
    }

    res.json({
      totalGrossSalary,
      totalNetSalary,
      totalTax
    });
  } catch (error) {
    console.error('Error calculating totals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


exports.individualPayslip  =async(req,res)=>{
  try {
    const employeeId = req.params.employeeId;
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);

    // Query the database for the pay slip with the specified parameters
    const paySlip = await PaySlip.findOne({
        employee: employeeId,
        month: month,
        year: year
    }).populate('employee');

    if (!paySlip) {
        return res.status(404).json({ message: 'Pay slip not found' });
    }

    // Return the pay slip data as JSON response
    res.status(200).json({ paySlip: paySlip });
} catch (error) {
    console.error('Error fetching pay slip data:', error);
    res.status(500).json({ error: 'Internal server error' });
}
}

exports.EmployeePayslips= async(req, res)=>{
  try {
    const employeeId = req.params.employeeId;
    const paySlips = await PaySlip.find({ employee: employeeId }).exec();
    res.json(paySlips);
  } catch (error) {
    console.error('Error fetching pay slips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}