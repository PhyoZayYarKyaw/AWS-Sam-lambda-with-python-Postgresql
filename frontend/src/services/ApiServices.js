// src/components/Employees.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function getemployee(){
    return axios.get('http://127.0.0.1:8000/employees/')
    .then(res=> {
        return res.data
    })
}

export function CreateEmployee(employee){
    return axios.post('http://127.0.0.1:8000/employees/',
   {
    employee_id:employee.EmployeeID.value,
    name : employee.name.value,
    Photo : employee.Photo.value,
    DOB : employee.DOB.value,
    Gender : employee.Gender.value,
    NRC : employee.NRC.value,
    Email : employee.Email.value,
    Address : employee.Address.value,
    Skills : employee.Skills.value,

    })
    .then(res=> {
        return res.data
    })
}


// const API_URL = 'http://localhost:8000/api/';

// export const fetchEmployees = () => axios.get(`${API_URL}employees/`);

// export const createEmployee = (employee) => axios.post(`${API_URL}employees/`, employee);

// export const updateEmployee = (EmployeeID, employee) => axios.put(`${API_URL}employees/${EmployeeID}/`, employee);

// export const deleteEmployee = (EmployeeID) => axios.delete(`${API_URL}employees/${EmployeeID}/`);

// // Similarly, define functions for CRUD operations for Education

// export const createEducation = (education) => axios.post(`${API_URL}educations/`, education);

// export const updateEducation = (EmployeeID, education) => axios.put(`${API_URL}educations/${EmployeeID}/`, education);
