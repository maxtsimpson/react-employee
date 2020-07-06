import React from "react";
import "./App.css";
import EmployeeList from "./components/EmployeeList"
import { generateEmployees } from "./utils/generateEmployees";
import Jumbotron from "./components/jumbotron"

function App() {

  const employees = generateEmployees();

  return (
    <div className="container text-center">
        {/* <h4>My Employee List:</h4> */}
        <Jumbotron></Jumbotron>
        <EmployeeList employees={employees}/>
    </div>
  );
}

export default App;
