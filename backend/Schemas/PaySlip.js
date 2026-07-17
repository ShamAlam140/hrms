const mongoose = require("mongoose");

const paySlipSchema = new mongoose.Schema({
  payslipNo: {
    type: String,
    unique: true,
    required: true
  },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' },
  month: { type: Number, required: true }, 
  year: { type: Number, required: true },
  staffName: { type: String, required: true },
  title: { type: String, required: true },
  level: { type: String, required: true },
  grossSalary:{type: String, required:false},
  salaryStructure: {
    basicSalary: { type: Number, required: true },
    houseAllowance: { type: Number, required: true },
    transportAllowance: { type: Number, required: true },
    utilityAllowance: { type: Number, required: true },
    productivityAllowance: { type: Number, required: true },
    communicationAllowance: { type: Number, required: true },
    inconvenienceAllowance: { type: Number, required: true },
  },
  deductions: {
    tax: { type: Number, required: true },
    employeePension: { type: Number, required: true },
    totalDeduction: { type: Number, required: true },
  },
  netSalary: { type: Number, required: true },
},{timestamps:true});



const PaySlip = mongoose.model("PaySlip", paySlipSchema);

module.exports = PaySlip;
