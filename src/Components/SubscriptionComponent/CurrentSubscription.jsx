import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { getCurrentSubscriptions } from '../../Services/SubscriptionService';

const CurrentSubscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentSubscriptions()
            .then((response) => {
                console.log("API Response:", response);
                console.log("Subscriptions Data:", response.data);
                setSubscriptions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching subscriptions:", error);
            });
    }, []);
    


    const handleBack = () => {
        navigate('/AdminMenu');
    };

    return (
        <div className="text-center">
            <h2 className="text-center">Current Subscription</h2>
            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Subscription Id</th>
                            <th>Student Id</th>
                            <th>Course Id</th>
                            <th>Subscription Date</th>
                            <th>End Date</th>
                            <th>Installments</th>
                            <th>Installment Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subscriptions.map((sub) => (
                                <tr key={sub.subscriptionId }>
                                    <td>{sub.subscriptionId}</td>
                                    <td>{sub.studentId}</td>
                                    <td>{sub.courseId}</td>
                                    <td>{sub.subscriptionDate}</td>
                                    <td>{sub.endDate}</td>
                                    <td>{sub.installments}</td>
                                    <td>₹{sub.installmentAmount}</td>
                                    <td>{sub.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
            <button onClick={handleBack} className="btn btn-primary">Back</button>
        </div>
    );
}
export default CurrentSubscription;