import React, { createContext, useReducer, useContext } from "react";
import { uuid } from 'uuidv4';
const faker = require('faker')

function generateEmployees(numberOfEmployees = 20) {
    const employeeList = []
    for (let index = 0; index < numberOfEmployees; index++) {
        const employee = {
            id: uuid(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            role: faker.name.jobTitle()
        }
        employeeList.push(employee)
        console.log("creating an employee")
    }
    return employeeList
}

const initialEmployeeList = generateEmployees()

const EmployeeContext = createContext();
const { Provider } = EmployeeContext;

function reducer(employeeList, action) {
  switch (action.type) {
  case "add":
    return [
      ...employeeList,
      {
        id: employeeList.length * Math.random(),
        name: action.name
      }
    ];
  case "remove":
    return employeeList.filter((_, index) => {
      return index !== action.index;
    });
  case "prioritize":
    return employeeList.map((item, index) => {
      if (index === action.index) {
        return Object.assign({}, item, {
          priority: !item.priority
        });
      }
      return item;
    });
  default:
    return employeeList;
  }
}

function EmployeeProvider({ value = initialEmployeeList, ...props }) {
  const [employeeList, dispatch] = useReducer(reducer, []);

  return <Provider value={[employeeList, dispatch]} {...props} />;
}

function useEmployeeContext() {
  return useContext(EmployeeContext);
}

export { EmployeeProvider, useEmployeeContext };
