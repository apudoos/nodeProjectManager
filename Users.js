let mongoose = require('mongoose');

Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    empId: {
        type: Number,
        required: true
    },
    projectId: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        required: false
    }],
    taskId: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task',
        required: false
    }]
});

module.exports = mongoose.model('Users', userSchema);