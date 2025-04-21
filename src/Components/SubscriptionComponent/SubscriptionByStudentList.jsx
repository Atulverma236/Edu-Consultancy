import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../LoginView.css';
import { getAllSubscriptionsByStudent } from '../../Services/SubscriptionService';
const SubscriptionByStudentList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        getAllSubscriptionsByStudent()
            .then(response => {
                console.log("Received subscriptions:", response.data);
                setSubscriptions(response.data);
            })
            .catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    const returnBack = () => {
        navigate('/StudentMenu');
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="row w-100">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center text-primary">Subscriptions</h2>
                            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
                            <div className="table-responsive mt-4">
                                <table className="table table-bordered mt-3">
                                    <thead>
                                        <tr>
                                            <th>Subscription ID</th>
                                            <th>Course ID</th>
                                            <th>Subscription Date</th>
                                            <th>End Date</th>
                                            <th>Installments</th>
                                            <th>Installment Amount</th>
                                            <th>Status</th>
                                            <th>Subscribe Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscriptions.map((sub, index) => (
                                            <tr key={sub.subscriptionId || `sub-${index}`}>
                                                <td>{sub.subscriptionId}</td>
                                                <td>{sub.courseId}</td>
                                                <td>{sub.subscriptionDate}</td>
                                                <td>{sub.endDate}</td>
                                                <td>{sub.installments}</td>
                                                <td>₹{sub.installmentAmount}</td>
                                                <td>{sub.status}</td>
                                                <td><Link to={`/payment-entry`}><button style={{ marginLeft: "10px" }} className="btn btn-info">Payment</button></Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <br />
                            </div>
                            <button style={{ marginLeft: "10px" }} onClick={returnBack} className="btn btn-success">Return</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionByStudentList;
