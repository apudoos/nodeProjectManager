// Import express
let express = require('express');
var cors = require('cors');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

app.use(cors());
//Add these for the post to work correctly
app.use(bodyParser.json());

let db = require('./database');

let userModel = require('./Users');

let projectModel = require('./Projects');

let taskModel = require('./Tasks');

let parentTaskModel = require('./ParentTasks');

// Setup server port
let port = process.env.PORT || 8080;

// User table queries
app.get('/users', (req, res, next) => {
    userModel.find({}, { 'id':1, 'firstName':1, 'lastName':1, 'empId':1 }, {sort: {empId: -1}}, (error, users) => {
        if (error) return next(error);
        res.send(users);
    })
});

app.param('id', (req, res, next) => {
    userModel.findById(req.params.id, (error, account) => {
        req.userModel = userModel;
        next();
    })
});

app.get('/users/:id', (req, res, next) => {
    console.log("Inside get by id");
    /* userModel.findById(req.params.id, (error, users) => {
        if (error) return next(error);
        res.send(users.toJSON());
    }) */
    userModel.find({empId:req.params.id}, (error, users) => {
        if (error) return next(error);
        res.send(users);
    })

});

app.post('/users', (req, res, next) => {
    let newUser = new userModel(req.body);
    newUser.save((error, results) => {
        if (error) return next(error);
        res.send(results);
    })
}) 

app.put('/users/:id', (req, res, next) => {
    userModel.findById(req.params.id, (error, users) => {
        if (error) return next(error);
        if (req.body.firstName) users.firstName = req.body.firstName;
        if (req.body.lastName) users.lastName = req.body.lastName;
        if (req.body.empId) users.empId = req.body.empId;
        users.save((error, results) => {
            if (error) return next(error);
            res.send(results);
        });
    });
});

app.delete('/users/:id', (req, res, next) => {
    console.log("Inside Delete");
    userModel.findById(req.params.id, (error, users) => {
        if (error) return next(error);
        users.remove((error, results) => {
            if (error) return next(error);
            res.send(results);
        });
    });
});

//Project Table queries
app.get('/projects', (req, res, next) => {
    console.log("inside project get");
    projectModel.find({}, { 'id':1, 'projectName':1, 'startDate':1, 'endDate':1, 'priority':1, 'managerId':1 }, 
    (error, project) => {
        if (error) return next(error);
        res.send(project);
    })
});

app.get('/projects/:id', (req, res, next) => {
    console.log("Inside get by id");
    /* userModel.findById(req.params.id, (error, users) => {
        if (error) return next(error);
        res.send(users.toJSON());
    }) */
    /* userModel.find({empId:req.params.id}, (error, users) => {
        if (error) return next(error);
        res.send(users);
    }) */

});

app.post('/projects', (req, res, next) => {
    let newProject = new projectModel(req.body);
    newProject.save((error, results) => {
        if (error) return next(error);
        res.send(results);
    })
}) 

app.put('/projects/:id', (req, res, next) => {
    projectModel.findById(req.params.id, (error, project) => {
        if (error) return next(error);
        if (req.body.projectName) project.projectName = req.body.projectName;
        if (req.body.startDate) project.startDate = req.body.startDate;
        if (req.body.endDate) project.endDate = req.body.endDate;
        if (req.body.priority) project.priority = req.body.priority;
        project.save((error, results) => {
            if (error) return next(error);
            res.send(results);
        });
    });
});

app.delete('/projects/:id', (req, res, next) => {
    console.log("Inside Project Delete");
    projectModel.findById(req.params.id, (error, project) => {
        if (error) return next(error);
        project.remove((error, results) => {
            if (error) return next(error);
            res.send(results);
        });
    });
});

//Task https requests

app.get('/tasks', (req, res, next) => {
    taskModel.find({}, { 'id':1, 'projectId':1, 'taskName':1, 'priority':1, 'priority':1, 'parentTaskId':1, 'startDate':1, 'endDate':1 }, (error, users) => {
        if (error) return next(error);
        res.send(users);
    })
});

app.post('/tasks', (req, res, next) => {
    let newTask = new taskModel(req.body);
    newTask.save((error, results) => {
        if (error) return next(error);
        res.send(results);
    })
});

//Parent Task http request.
app.get('/parenttasks', (req, res, next) => {
    console.log('inside parenttasks');
    parentTaskModel.find({}, { 'id':1, 'parentTaskName':1}, (error, parentTask) => {
        if (error) return next(error);
        res.send(parentTask);
    })
});

app.post('/parenttasks', (req, res, next) => {
    console.log('inside parenttasks');
    let newParentTask = new parentTaskModel(req.body);
    newParentTask.save((error, results) => {
        if (error) return next(error);
        res.send(results);
    })
});

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

 /* let storeProject = new projectModel({ projectName: 'Second Project', startDate: '2019-09-10T04:00:00.000+00:00', endDate: '2019-11-10T05:00:00.000+00:00', priority:1});
 storeProject.save((err, results) => {
    if (err) {
        console.error(err)
        process.exit(1)
    } else {
        console.log('Saved: ', results)
        process.exit(0)
    }
});
 */

/* let storeTask = new taskModel({ projectId: mongoose.mongo.ObjectId('5d783385a581cc146099e86b'), taskName:'Fourth Task', priority: 2, parentTaskId: mongoose.mongo.ObjectID('5d7f96dae70a8a00002e91bf'), startDate: '2019-09-10T04:00:00.000+00:00', endDate: '2019-11-10T05:00:00.000+00:00'});
storeTask.save((err, results) => {
   if (err) {
       console.error(err)
       process.exit(1)
   } else {
       console.log('Saved: ', results)
       process.exit(0)
   }
}); */
/* let storeParentTask = new parentTaskModel({ parentTaskName:'First Parent Task'});
storeParentTask.save((err, results) => {
   if (err) {
       console.error(err)
       process.exit(1)
   } else {
       console.log('Saved: ', results)
       process.exit(0)
   }
});  */