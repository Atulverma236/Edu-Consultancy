import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { getCurrentStudents } from '../../Services/StudentService';

const StudentCurrent = () => {
    const [students, setStudents] = useState([]);
    let navigate = useNavigate();

    const showStudents = () => {
        getCurrentStudents().then((response) => {
            setStudents(response.data);
        });
    }

    useEffect(() => {
        showStudents();
    }, []);

    const returnBack = () => {
        navigate('/AdminMenu');
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">

                            <h2 className="text-center text-primary" >Current Students-List</h2>
                            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
                            <div className="table-responsive mt-4">
                                <table className="table table-bordered mt-3">
                                    <thead>
                                        <tr>
                                            <th> Registration Number</th>
                                            <th> User Name</th>
                                            <th> Student Name </th>
                                            <th> Email</th>
                                            <th> Mobile</th>
                                            <th> Address</th>
                                            <th> Student Level</th>
                                            <th> Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            students.map((student, index) => (
                                                <tr key={student.registrationNum}>
                                                    <td>{student.registrationNum}</td>
                                                    <td>{student.userName}</td>
                                                    <td>{student.studentName}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.mobile}</td>
                                                    <td>{student.address}</td>
                                                    <td>{student.studentLevel}</td>
                                                    <td>{student.status}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>

                                
                            </div>
                            <button className="btn btn-danger" onClick={returnBack}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default StudentCurrent;