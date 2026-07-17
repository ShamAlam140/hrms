const mongoose = require('mongoose');

let EmpRequestSchemas= mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile:{
        type:String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    docs:[],

    aadhar_number: {
        type: String,
        required: false
    },
    pan_number: {
        type: String,
        required: false
    },
    department:{type: mongoose.Schema.Types.ObjectId, ref: 'Departments'},
    
    reporting_manager: {
        type: mongoose.Schema.Types.ObjectId, ref: 'employees'
    },
    designation: {
        type: String,
        required: false
    },
    accountDetails: {
        bankName:{type : String, required: false} ,
        bankCode: {type : String, required: false},
        branchName: {type : String, required: false},
        accountNumber: {type : Number, required: false}
    },

    // resume:
    // {
    //     type: String,
    //     required: false
    // },
    // offer_letter:
    // {
    //     type: String,
    //     required: false
    // },
    // experience: {
    //     type: String,
    //     required: false
    // },
    // education: {
    //     type: String,
    //     required: false
    // },

})



module.exports = EmpRequestSchemas = mongoose.model('RequestForm', EmpRequestSchemas);