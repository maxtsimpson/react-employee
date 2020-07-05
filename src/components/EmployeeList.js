import React, {useReducer,useState} from "react";
import {Table, Input, Button} from 'react-materialize'
import _ from 'lodash';
// import TableFilter from 'react-table-filter';

// import { useEmployeeContext } from "../utils/GlobalState";

function EmployeeList({ employees }) {
    // const [employeeList, dispatch] = useEmployeeContext();

    // console.log(employees)
    // console.log(employees.length)
    // console.log({dispatch})

    const initialFilter = {
        prop: "",
        value: ""
    }

    const sortAsc = true;
    let currentSortProp = "";

    const [filter, setFilter] = useState();
    // setFilter(initialFilter)

    const [employeeState, dispatch] = useReducer((state, sortProp) => {
        //by default sort ascending unless they have already clicked to sort
        //in which case sort desc
        const sortOrder = 'asc'
        if (currentSortProp === sortProp) {
            sortOrder = 'desc'
        }
        // return state
        currentSortProp = sortProp
        return _.orderBy(state.map(x => x), sortProp, sortOrder); // Use Lodash to sort array by 'name'
    }, employees);

    return (
        <Table striped={true}>
            <thead>
                <tr>
                    <th onClick={() => dispatch('firstName')}>FirstName
                        <input type="text" onKeyUp={(event) => {setFilter({prop: "firstName",value: event.target.value})}} placeholder="filter by first name.."></input>
                    </th>
                    <th onClick={() => dispatch('lastName')}>LastName
                        <input type="text" onKeyUp={(event) => {setFilter({prop: "lastName",value: event.target.value})}} placeholder="filter by last name.."></input>
                    </th>
                    <th onClick={() => dispatch('role')}>Role
                        <input type="text" onKeyUp={(event) => {setFilter({prop: "role",value: event.target.value})}} placeholder="filter by role.."></input>
                    </th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {employeeState.map(function (employee, index) {
                    //if the filter value matches this employees value dont show it
                    console.log(filter)
                    if (filter){
                        //use a starts with but make sure they are both converted to lowercase
                        if ((!employee[filter.prop].startsWith(filter.value)) && filter.value !== "") {
                            return
                        }
                    }
                    return (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.role}</td>
                            <td>
                                <image source={employee.picture}>{employee.picture}</image>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    )
}

export default EmployeeList;