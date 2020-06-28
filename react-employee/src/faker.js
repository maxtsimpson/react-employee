var faker = require('faker');

let departments = []

for (let index = 0; index < numberOfDepartments; index++) {
    const randomDepartment = faker.commerce.department()
}

let employees = []

for (let index = 0; index < numberOfEmployees; index++) {
    const randomName = faker.name.findName(); // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    const randomDepartment = faker.commerce.department()
}

// var randomName = faker.name.findName(); // Rowan Nikolaus
// var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// var randomCard = faker.helpers.createCard(); // random contact 