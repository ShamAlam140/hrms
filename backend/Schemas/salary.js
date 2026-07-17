const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  title: { type: String, required: true },
  level: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  allowance: { type: Number, required: true },
  grossSalary: { type: Number, required: true },
  deductions: { type: Number, required: true },
  netSalary: { type: Number, required: true },
    
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
