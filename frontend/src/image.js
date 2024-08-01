import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
const Profile = () => {
    const [file, setFile] = useState('');
    const [Exceldata, setExceldata] = useState([]);

    const handleImport = (e) => {
        e.preventDefault();
        document.getElementById("choosefile").click(); // Click the hidden file input
        console.log("file is " , file);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log("file is selected",selectedFile)
        document.getElementById("submit").click(); // Trigger the hidden submit button
    };

    const handleUpload = (files) =>{
        console.log("File is uploading...",file);
        console.log("file is " , files);
    }

    
    const handleFileUpload = (e) =>{
        
    }
    return (
        <div className="col-sm-3">
            <div className="input-group">
                {/* Hidden file input */}
                <label className="btn btn-block" style={{ backgroundColor: '#d0e0e3' }}>
                <input type="file" className="form-control" id="choosefile" onChange={handleFileUpload} style={{ display: 'none' }} />
                    Upload</label>
                {/* <div className="input-group-append">
                    
                    <button className="btn" style={{ backgroundColor: '#d0e0e3' }} type="button" onClick={handleImport}>Import</button>
                    
                    
                </div> */}
                <button id="fileUpload" style={{ display: 'none' }} onClick={handleUpload}></button>
            </div>
        </div>
    );
};

export default Profile;
