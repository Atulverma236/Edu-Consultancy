import React, { useEffect, useState } from "react";
import "../../LoginView.css";
import { getStudentDetail } from "../../Services/StudentService";
import { useNavigate, useParams } from "react-router-dom";

const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getStudentDetail(id)
            .then((response) => {
                setStudent(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error loading student details");
                setLoading(false);
            });
    }, [id]);


    const returnBack = () => {
        navigate("/StudentMenu");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="card col-md-12 ">
                    <div className="card-body">
                        <h2 className="text-center text-primary">
                            <u>Student Details</u>
                        </h2>

                        {loading && <h4 className="text-center text-info mt-3">Loading...</h4>}

                        {error && <h4 className="text-center text-danger mt-3">{error}</h4>}

                        {!loading && !error && student && (
                            <table className="table table-bordered mt-3">
                                <tbody>
                                    <tr>
                                        <th>Registration Number</th>
                                        <td>{student.registrationNum}</td>
                                    </tr>
                                    <tr>
                                        <th>User Name</th>
                                        <td>{student.userName}</td>
                                    </tr>
                                    <tr>
                                        <th>Student Name</th>
                                        <td>{student.studentName}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{student.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile</th>
                                        <td>{student.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>{student.address}</td>
                                    </tr>
                                    <tr>
                                        <th>Student Level</th>
                                        <td>{student.studentLevel}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{student.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}

                        <div className="text-center">
                            <button onClick={returnBack} className="btn btn-success mt-3">
                                Return
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;