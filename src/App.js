import React, { useEffect,useState } from "react";
import "./App.css";
import EmployeeList from "./components/EmployeeList"
import generateEmployees from "./utils/generateEmployees";
import Jumbotron from "./components/jumbotron"

function App() {

  const [employeeArray,setEmployees] = useState([]);

  useEffect(() => {
    const employees = generateEmployees()
    setEmployees(employees);
  }, []);

  return (
    <div className="container text-center">
        <Jumbotron></Jumbotron>
        <EmployeeList employees={employeeArray}/>
    </div>
  );
}

export default App;
