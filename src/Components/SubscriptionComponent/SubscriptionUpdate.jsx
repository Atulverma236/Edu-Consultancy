import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../LoginView.css';
import { getSubscriptionById, updateSubscription } from '../../Services/SubscriptionService';

const SubscriptionUpdate = () => {
    const [subscription, setSubscription] = useState({
        subscriptionId: 0,
        subscriptionDate: '',
        endDate: '',
        installmentAmount: '',
        installment: '1',
        status: ''
    });
    const navigate = useNavigate();
    const { subscriptionId } = useParams();

    useEffect(() => {
        getSubscriptionById(subscriptionId).then(response => {
            setSubscription(response.data);
        }).catch(error => {
            console.error("Error fetching subscription details:", error);
        });
    }, [subscriptionId]);

    const calculateInstallmentAmount = (installment) => {
        const baseAmount = subscription.installmentAmount || 1000; 
        const interestRate = 0.10; 
        const totalAmount = baseAmount * (1 + interestRate);
        return (installment > 0 ? (totalAmount / installment).toFixed(2) : totalAmount);
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setSubscription(prev => {
            let updatedSubscription = { ...prev, [name]: value };
            
            if (name === "installment") {
                updatedSubscription.installmentAmount = calculateInstallmentAmount(value);
            }

            return updatedSubscription;
        });
    };

    const subscriptionSave = (event) => {
        event.preventDefault();
        updateSubscription(subscription).then(() => {
            alert("Subscription successfully updated!");
            navigate('/AdminMenu');
        }).catch(error => {
            console.error("Error updating subscription:", error);
            alert("Update failed! Please try again.");
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-12">
                    <div className="card-body">
                        <h2 className="text-center"><u>Update Subscription</u></h2>
                        <br />
                        <form>
                        <div className="form-group">
                                    <label>Subscription Id: </label>
                                    <input
                                        placeholder="Subscription Id"
                                        name="subscriptionId"
                                        className="form-control"
                                        value={subscription.subscriptionId}
                                        disabled
                                    />
                                </div>
                            <div className="form-group">
                                <label>Subscription Date:</label>
                                <input type="date" name="subscriptionDate" className="form-control" value={subscription.subscriptionDate} onChange={onChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label>End Date:</label>
                                <input type="date" name="endDate" className="form-control" value={subscription.endDate} onChange={onChangeHandler} />
                            </div>
                            <div className="form-group">
                                <label>Installment Amount (Including 10% Interest):</label>
                                <input type="number" name="installmentAmount" className="form-control" value={subscription.installmentAmount} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Number of Installments (1-4):</label>
                                <select
                                    name="installment"
                                    className="form-control"
                                    value={subscription.installment}
                                    onChange={onChangeHandler}
                                >
                                    <option value="1">Full Payment</option>
                                    <option value="2">2 Installments</option>
                                    <option value="3">3 Installments</option>
                                    <option value="4">4 Installments</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <select name="status" className="form-control" value={subscription.status} onChange={onChangeHandler}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <button className="btn btn-success" onClick={subscriptionSave}>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionUpdate;