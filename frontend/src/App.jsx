import React from "react";

import View from "./View";

import Add from "./EmployeeForm";
import Navbar from "./Navigation";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeUpdateForm from "./EmployeeUpdateForm";
import Profile from "./image";
// import EmployeeForm from "./Add";

const App=()=>{

  return (
<div>
      <Navbar/>
        <div className="container">
        <Routes>
            <Route path="/" element={<Navigate to="/employees" replace={true} />}/>
            <Route path="/employees" element={<View />} active ="/employees" />
            <Route path="/employees/create" element={<Add />} />
            <Route path="/employees/image" element={<Profile />} />
            {/* employeeform has test image */}
            <Route path="/employees/edit/:id" element={<EmployeeUpdateForm />} />  
            {/* Other routes */}
        </Routes>
        </div>
        </div>   
);
}
export default App;