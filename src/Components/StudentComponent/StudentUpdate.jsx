import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import { getStudentById, updateStudent } from '../../Services/StudentService';

const StudentUpdate = () => {
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

    const param = useParams();
    const navigate = useNavigate();


    const setStudentData = () => {
        getStudentById(param.reg).then((response) => {
            setStudent(response.data);
        });
    };

    useEffect(() => {
        setStudentData();
    }, []);
    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setStudent((values) => ({ ...values, [name]: value }));
    };

    const studentUpdate=(event)=>{
        event.preventDefault();
        updateStudent(student).then(response=>{
            alert("Student updated successfully");
            navigate('/student-list');
        }
        );
    }

    const returnBack=()=>{
        navigate('/student-list');
    }
        
    
    return (
        <div>
            <br />
            <div className="container d-flex justify-content-center align-items-start vh-100">
                <div className="row w-100">
                    <div className="card col-md-6 mx-auto">
                        <div className="card-body">
                            <h2 className="text-center"><u>Update Student</u></h2>
                            <br />
                            <form>
                                <div className="form-group">
                                    <label>Registration Number: </label>
                                    <input
                                        name="registrationNum"
                                        className="form-control"
                                        value={student.registrationNum}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>User Name: </label>
                                    <input
                                        name="userName"
                                        className="form-control"
                                        value={student.userName}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Student Name: </label>
                                    <input
                                        name="studentName"
                                        className="form-control"
                                        value={student.studentName}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input
                                        name="email"
                                        className="form-control"
                                        value={student.email}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mobile: </label>
                                    <input
                                        name="mobile"
                                        className="form-control"
                                        type="number"
                                        value={student.mobile}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address: </label>
                                    <input
                                        name="address"
                                        className="form-control"
                                        value={student.address}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Student Level: </label>
                                    <input
                                        name="studentLevel"
                                        className="form-control"
                                        value={student.studentLevel}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status: </label>
                                    <input
                                        name="status"
                                        className="form-control"
                                        value={student.status}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <br />
                                <button className="btn btn-success" onClick={studentUpdate}>
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentUpdate;
