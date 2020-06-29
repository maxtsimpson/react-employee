// Require Mongoose
const mongoose = require('mongoose');
const EmployeeSchema = require('./employee')

// Define a schema
const Schema = mongoose.Schema

// excercises should be an array of excercise schemas

const DepartmentSchema = new Schema({
    departmentName: String,
    employees: [EmployeeSchema]
})

const Department = mongoose.model('Department', DepartmentSchema)

module.exports = Department
