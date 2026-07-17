const mongoose = require('mongoose');


let ManagerSchemas = mongoose.Schema({
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
        required: false
    },
    password: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    dateofbirth: {
        type: String,
        required: false
    },

    gender: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },
 
    no_of_leaves: {
        type: Number,
        required: false
    },
    designation: {
        type: String,
        required: false
    },
    leaves: [
        {
            leave_type: String,
            startdate: String,
            enddate: String,
            reason: String,
            status: String,
        }
    ],
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' },
    tasks: [],
    deactivate: {
        type: Boolean,
        required: false
    },
    projects: [
        {
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            deadline: String,
            createdAt: String,
            coc_pdf: String,
            team: [
                {
                    name: String,
                    employer_id: String,
                    progress: [
                        {
                            date: String,
                            progress: String
                        }
                    ],
                    tasks: []
                }
            ],
            progress: [
                {
                    date: String,
                    progress: String
                }
            ],
        }
    ],
   

    reporting_manager: {
        type: String,
        required: false
    },
    department: {
        type: String,
        required: false
    },
    createdAt: {
        type: String,
        required: false
    },

    username: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false

    },
    mobile: [
        {
            mob1: {
                type: String,
                required: false,
            },
            mob2: {
                type: String,
                required: false,
            },
        },
    ],

});

module.exports = ManagerSchemas = mongoose.model('manager', ManagerSchemas);