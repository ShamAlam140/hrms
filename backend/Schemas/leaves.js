const mongoose = require('mongoose');

const LeaveSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    reason:{
        type:String,
        required:false

    },
    leaveType:{
        type: String,
        required: false
    },
    numberOfDays:{
  type:Number,
  required: false
    },

    reject_reason:{
        type:String,
        required: false
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now // Automatically populate createdAt field with current timestamp
    // }
   
},
{
    timestamps: true // Add timestamps
});

module.exports = mongoose.model('Leave', LeaveSchema);
