const faker = require('faker')
const db = require('../models')

const departments = []
const connection = require('../config/mongo')

async function seed (numberOfDepartments, numberOfEmployees) {
  return new Promise((resolve, reject) => {
    console.log('running seed')
    for (let index = 0; index < numberOfDepartments; index++) {
      const department = { departmentName: faker.commerce.department() }
      departments.push(department)
      const employees = []

      for (let index = 0; index < numberOfEmployees; index++) {
        const employee = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          role: faker.name.jobTitle()
        }
        employees.push(employee)
      }
    }

    db.Department.deleteMany({})
      .then(() => db.Department.insertMany(departments))
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })

  // db.Department.create({ departmentName: faker.commerce.department() })
  //   .then((results) => {
  //     console.log(results)
  //   })
  //   .catch(error => {
  //     console.log('there was an error')
  //     console.log(error)
  //   })
}

// const employees = []

// for (let index = 0; index < numberOfEmployees; index++) {

//   const randomName = faker.name.findName() // Rowan Nikolaus
//   const randomEmail = faker.internet.email() // Kassandra.Haley@erich.biz
//   const randomDepartment = faker.commerce.department()
// }

// export default populate

connection.then(() => {
  db.Department.deleteMany({})
    .then(async () => {
      await seed(1, 5)
    })
    .then(data => {
      console.table(data)
      process.exit(0)
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
})
  .catch(error => console.log(error))
