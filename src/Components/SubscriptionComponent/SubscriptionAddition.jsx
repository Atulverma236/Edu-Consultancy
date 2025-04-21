import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import { saveSubscription, generateSubscriptionId, getStatusByCourseIdStudentId } from '../../Services/SubscriptionService';
import { getStudentStatusByUserName } from '../../Services/StudentService';
import { displayCourseById } from '../../Services/CourseService';

const SubscriptionAddition = () => {
    let navigate = useNavigate();
    const param = useParams();
    const [newId, setNewId] = useState("");
    let [date1, setDate1] = useState(new Date());
    const [totalAmount, setTotalAmount] = useState(0.0);

    const [course, setCourse] = useState({
        courseId: 0,
        courseName: "",
        hours: 0,
        price: 0.0,
        technology: ""
    });

    const [subscription, setSubscription] = useState({
        subscriptionId: '',
        studentId: '',
        courseId: 0,
        subscriptionDate: new Date(),
        endDate: '',
        installments: 1,
        installmentAmount: 0.0,
        status: ''
    });
    const setCourseData = () => {
        displayCourseById(param.courseId).then(response => {
            setCourse(response.data);
            updateInstallmentAmount(response.data.price, subscription.installments); // Calculate based on initial value
        });
    };
    

    const setSubscriptionId = () => {
        generateSubscriptionId().then(response => {
            setNewId(response.data);
        });
    };

    const checkStatus = () => {
        getStudentStatusByUserName().then(response => {
            if (response.data === false) {
                alert("Student need to register.....");
                navigate("/StudentMenu");
            }
        });
    };
    const checkSubscription = () => {
        getStatusByCourseIdStudentId(param.courseId).then(response => {
            if (
                response.data === 'complete' ||
                response.data === 'active' ||
                response.data === 'expired'
            ) {
                alert("Course Already Registered.....");
                navigate('/StudentMenu');
            }
        });
    };

    useEffect(() => {
        checkStatus();
        checkSubscription();
        setCourseData();
        setSubscriptionId();
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
    
        setSubscription(prev => ({
            ...prev,
            [name]: value,
        }));
    
        if (name === 'installments') {
            const installments = parseInt(value);
            updateInstallmentAmount(course.price, installments);
        }
    };
    
    const subscriptionSave = (event) => {
        subscription.subscriptionId = newId;
        subscription.subscriptionDate = date1;
        subscription.courseId = course.courseId;

        saveSubscription(subscription).then(response => {
            alert("Course Subscribed Successfully");
            navigate('/StudentMenu');
        });
    };
    const updateInstallmentAmount = (price, installments) => {
        let total = parseFloat(price);
        if (installments > 1) {
            total *= 1.10; // Add 10% interest
        }
        const installmentAmount = total / installments;
    
        setTotalAmount(total.toFixed(2));
        setSubscription(prev => ({
            ...prev,
            installmentAmount: installmentAmount.toFixed(2),
        }));
    };
    

    const returnBack = () => {
        navigate("/StudentMenu");
    };

    return (
        <div>
            <br /><br />
            <div className="container">
                
                        <div className="login-box">
                            <h2 className="text-center">
                                <u>Subscribe Course</u>
                            </h2>
                            <br />
                            <form>
                                <div className="form-group">
                                    <label>Subscription Id: {newId}</label>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Course Id: {course.courseId}</label>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Course Name: {course.courseName}</label>
                                </div>
                                <br />
                                <div className='form-group'>
                                    <label> Hours: {course.hours}</label>
                                </div>
                                <div className="form-group">
                                    <label>Course Price: {course.price}</label>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Technology: {course.technology}</label>
                                </div>

                                <div className="form-group">
                                    <br />
                                    <label>Select Subscription Date:</label>
                                    <input
                                        type="date"
                                        placeholder="yyyy-mm-dd"
                                        className="form-control"
                                        value={date1} onChange={(event) => setDate1(event.target.value)}
                                    />
                                </div>


                                <div className="form-group">
                                    <label>Select Installment Numbers:</label>
                                    <select
                                        name="installments"
                                        value={subscription.installments}
                                        className="form-control"
                                        onChange={onChangeHandler}
                                    >
                                        <option value="1">Full Payment</option>
                                        <option value="2">2 installments</option>
                                        <option value="3">3 installments</option>
                                        <option value="4">4 installments</option>
                                    </select>
                                </div>

                                <br />
                              
                                <div className="form-group">
                                    <label>Total Amount (₹):</label>
                                    <input
                                        className="form-control"
                                        value={totalAmount}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Installment Amount (₹):</label>
                                    <input
                                        className="form-control"
                                        value={subscription.installmentAmount}
                                        readOnly
                                    />
                                </div>
                                <br />
                                <button
                                    className="btn btn-success"
                                    onClick={subscriptionSave}
                                >
                                    Save
                                </button>
                                &nbsp;&nbsp;
                                <button
                                    className="btn btn-danger"
                                    onClick={returnBack}
                                >
                                    Return
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
           
        
       
    );
}
export default SubscriptionAddition;