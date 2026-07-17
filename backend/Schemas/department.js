const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name:{type: String, required: true},
    employees:[ { type: mongoose.Schema.Types.ObjectId, ref: 'employees' }],
   
});

const Departments = mongoose.model('Departments', departmentSchema);

module.exports = Departments;
