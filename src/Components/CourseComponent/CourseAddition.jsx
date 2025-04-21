import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { generateCourseId, saveCourse } from '../../Services/CourseService';

const CourseAddition = () => {
    const [course, setCourse] = useState({
        courseId: 0,
        courseName: '',
        hours: 0,
        price: 0.0,
        technology: ''
    });
    const [newId, setNewId] = useState(0);
    let navigate = useNavigate();

    const showCourseId = () => {
        generateCourseId().then((response) => {
            setNewId(response.data);
        });

    }
    useEffect(() => {
        showCourseId();
    }, []);
    const onChangeHandler = (event) => {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;
        setCourse(values => ({ ...values, [name]: value }));
    };

    const courseSave = (event) => {
        event.preventDefault();
        course.courseId = newId;
        saveCourse(course).then(response => {
            alert("New Course is saved");
            navigate('/AdminMenu');
        });
    }

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-12 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <h2 className="text-center"><u>New Course Addition</u></h2>
                            <br />
                            <form>
                                <div className="form-group">
                                    <label>Course Id: </label>
                                    <input placeholder="Course Id" name="courseId" className="form-control" value={newId} />
                                </div>
                                <div className="form-group">
                                    <label>Course Name: </label>
                                    <input placeholder="Course Name" name="courseName" className="form-control"
                                        value={course.courseName} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Hours: </label>
                                    <input placeholder="hours" name="hours" className="form-control"
                                        value={course.hours} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Price: </label>
                                    <input placeholder="Price" name="price" className="form-control"
                                        value={course.price} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Technology: </label>
                                    <input placeholder="Technology" name="technology" className="form-control"
                                        value={course.technology} onChange={onChangeHandler} />
                                </div>
                                <br />

                                <button className="btn btn-success" onClick={courseSave}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </div>

    );
}
export default CourseAddition;