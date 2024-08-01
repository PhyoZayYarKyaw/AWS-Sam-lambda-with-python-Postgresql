import React, { useState, useEffect } from "react";
import axios from "axios";
// import { read, utils } from 'xlsx';
// import BootstrapTable from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import './View.css';
import Modal from 'react-bootstrap/Modal';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

const ExcelJS = require('exceljs');

const View = () => {
    const [employees, setEmployees] = useState([]);
    // const[loading,setloading] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(10);


    useEffect(() => {
        fetchEmployees();


    }, []);


    const fetchEmployees = () => {
        // const config = {
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //       "Access-Control-Allow-Methods": "GET"
        //     }
        //   };

        axios.get('http://127.0.0.1:3000/employees')//,config
            .then(response => {
                setEmployees(response.data);
                console.log('res data :', response.data);

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    };



 
    const filteredEmployees = employees.filter(employee =>
        employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Change page
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredEmployees.length / employeesPerPage); i++) {
        pageNumbers.push(i);
    }
    function handleHeaderClick(header) {
        const newdata = employees.sort((a, b) => (a[header] > b[header] ? 1 : -1));
        setEmployees(newdata);
    }


    const handleExport = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My Sheet");
        sheet.properties.defaultRowHeight = 20;

        sheet.columns = [
            {
                header: "ID",
                key: "id",
                width: 12
            },
            {
                header: "Name",
                key: "name",
                width: 20
            },
            {
                header: "DOB",
                key: "dob",
                width: 20
            },
            {
                header: "Gender",
                key: "gender",
                width: 10
            },
            {
                header: "NRC",
                key: "nrc",
                width: 20
            },
            {
                header: "Email",
                key: "email",
                width: 25
            },
            {
                header: "Address",
                key: "address",
                width: 30
            },
            {
                header: "Skills",
                key: "skills",
                width: 20
            },
            {
                header: "Department",
                key: "department",
                width: 20
            },
            {
                header: "Type",
                key: "type",
                width: 20
            },
            {
                header: "Description",
                key: "description",
                width: 20
            },
            {
                header: "Year",
                key: "year",
                width: 10
            }
        ];


        const data = '';
        employees.sort((a, b) => (a.id > b.id) ? 1 : -1);
        employees.map(employee => {


            if (employee.Education.length > 0) {
                employee.Education.map(edu => {
                    sheet.addRow({
                        id: employee.id,
                        name: employee.name,
                        dob: employee.dob,
                        gender: employee.gender,
                        nrc: employee.nrc,
                        email: employee.email,
                        address: employee.address,
                        skills: employee.skills,
                        department: employee.department,

                        type: edu.type,
                        description: edu.description,
                        year: edu.year,

                    })
                })
            } else {
                sheet.addRow({
                    id: employee.id,
                    name: employee.name,
                    dob: employee.dob,
                    gender: employee.gender,
                    nrc: employee.nrc,
                    email: employee.email,
                    address: employee.address,
                    skills: employee.skills,
                    department: employee.department,
                })
            }


        });

        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",

            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = "Employees.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);


        })

    }
    // const [Excelfile, setExcelfile] = useState([]);
    // const [Exceldata , setExceldata] = useState([]);




    const [file, setFile] = useState(null);
    const [Exceldata, setExceldata] = useState([]);


    // const handleImport = (e) => {
    //     e.preventDefault();
    //     let filetypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    //     let selectedFile = e.target.files[0];
    //     setFile(selectedFile);
    //     document.getElementById("submit").click();
    //     // if (selectedFile) {
    //     //     if (selectedFile && filetypes.includes(selectedFile.type)) {
    //     //         console.log(selectedFile.type);
    //     //         let reader = new FileReader();
    //     //         reader.onload = (e) => {
    //     //             const workbook = read(e.target.result);
    //     //             const sheet = workbook.Sheetnames;
    //     //             if (sheet.length) {
    //     //                 const data = utils.sheet_to_json(workbook.Sheets[sheet[0]]);
    //     //                 console.log("Excel data are :", data);
    //     //                 setExceldata(data);
    //     //             }
    //     //         }
    //     //         reader.readAsArrayBuffer(selectedFile)
    //     //     } else {
    //     //         console.log("please upload only excel file")
    //     //     }
    //     // }
    // }


    const handleFileUpload = async (e) => {
        const files = e.target.files[0];

        let filetypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (!files) {
            toast.error('Please select a file.');

        } else if (files && filetypes.includes(files.type)) {

            const data = await files.arrayBuffer();
            const workbook = XLSX.readFile(data, { sheetRows: 2 });
            const worksheet = workbook.Sheets[workbook.Sheetnames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "",
            });
            const columns = jsonData[0];

            console.log(" Excel columns are :  ", columns);
            console.log(columns[0]);
            console.log(files.type);
            if (columns[0] === "id" && columns[1] === "name" &&
                columns[2] === "dob" && columns[3] === "gender" &&
                columns[4] === "nrc" && columns[5] === "email" &&
                columns[6] === "address" && columns[7] === "skills" &&
                columns[8] === "department" && columns[9] === "type" &&
                columns[10] === "description" && columns[11] == "year") {

                
                console.log("file is correct");
                console.log("submit data", workbook);
                const formData = new FormData();
                formData.append('file', files);
                // document.getElementById('fileUpload').click(files);
                try {
                    const response = await axios.post('http://localhost:3000/employees/ExcelImport/', formData, {
                        headers: {
                            'Content-type': 'multipart/form-data'
                        }
                    });
                    toast.success("Import data successfully");
                    console.log('Upload response:', response.data);
                    // Additional logic after successful upload
                    fetchEmployees();
                } catch (error) {
                    console.error('Error uploading file:', error);
                }


            } else {
                toast.error("file is not correct ");
            }
        } else {
            toast.error("Please choose excel file");
        }    //   setFile(files);



    };
    const [deleteid, setdeleteid] = useState("");
    const [show, setShow] = useState(false);
    const handleClickDelete = (id) => {
        setdeleteid(id);
        setShow(true);
    }
    const handleCancel = () => {
        fetchEmployees()
        setShow(false)
    }
    const handleDelete = () => {
        setShow(false);
        // axios.post(`http://localhost:3000/employees/delete/${id}/`)
        // if (window.confirm('Are you sure you want to delete this employee?')) {
        axios.delete(`http://127.0.0.1:3000/employees/delete/${deleteid}`, {
            method: 'DELETE'
        })
            .then(response => {
                console.log('Employee deleted:', response.data);
                toast.success('Employee delete successfully');
                fetchEmployees(); // Refresh employee list after deletion
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
        // }
    };

    return (

        <div>
            <Modal show={show} size="md" onHide={handleCancel} popup>
                <Modal.Header closeButton />
                <Modal.Header>Are you sure you want to delete this Employee?</Modal.Header>

                <Modal.Footer>
                    <div className="text-center">
                        {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                        {/* <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              
            </h3> */}
                        {/* <div className="flex justify-center gap-4"> */}
                        <Button variant="secondary" color="failure" onClick={handleDelete}>
                            OK
                        </Button>&nbsp;&nbsp;
                        <Button variant="primary" color="gray" onClick={handleCancel}>
                            Cancel
                        </Button>
                        {/* </div> */}
                    </div>
                </Modal.Footer>
            </Modal>

                            
            <div className="container" style={{ marginTop: "10px" }}>
                {/* <h2>Employee List</h2> */}


                <div className="d-flex justify-content-start">
                    <button className="btn btn-block" style={{ backgroundColor: '#d0e0e3' }} onClick={handleExport}>Export</button>
                    &nbsp;&nbsp;
                    <label className="btn btn-block" style={{ backgroundColor: '#d0e0e3' }}>
                        <input type="file" className="form-control" id="choosefile" onChange={handleFileUpload} style={{ display: 'none' }} />
                        Import</label>
                </div>

                {/* <div>
                <div className=" col-sm-3">
                    <button type="file" className="form-control" >choose file</button>
                    
                </div>

                </div> */}

                {/* <div className="col-sm-3">
                    <div className="input-group">
                        <input type="file" className="form-control" id="chooseflie" onChange={handleImport} style={{ display: 'none' }}/>
                        <div className="input-group-append">
                            <button className="btn" style={{ backgroundColor: '#d0e0e3' }} type="submit" onClick={fileupload} >Import</button>
                            <button id="submit" style={{ display: 'none' }}  onClick={handleFileUpload}/>
                        </div>
                    </div>
                </div> */}


                {/* Search input */}
                <div className="search-box-container">
                    <input
                        type="text"
                        placeholder="Search by name, email, "
                        value={searchTerm}
                        style={{
                            float: 'right',
                            padding: '6px',
                            border: 'none',
                            marginTop: '8px',
                            marginRight: '16px',
                            fontSize: '17px',
                            // background:'white',
                            border: '1px solid #ccc', // Example border style
                            borderRadius: '4px',
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="col col-form-control col-md-4 "
                        align="right"
                    /></div>
                <Table size="sm" onClick={handleHeaderClick} >
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>name</th>
                            <th>email</th>
                            <th>address</th>
                            <th>department</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.length > 0 ? (
                            currentEmployees.map(employee => (

                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.department}</td>
                                    <td>
                                        <Link to={`/employees/edit/${employee.id}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleClickDelete(employee.id)}>Delete</button>
                                    </td>
                                    {/* <Link to={`/employees/edit/${employee.id}/`}>Edit</Link>
                        <button onClick={() => handleDelete(employee.id)}>Delete</button> */}
                                </tr>
                            ))
                        ) : (     
                            <tr><td colSpan='7'>No employees found</td></tr>
                        )
                        }
                    </tbody>
                </Table>


                {/* Pagination */}
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                        </li>
                        {pageNumbers.map(number => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(number)}>{number}</button>
                            </li>
                        ))}

                        <li className={`page-item`}><button className="page-link"> total : {filteredEmployees.length}</button></li>
                        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>
    );

    function prePage() {

    }

    // function changeCPage(id){

    // }
    function nextPage() {

    }
}
export default View;