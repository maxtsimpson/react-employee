const faker = require('faker')
const db = require('../models')

const departments = []
const connection = require('../config/mongo')

async function seed (numberOfDepartments, numberOfEmployees) {
  return new Promise((resolve, reject) => {
    for (let index = 0; index < numberOfDepartments; index++) {
      const department = {
        departmentName: faker.commerce.department(),
        employees: []
      }

      for (let index = 0; index < numberOfEmployees; index++) {
        const employee = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          role: faker.name.jobTitle()
        }
        department.employees.push(employee)
      }
      departments.push(department)
    }

    db.Department.deleteMany({})
      .then(() => {
        db.Department.insertMany(departments)
          .then(() => {
            resolve()
          })
      })
      .catch(err => {
        reject(err)
      })
  })
}

connection
  .then(async () => {
    await seed(3, 5)
  })
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
