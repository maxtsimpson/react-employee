import React from 'react';
import ReactDataGrid from 'react-data-grid';

function DataGrid({ employees }) {
    console.log(employees)

    const columns = [
        { key: 'id', name: 'ID' },
        { key: 'firstName', name: 'FirstName' },
        { key: 'lastName', name: 'LastName' },
        { key: 'role', name: 'Role' },
        { key: 'picture', name: 'Picture' }
    ];

    const rows = employees

    return (<ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={employees.length}
        minHeight={150} />);
}

export default DataGrid;