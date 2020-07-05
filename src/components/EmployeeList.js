import React, {useReducer,useState} from "react";
import {Table} from 'react-materialize'
import _ from 'lodash';

let currentSortProp = "";
let sortAsc = true

function EmployeeList({ employees }) {

    const [filter, setFilter] = useState();

    const [employeeState, dispatch] = useReducer((state, sortProp) => {
        //by default sort ascending unless they have already clicked to sort
        //in which case sort desc

        let sortOrder
        if (currentSortProp === sortProp) {
            sortAsc = !sortAsc
        }
        sortAsc ? sortOrder = 'asc' : sortOrder = 'desc'
        currentSortProp = sortProp

        return _.orderBy(state.map(x => x), sortProp, sortOrder); // Use Lodash to sort array by 'name'
    }, employees);

    return (
        <Table striped={true}>
            <thead>
                <tr>
                    <th><span onClick={() => dispatch('firstName')}>FirstName</span>
                        <input type="text" onKeyUp={(event) => {setFilter({prop: "firstName",value: event.target.value})}} placeholder="filter by first name.."></input>
                    </th>
                    <th><span onClick={() => dispatch('lastName')}>LastName</span>
                        <input type="text" onKeyUp={(event) => {setFilter({prop: "lastName",value: event.target.value})}} placeholder="filter by last name.."></input>
                    </th>
                    <th><span onClick={() => dispatch('lastName')}>Role</span>
                        <input type="text" onKeyUp={(event) => {setFilter({prop: "role",value: event.target.value})}} placeholder="filter by role.."></input>
                    </th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {employeeState.map(function (employee, index) {
                    //if the filter value matches this employees value dont show it
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
                                <img alt='employee' src={employee.picture}></img>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    )
}

export default EmployeeList;