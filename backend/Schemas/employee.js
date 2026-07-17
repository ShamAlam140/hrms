const mongoose = require('mongoose');


let EmployeeSchemas = mongoose.Schema({
    empId: {
        type: String,
        required: false,
        unique: true,
    },
    photo: {
        type: String,
        required: false
    },
    approved: {
        type: Boolean,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: false
    },

    gender: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: false,
    },

    officialEmail: {
        type: String,
        required: false
    },

    createdAt: {
        type: String,
        required: false
    },

    designation: {
        type: String,
        required: false
    },

    doj: {
        type: Date,
        default: Date.now

    },
    otp: {
        type: String,
        required: false
    },

    resetToken: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },

    documents: { type: mongoose.Schema.Types.ObjectId, ref: 'Documents' },
    payslip: { type: mongoose.Schema.Types.ObjectId, ref: 'PaySlip' },
    leaves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leave'
    }],
    department:{type: mongoose.Schema.Types.ObjectId, ref: 'Departments'},
    
    reporting_manager: {
        type: mongoose.Schema.Types.ObjectId, ref: 'employees'
    },

    accountDetails: {
        bankName:{type : String, required: false} ,
        bankCode: {type : String, required: false},
        branchName: {type : String, required: false},
        accountNumber: {type : Number, required: false}
    },

    // project:{type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    leaveQuota: {
        annualLeaves: {
            type: Number,
            default: 15
        },
        casualLeaves: {
            type: Number,
            default: 12 
        },
        sickLeaves: {
            type: Number,
            default: 12
        },
        UnPaidLeaves: {
            type: Number,
            default: 365
        },
       
    }
});


EmployeeSchemas.pre('save', async function (next) {
    if (!this.empId) {
        try {
            const maxEmpId = await this.constructor.findOne({}, { empId: 1 }, { sort: { empId: -1 } });
            const lastEmpId = maxEmpId ? maxEmpId.empId : 'susa999'; // Default value if no document exists
            const newCounter = parseInt(lastEmpId.replace('susa', ''), 10) + 1;
            this.empId = `susa${newCounter}`;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});


module.exports = EmployeeSchemas = mongoose.model('employees', EmployeeSchemas);