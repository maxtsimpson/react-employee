import React from "react";
import "./App.css";
import EmployeeList from "./components/EmployeeList"
import { generateEmployees } from "./utils/generateEmployees";

function App() {

  const employees = generateEmployees();

  return (
    <div className="container text-center">
        <h4>My Employee List:</h4>
        <EmployeeList employees={employees}/>
    </div>
  );
}

export default App;
