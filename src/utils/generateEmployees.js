import { uuid } from 'uuidv4';
const faker = require('faker')


export function generateEmployees(numberOfEmployees = 20) {
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
    return employeeList
}

// export default generateEmployees