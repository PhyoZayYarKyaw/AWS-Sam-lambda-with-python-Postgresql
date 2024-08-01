import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeForm.css';
import { toast } from 'react-toastify';

const EmployeeUpdateForm = () => {
    const {id} = useParams();  // Assuming you're using React Router's useParams to get the employee ID from URL
    const navigate = useNavigate();
    console.log("id is ", id);
    const [formData, setFormData] = useState({
        id: '',
        // photo: '',
        name: '',
        dob: '',
        gender: '',
        nrc: '',
        email: '',
        address: '',
        skills: '',
        department: 'HR',
        Education: [
            { type: '', description: '', year: '' }
        ]
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');

    useEffect(() => {
        // Fetch employee details based on ID
        const fetchEmployeeDetails = async () => {
            try {
                
                const response = await axios.get(`http://localhost:3000/employees/edit/${id}`);         
                const employeeData = response.data;
                // setImage(employeeData.photo);
                if (employeeData.photo) {
                    setPreview(employeeData.photo);
                }

                console.log("Data are ",employeeData);
                const Eid=employeeData[0]["id"];
                const Ename = employeeData[0]["name"];
                const dob=employeeData[0]["dob"];
                const gender =employeeData[0]["gender"];
                const nrc=employeeData[0]["nrc"];
                const email=employeeData[0]["email"];
                const address = employeeData[0]["address"];
                const skills = employeeData[0]["skills"];
                const department =employeeData[0]["department"];
                const Education =employeeData[0]["Education"];
                console.log("Education is :" , Education);
                // employeeData=employeeData[0];
                // console.log("Edit data ",employeeData);
                console.log("id is ",id);
                console.log("dob is ",dob);
                console.log("skills are ",skills);
                setFormData({
                    id: Eid,
                    name: Ename,
                    // photo: '', // You might want to handle this differently depending on how files are managed
                    dob: dob,
                    gender: gender,
                    nrc: nrc,
                    email: email,
                    address: address,
                    skills: skills.split(','), // Assuming skills is stored as a comma-separated string in backend
                    department: department,
                    Education: Education.map(edu => ({
                        type: edu.type,
                        description: edu.description,
                        year: edu.year,
                    }))
                });


            } catch (error) {
                console.error('Error fetching employee details:', error);
                // Handle error gracefully, e.g., show error message
            }
        };




        fetchEmployeeDetails();
    }, [id]);
    
    console.log("preview image is :", preview);
    console.log("Image is ", image);
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                setFormData(prevState => ({
                    ...prevState,
                    skills: [...prevState.skills, value]
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    skills: prevState.skills.filter(skill => skill !== value)
                }));
            }
        } else if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
            // Handle image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            if (files[0]) {
                reader.readAsDataURL(files[0]);
            } else {
                setPreview('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = [...formData.Education];
        updatedEducation[index] = { ...updatedEducation[index], [name]: value };
        setFormData({ ...formData, Education: updatedEducation });
    };

    const handleAddEducation = () => {
        setFormData({
            ...formData,
            Education: [...formData.Education, { type: '', description: '', year: '' }]
        });
    };

    const handleRemoveEducation = (index,e) => {
        const updatedEducation = [...formData.Education];
        updatedEducation.splice(index, 1);
        setFormData({ ...formData, Education: updatedEducation });
    };
    
    
    
    const handleImageClick = (e) =>{
        document.getElementById("input").click();
      }

    const handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFormData({
                ...formData,
                photo: file
            });
            setPreview(reader.result);
            setImage(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.skills = formData.skills.toString();
        // formData.photo = image;
        console.log("Skill data :", formData.skills);
        console.log(" data are ", formData);

        // console.log("photo are :", formData.photo);
        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'Education') {
                const educationData = formData.Education.map(edu => ({
                    type: edu.type,
                    description: edu.description,
                    year: edu.year
                }));
                formDataToSubmit.append('Education', JSON.stringify(educationData));
            } else if (key === 'photo') {
                formDataToSubmit.append(key, formData[key]);
            } else {
                formDataToSubmit.append(key, formData[key]);
            }
        });
        // formData.photo = image;
        // formDataToSubmit.append('photo', formData.photo);
        console.log("Data to sent :", formDataToSubmit);
        try {
            const response = await axios.put(`http://localhost:3000/employees/update/${id}`,formData );
            //  {
            //     headers: {
            //         'Content-type': 'multipart/form-data'
            //     },
            //     body:{
            //         formData
            //     }
            // });
            if (response.status === 200) {
                toast.success('Employee updated successfully!');
                navigate('/employees');
            } else {
                toast.error('Failed to update employee');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error('Error updating employee');
        }
    };



    return (
        <div className="container">
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields */}
                {/* Image upload */}
                {/* Education background */}
                {/* Submit button */}

                <div className="row">
                    <div className="column">
                        <div className="form-group row">
                            <label htmlFor="id" className="col-md-6 col-form-label">Employee ID</label>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="id" name="id" value={formData.id} onChange={handleChange} required />
                            </div>
                        </div><br />

                        <div className="form-group row">
                            <label htmlFor="name" className="col-md-6 col-form-label">Name</label>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                        </div><br />
                        <div className="form-group row">
                            <label htmlFor="dob" className="col-md-6 col-form-label">Date of Birth</label>
                            <div className="col-md-6">
                                <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                            </div>
                        </div><br></br>
                        <div className="form-group row">
                            <div className="col-md-6 form-label">
                                <label className="col-form-label">gender</label>
                            </div>
                            <div className="col-md-6">
                                <div className="radio-group">
                                    <label><input className="form-check-input" type="radio" id="male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />  Male</label>&nbsp;&nbsp;


                                    <label><input className="form-check-input" type="radio" id="female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />  Female</label>&nbsp;&nbsp;


                                    <label ><input className="form-check-input" type="radio" id="other" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} />  Other</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="nrc" className="col-md-6 col-form-label">nrc</label>
                            <div className="col-md-6">
                                <input type="text" className="form-control" id="nrc" name="nrc" value={formData.nrc} onChange={handleChange} required />
                            </div>
                        </div><br />
                        <div className="form-group row">
                            <label htmlFor="email" className="col-md-6 col-form-label">email</label>
                            <div className="col-md-6">
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div><br />
                        <div className="form-group row">
                            <label htmlFor="address" className="col-md-6 col-form-label">address</label>
                            <div className="col-md-6">
                                <textarea className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required></textarea>
                            </div>
                        </div><br />
                        <div className="form-group row">
                            <div className="col-md-6">
                                <label className="col-form-label">skills</label>
                            </div>
                            <div className="col-md-6">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="Python" value="Python" checked={formData.skills.includes("Python")} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="Python">Python</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="PHP" value="PHP" checked={formData.skills.includes("PHP")} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="PHP">PHP</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="Java" value="Java" checked={formData.skills.includes("Java")} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="Java">Java</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="department" className="col-md-6 col-form-label">department</label>
                            <div className="col-md-6">
                                <select className="form-select" id="department" name="department" value={formData.department} onChange={handleChange} required>
                                    <option value="HR">HR</option>
                                    <option value="Admin">Admin</option>
                                    <option value="SDD">SDD</option>
                                    <option value="Finance">Finance</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="column align=center">


                        <div className="form-group row">
                            <h4 className="heading">Add Image</h4>
                            <div className="img-holder" onClick={handleImageClick}>

                                <img src={preview} alt="Preview" style={{ height: '100px', width: 'auto', marginTop: '10px', borderRadius: '10%' }} /><br></br><br></br>

                            </div>
                            <input type="file" name="image-uplod" id="input" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                            <label htmlFor="input" className="image-upload">

                            </label>
                        </div>
                    </div>
                </div>
                <div className="panel-default">
                    <div className="panel-body">
                        <p>Education Background</p>
                        <button className="btn btn-success" type="button" onClick={handleAddEducation}>ADD</button><br></br><br></br>
                        {Array.isArray(formData.Education) && formData.Education.map((edu, index) => (
                            <div key={index}>
                                <div className="form-group row">

                                    <div className="col-sm-3">
                                        <select className="form-select" id="type" name="type" value={edu.type} onChange={(e) => handleEducationChange(index, e)}>
                                            <option value="">Select type</option>
                                            <option value="Bachelor">Bachelor</option>
                                            <option value="Master">Master</option>
                                            <option value="Ph.D">Ph.D</option>
                                            <option value="Certificate">Certificate</option>
                                            <option value="Diploma">Diploma</option>
                                        </select>
                                    </div>
                                    <div className="col sm-3 nopadding">

                                        <input type="text" className="form-control" name="description" placeholder="description" value={edu.description} onChange={(e) => handleEducationChange(index, e)} />
                                    </div>
                                    <div className="col-sm-3 nopadding">

                                        <input type="text" className="form-control" name="year" placeholder="year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} />
                                    </div>
                                    <br />
                                    <div className="col-sm-3 nopadding">
                                        <button className="btn btn-danger" onClick={(e) => handleRemoveEducation(index,e)}>Remove</button>
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EmployeeUpdateForm;
