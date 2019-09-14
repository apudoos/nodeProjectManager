let mongoose = require('mongoose');

Schema = mongoose.Schema;

let projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    managerId: {
        type: Number,
        required: true    
    }/* ,

    projectId: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: false
    }],
    taskId: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task',
        required: false
    }] */
});

module.exports = mongoose.model('Projects', projectSchema);