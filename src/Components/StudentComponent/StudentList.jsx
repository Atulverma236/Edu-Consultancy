import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../LoginView.css';
import { getAllStudents } from '../../Services/StudentService';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    let navigate = useNavigate();
    const showStudents = () => {
        getAllStudents().then((response) => {
            setStudents(response.data);
        });
    }
    useEffect(() => {
        showStudents();
    });
    const returnBack = () => {
        navigate('/AdminMenu');
    }
    return (
        
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="row w-100">
            <div className="col-12">
                <div className="card shadow">
                    <div className="card-body">
                            
                            <h2 className="text-center"><u>Student List</u></h2>
                            <br />
                            <div className="table-responsive mt-4" style={{ overflowX: 'auto' }}>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Registration Number</th>
                                            <th>User Name</th>
                                            <th>Student Name</th>
                                            <th>Email</th>
                                            <th>Mobile</th>
                                            <th>Address</th>
                                            <th>Student Level</th>
                                            <th>Status</th>
                                            <th>Update Student</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            students.map(
                                                student =>
                                                    <tr key={student.registrationNum}>
                                                        <td>{student.registrationNum}</td>
                                                        <td>{student.userName}</td>
                                                        <td>{student.studentName}</td>
                                                        <td>{student.email}</td>
                                                        <td>{student.mobile}</td>
                                                        <td>{student.address}</td>
                                                        <td>{student.studentLevel}</td>
                                                        <td>{student.status}</td>
                                                        <td><Link to={`/update-student/${student.registrationNum}`}><button style={{ marginLeft: "10px" }} className="btn btn-info">Update </button></Link></td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                <br />
                                </div>
                                <button style={{ marginLeft: "10px" }} onClick={() => returnBack()} className="btn btn-success">Return</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

       
    );
}
export default StudentList;