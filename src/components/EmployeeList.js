import React, { useReducer, useState } from "react";
import { Table } from 'react-materialize'
import _ from 'lodash';
import SearchBox from "./SearchBox";

let currentSortProp = "";
let sortAsc = true

function EmployeeList({ employees }) {

    // const [employeeList, setEmployeeList] = useState();

    //need to make a function that sets the employeeState to an incoming array
    //then edit all the functions so they just call this with the array they want to replace it with
    //check the activities. im sure we've just done this

    // const [filter, setFilter] = useState();

    //put in a currentEmployeelist
    // a clear search function -- that sets currentEmployeeList back to the original employee list
    // a clear filter function
    //also set it so that it doesnt generate a new employee list every time

    const initialEmployeeState = employees.map((employee) => { return { ...employee, show: true } })

    console.log({initialEmployeeState})

    const searchEmployees = (state, searchTerm) => {
        console.log("in searchEmployees")
        return state.map((employee) => {
            Object.keys(employees[0]).forEach(prop => {
                if (employee[prop].toString().startsWith(searchTerm)) {
                    return { ...employee, show: true }
                } else {
                    return { ...employee, show: false }
                }
            })
            return employee
        })
    };

    const filterEmployees = (state, filter) => {
        //if the filter value matches this employees value dont show it
        //use a starts with but make sure they are both converted to lowercase
        if (filter.filterText === "") {
            return state.map(employee => employee);
        }

        if ((filter.filterText) && (filter.filterText !== "")) {
            return state.map(employee => {
                const currentValue = employee[filter.filterProp].toString().toLowerCase()
                console.log(currentValue)
                if (currentValue.startsWith(filter.filterText.toLowerCase())) {
                    return { ...employee, show: true }
                } else {
                    return { ...employee, show: false }
                }
            })
        } else {
            return state.map(employee => employee);
        }
    }

    const sortEmployees = (state, property) => {
        let sortOrder
        if (currentSortProp === property) {
            sortAsc = !sortAsc
        }
        sortAsc ? sortOrder = 'asc' : sortOrder = 'desc'
        currentSortProp = property

        return _.orderBy(state.map(x => x), property, sortOrder); // Use Lodash to sort array by 'name'   
    }

    const [employeeList, dispatch] = useReducer((state, action) => {
        //by default sort ascending unless they have already clicked to sort
        //in which case sort desc
        console.log("in useReducer")
        let returnValue
        switch (action.type) {
            case 'sort':
                returnValue = sortEmployees(state, action.value)
                break;
            case 'filter':
                returnValue = filterEmployees(state, action.value)
                break;
            case 'search':
                returnValue = searchEmployees(state, action.value)
                break;
            default:
                returnValue = state
                break;
        }
        console.log({returnValue})
        return returnValue
    }, initialEmployeeState);
    //employees.map((employee) => {return {...employee, show: true}})

    return (
        <div>
            <form>
                <div className="inline">
                    <input type="text" placeholder="Enter something to search.."></input>
                    <button className="btn" onClick={(event) => { dispatch({ type: "firstName", value: event.target.value })}}>Search</button>
                </div>
            </form>
            <Table striped={true}>
                <thead>
                    <tr>
                        <th><span onClick={() => dispatch({ type: 'sort', value: 'firstName' })}>FirstName</span>
                            <input type="text" onKeyUp={(event) => { dispatch({ type: 'filter', value: { filterProp: "firstName",filterText: event.target.value} }) }} placeholder="filter by first name.."></input>
                        </th>
                        <th><span onClick={() => dispatch({ type: 'sort', value: 'lastName' })}>LastName</span>
                            <input type="text" onKeyUp={(event) => { dispatch({ type: 'filter', value: { filterProp: "lastName",filterText: event.target.value} }) }} placeholder="filter by last name.."></input>
                        </th>
                        <th><span onClick={() => dispatch({ type: 'sort', value: 'role' })}>Role</span>
                            <input type="text" onKeyUp={(event) => { dispatch({ type: 'filter', value: { filterProp: "role",filterText: event.target.value} }) }} placeholder="filter by role.."></input>
                        </th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList.map(function (employee, index) {
                        //if the filter value matches this employees value dont show it
                        if (employee.show) {
                            return (
                                <tr key={employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.role}</td>
                                    <td>
                                        <img alt='employee' src={employee.picture}></img>
                                    </td>
                                </tr>
                            );
                        } else {
                            return null
                        }
                    })}
                </tbody>
            </Table>
        </div>
    )

}

export default EmployeeList;