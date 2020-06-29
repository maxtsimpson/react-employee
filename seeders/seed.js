const faker = require('faker')
const db = require('../models')
const mongoose = require('mongoose')

const departments = []
const connection = require('../config/mongo')

function seed (numberOfDepartments, numberOfEmployees) {

  for (let index = 0; index < numberOfDepartments; index++) {
    const department = new db.Department({
      departmentName: faker.commerce.department()
    })

    department.save()
      .then((results) => { console.log(results) })
      .catch(error => console.error(error))

    departments.push(department)
  }

  const employees = []

  for (let index = 0; index < numberOfEmployees; index++) {

    const randomName = faker.name.findName() // Rowan Nikolaus
    const randomEmail = faker.internet.email() // Kassandra.Haley@erich.biz
    const randomDepartment = faker.commerce.department()
  }
}

// export default populate

connection.then(() => {
  db.Department.deleteMany({})
    .then(() => {
      seed(1, 5)
    })
    .then(data => {
      console.table(data)
      process.exit(0)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
})
