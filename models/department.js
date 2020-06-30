// Require Mongoose
const mongoose = require('mongoose')
const EmployeeSchema = require('./employee')

// excercises should be an array of excercise schemas

const DepartmentSchema = new mongoose.Schema({
    departmentName: String,
    employees: [EmployeeSchema]
})

const Department = mongoose.model('Department', DepartmentSchema)

module.exports = Department
