import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import { displayCourseById, updateCourse } from '../../Services/CourseService';

const CourseUpdate = () => {
    const [course, setCourse] = useState({
        courseId: 0,
        courseName: '',
        hours: 0,
        price: 0.0,
        technology: ''
    });

    const { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        displayCourseById(id).then((response) => {
                if (response.data) {
                    setCourse(response.data); 
                } else {
                    alert("Course not found!");
                    navigate('/AdminMenu');
                }
            }).catch((error) => {
                console.error("Error fetching course:", error);
                alert("Course not found!");
                navigate('/AdminMenu'); 
            });
    }, [id, navigate]);

    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setCourse((values) => ({ ...values, [name]: value }));
    };

    const courseUpdate = (event) => {
        event.preventDefault();
        updateCourse(course)
            .then((response) => {
                alert("Course updated successfully");
                navigate('/AdminMenu'); 
            })
            .catch((error) => {
                console.error("Error updating course:", error);
                alert("Failed to update the course");
            });
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-12 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <h2 className="text-center"><u>Update Course</u></h2>
                            <br />
                            <form>
                                <div className="form-group">
                                    <label>Course Id: </label>
                                    <input
                                        placeholder="Course Id"
                                        name="courseId"
                                        className="form-control"
                                        value={course.courseId}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Course Name: </label>
                                    <input
                                        placeholder="Course Name"
                                        name="courseName"
                                        className="form-control"
                                        value={course.courseName}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Hours: </label>
                                    <input
                                        placeholder="Hours"
                                        name="hours"
                                        className="form-control"
                                        type="number"
                                        value={course.hours}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price: </label>
                                    <input
                                        placeholder="Price"
                                        name="price"
                                        className="form-control"
                                        type="number"
                                        value={course.price}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Technology: </label>
                                    <input
                                        placeholder="Technology"
                                        name="technology"
                                        className="form-control"
                                        value={course.technology}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <br />
                                <button className="btn btn-success" onClick={courseUpdate}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseUpdate;