let mongoose = require('mongoose');

Schema = mongoose.Schema;

let tasksSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    parentTaskId: {
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
    }
});

module.exports = mongoose.model('Tasks', tasksSchema);