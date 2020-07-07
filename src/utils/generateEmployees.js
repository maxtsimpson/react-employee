const { uuid } = require('uuidv4');
// const fs = require('fs').promises
const faker = require('faker')

const generateEmployees = (numberOfEmployees = 20) => {
    const employeeList = []
    for (let index = 0; index < numberOfEmployees; index++) {
        const employee = {
            id: uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            role: faker.name.jobTitle(),
            picture: faker.image.avatar()
        }
        employeeList.push(employee)
    }
    console.log("returning employeeList")
    console.log({employeeList})
    return employeeList
}

// const json = JSON.stringify(generateEmployees());

// const writeEmployees = async () => {
//     return await fs.writeFile('./src/utils/employees.json', json, 'utf8')
// }

// writeEmployees();

export default generateEmployees