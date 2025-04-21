import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import '../../LoginView.css';
import { getAllSubscriptions } from "../../Services/SubscriptionService";
import { displayAllCourses } from '../../Services/CourseService';

const SubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [courseNames, setCourseNames] = useState({});
    let navigate = useNavigate();

    const showSubscriptions = () => {
        getAllSubscriptions().then((response) => {
            setSubscriptions(response.data);
        });
    };

    useEffect(() => {
        showSubscriptions();

        displayAllCourses().then((response) => {
            const courses = response.data;
            const courseMap = {};
            courses.forEach(course => {
                courseMap[course.courseId] = course.courseName;
            });
            setCourseNames(courseMap);
        
        });

    }, []);

    const returnBack = () => {
        navigate('/AdminMenu');
    };

    return (
        <div className="text-center">
            <h2 className="text-center">Subscription List</h2>
            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Subscription ID</th>
                            <th>Student ID</th>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Subscription Date</th>
                            <th>End Date</th>
                            <th>Installments</th>
                            <th>Installment Amount</th>
                            <th>Status</th>
                            <th>Update Subscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((sub) => (
                            <tr key={sub.subscriptionId}>
                                <td>{sub.subscriptionId}</td>
                                <td>{sub.studentId}</td>
                                <td>{sub.courseId}</td>
                                <td>{courseNames[sub.courseId] || "Loading..."}</td>
                                <td>{sub.subscriptionDate}</td>
                                <td>{sub.endDate}</td>
                                <td>{sub.installments}</td>
                                <td>₹{sub.installmentAmount}</td>
                                <td>{sub.status}</td>
                                <td><Link to={`/subscription-update/${sub.subscriptionId}`}><button style={{ marginLeft: "10px" }} className="btn btn-info">Update </button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <br />
                <button style={{ marginLeft: "10px" }} onClick={returnBack} className="btn btn-success">Return</button>
            </div>
        </div>
    );
}
export default SubscriptionList;