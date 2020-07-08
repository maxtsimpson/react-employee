import React, { useReducer, useRef, useEffect } from "react";
import { Table } from 'react-materialize'
import _ from 'lodash';

let currentSortProp = "";
let sortAsc = true

function EmployeeList({ employees }) {

    const searchInputEl = useRef(null);

    const searchEmployees = (state, searchTerm) => {
        searchTerm = searchTerm.toLowerCase()

        let newEmployees = state.map((employee) => {
            let newEmployee
            const props = Object.keys(employees[0])
            for (let index = 0; index < props.length; index++) {
                const prop = props[index];
                const propString = employee[prop].toString().toLowerCase()
                if (propString.startsWith(searchTerm)) {
                    newEmployee = { ...employee, show: true }
                    return newEmployee
                } else {
                    newEmployee = { ...employee, show: false }
                }
            }
            return newEmployee
        })
        return newEmployees
    };

    const filterEmployees = (state, filter) => {
        //if the filter value matches this employees value dont show it
        //use a starts with but make sure they are both converted to lowercase
        if (filter.filterText === "") {
            return initialEmployeeState.map(employee => employee)
        } else {
            return state.map(employee => {
                const currentValue = employee[filter.filterProp].toString().toLowerCase()
                if (currentValue.startsWith(filter.filterText.toLowerCase())) {
                    return { ...employee, show: true }
                } else {
                    return { ...employee, show: false }
                }
            })
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

    const clear = () => {
        searchInputEl.current.value = ""
        return initialEmployeeState.map(employee => employee)
    }

    const initialEmployeeState = employees.map((employee) => { return { ...employee, show: true } })

    const [employeeState, dispatch] = useReducer((state, action) => {
        //by default sort ascending unless they have already clicked to sort
        //in which case sort desc
        switch (action.type) {
            case 'sort':
                return sortEmployees(state, action.value)
            case 'filter':
                return filterEmployees(state, action.value)
            case 'search':
                return searchEmployees(state, action.value)
            case 'clear':
                return clear()
            default:
                return initialEmployeeState.map(employee => employee)
        }
    }, initialEmployeeState );

    //i shouldnt need to do this but theres some bug
    useEffect(() => {
        dispatch({type: 'clear'})
    }, [] )
    
    return (
        <div>
            <form>
                <div className="inline">
                    <input ref={searchInputEl} type="text" placeholder="Enter something to search.."></input>
                    <button className="btn" onClick={(event) => {
                        event.preventDefault()
                        dispatch({ type: "search", value: searchInputEl.current.value })

                    }}>Search</button>
                    <button className="btn"
                        onClick={(event) => {
                            event.preventDefault()
                            dispatch({ type: "clear" })
                        }}>Clear Search</button>
                </div>
            </form>
            <Table striped={true}>
                <thead>
                    <tr>
                        <th><span onClick={() => dispatch({ type: 'sort', value: 'firstName' })}>FirstName</span>
                            <input type="text" onKeyUp={(event) => { dispatch({ type: 'filter', value: { filterProp: "firstName", filterText: event.target.value } }) }} placeholder="filter by first name.."></input>
                        </th>
                        <th><span onClick={() => dispatch({ type: 'sort', value: 'lastName' })}>LastName</span>
                            <input type="text" onKeyUp={(event) => { dispatch({ type: 'filter', value: { filterProp: "lastName", filterText: event.target.value } }) }} placeholder="filter by last name.."></input>
                        </th>
                        <th><span onClick={() => dispatch({ type: 'sort', value: 'role' })}>Role</span>
                            <input type="text" onKeyUp={(event) => { dispatch({ type: 'filter', value: { filterProp: "role", filterText: event.target.value } }) }} placeholder="filter by role.."></input>
                        </th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeState.map(function (employee, index) {
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