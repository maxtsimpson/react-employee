//Require Mongoose
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    firstName: String,
    lastName: String,
    role: String,
})

module.exports = EmployeeSchema
