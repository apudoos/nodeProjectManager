let mongoose = require('mongoose');

Schema = mongoose.Schema;

let parentTasksSchema = new mongoose.Schema({
    parentTaskName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ParentTasks', parentTasksSchema);