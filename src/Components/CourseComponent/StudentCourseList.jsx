import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../LoginView.css';
import { displayAllCourses, deleteCourseById } from '../../Services/CourseService';


const StudentCourseList = () => {
    const [courses, setCourses] = useState([]);
    let navigate = useNavigate();

    const showCourses = () => {
        displayAllCourses().then((response) => {
            setCourses(response.data);
        });
    }

    useEffect(() => {
        showCourses();
    }, []);

    const returnBack = () => {
        navigate('/StudentMenu');
    }

    const removeCourse = (id) => {
        deleteCourseById(id).then(res => {
            let remainCourses = courses.filter((course) => (course.courseId !== id));
            setCourses(remainCourses);
        });
        navigate('/student-course-list');
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center" >Student Course List</h2>
                            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
                            <div className="table-responsive mt-4">
                                <table className="table table-bordered mt-3">
                                    <thead>
                                        <tr>
                                            <th> Course Id</th>
                                            <th> Course Name</th>
                                            <th> Course Hours </th>
                                            <th> Course Price</th>
                                            <th> Technology</th>
                                            <th>Course Subscription</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            courses.map((course, index) => (
                                                <tr key={course.courseId}>
                                                    <td>{course.courseId}</td>
                                                    <td>{course.courseName}</td>
                                                    <td>{course.hours}</td>
                                                    <td>{course.price}</td>
                                                    <td>{course.technology}</td>
                                                    <td><Link to={`/add-subscription/${course.courseId}`}><button style={{ marginLeft: "10px" }} className="btn btn-info">Subscribe </button></Link></td>

                                                </tr>
                                            ))
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
export default StudentCourseList;
