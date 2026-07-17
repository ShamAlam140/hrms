const mongoose = require("mongoose");

const salaryBreakdownSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  // basicSalary: {
  //   type: Number,
  //   required: true,
  // },
  allowance: {
    type: Number,
    required: false,
  },
  salaryStructure: {
    basicSalary: { type: Number, required: true },
    houseAllowance: { type: Number, required: true },
    transportAllowance: { type: Number, required: true },
    utilityAllowance: { type: Number, required: true },
    productivityAllowance: { type: Number, required: true },
    communicationAllowance: { type: Number, required: true },
    inconvenienceAllowance: { type: Number, required: true },
  },
  grossSalary: {
    type: Number,
    required: true,
  },
  deductions: {
    type: Number,
    required: true,
  },
  // deductions: {
  //   tax: { type: Number, required: true },
  //   employeePension: { type: Number, required: true },
  //   totalDeduction: { type: Number, required: true },
  // },
  netSalary: {
    type: Number,
    required: true,
  },
},
{timestamps:true});

module.exports = mongoose.model("SalaryBreakdown", salaryBreakdownSchema);
