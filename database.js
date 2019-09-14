// Import Mongoose
let mongoose = require('mongoose');

//let url = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0-yjmsr.mongodb.net/ProjectManager";
let url = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0-yjmsr.mongodb.net/ProjectManager?retryWrites=true&w=majority";

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(url, { useNewUrlParser: true })
        .then (() => {
            console.log('Database connection successful')
        })
        .catch(err => {
            console.error('Database connection error')
        });        
    }
}

module.exports = new Database();