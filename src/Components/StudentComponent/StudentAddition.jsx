import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { generateRegistrationNum, getStudentStatusByUserName, saveStudent } from '../../Services/StudentService';

const StudentAddition = () => {
    const [student, setStudent] = useState({
        registrationNum: '',
        userName: '',
        studentName: '',
        email: '',
        mobile: 0,
        address: '',
        studentLevel: '',
        status: ''
    });
    const [newId, setNewId] = useState('');
    let navigate = useNavigate();
    
    const checkStatus = (status) => {
        getStudentStatusByUserName(status).then((response) => {
            
            if (response.data===true || response.data===false) {
                alert("Student already exists");
                navigate('/StudentMenu');
            }
            else {
                showStudentId();
            }
        });
    }
    
    const showStudentId = () => {
        generateRegistrationNum().then((response) => {
            setNewId(response.data);
        });

    }
    useEffect(() => {
        checkStatus();
    }, []);
    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setStudent(values => ({ ...values, [name]: value }));
    };
    const validateForm = () => {
        if (
            !student.studentName.trim() ||
            !student.mobile.trim() ||
            !student.address.trim() ||
            !student.studentLevel.trim()  
        ) {
           
            alert('⚠️ All fields are required!');
            return false; 
        }
        return true; 
    };
    
    const studentSave = (event) => {
        event.preventDefault();
        if (validateForm()) {
            student.registrationNum = newId;
            saveStudent(student).then((response) => {
                alert('✅ New Student is registered Successfully!');
                navigate('/StudentMenu');
            });
        }
    }
    return (
        <div>
            <br></br>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="card col-md-8 col-lg-6">
                    <div className="card-body">
                        <h2 className="text-center"><u>New Student Registration</u></h2>
                        <br />
                        <form>
                            <div className="form-group">
                                <label>Registration Number: </label>
                                <input placeholder="Registration Number" name="registrationNum" className="form-control" value={newId} />
                            </div>
                           
                            <div className="form-group">
                                <label>Student Name: </label>
                                <input placeholder="Student Name" name="studentName" className="form-control" value={student.studentName} onChange={onChangeHandler} />
                            </div>
                           
                            <div className="form-group">
                                <label>Mobile: </label>
                                <input placeholder="Mobile" name="mobile" className="form-control" value={student.mobile} onChange={onChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label>Address: </label>
                                <input placeholder="Address" name="address" className="form-control" value={student.address} onChange={onChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label>Student Level: </label>
                                <input placeholder="Student Level" name="studentLevel" className="form-control" value={student.studentLevel} onChange={onChangeHandler} />
                            </div>
                           
                            <br />
                            <button className="btn btn-success" onClick={studentSave}>Save</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );

}
export default StudentAddition;