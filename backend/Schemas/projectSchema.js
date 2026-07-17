const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    projectStatus: {
        type:String,
        default :'Pending'
    },
    tickets: {
        type: [{
            ticketId: Number,
            title: String,
            status: String
        }],
        required: false
    },
    // teamAssign: {
    //     type: Object,
    //     required: false
    // },
    teamAssign: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'employees' // Changed to array of ObjectIds
        
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId, // Assuming manager is referenced by their ID
        ref: 'employees',
        required: true
    }
},{
    timestamps: true,
}); 

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
