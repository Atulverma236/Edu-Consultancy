import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../LoginView.css';
import { getSubscriptionById, getStatusBySubscriptionId, updateSubscription } from "../../Services/SubscriptionService";
import { generateBillId, getMaximumInstallmentNumber, savePayment } from "../../Services/PaymentService";

const PaymentEntry = () => {
    const [ payment, setPayment]= useState({
        billNumber: '',
        subscriptionId: '',
        studentId: '',
        installmentNo: 0,
        amount: 0.0,
        payDate: new Date()
    });
    let navigate = useNavigate();
    const param = useParams();
    const [ newId, setNewId ] = useState('');
    let [date1, setDate1 ] = useState(new Date());
    const [ installment, setInstallment ] = useState(0);
    const [subscription, setSubscription ] = useState({
        subscriptionId: '',
        studentId: '',
        courseId: '',
        subscriptionDate: new Date(),
        endDate: '',
        installments: 0,
        installmentAmount: 0.0,
        status: ''
    });
    const setSubscriptionData = () => {
        getSubscriptionById(param.subscriptionId).then((res) => {
            setSubscription(res.data);
        });
    };
    const setBillNumber = () => {
        generateBillId().then((res) => {
            setNewId(res.data);
        });
    };
    const checkStatus = () => {
        getStatusBySubscriptionId(param.subscriptionId).then((res) => {
            if (res.data === 'Complete') {
                alert("Payment already done for this subscription");
                navigate('/StudentMenu');
            }
            else {

                getMaximumInstallmentNumber(param.subscriptionId).then((res) => {
                    setInstallment(res.data);
                });
            }
        });
    }

    useEffect(() => {
        setSubscriptionData();
        setBillNumber();
        checkStatus();
    }, []);

    const paymentSave = (event) => {
        event.preventDefault();
        payment.billNumber = newId;
        payment.subscriptionId = subscription.subscriptionId;
        payment.amount = subscription.installmentAmount;
        payment.payDate = date1;
        payment.installmentNo = installment + 1;

        if (payment.installmentNo == subscription.installments) {
            subscription.status = 'Complete';
            updateSubscription(subscription).then((res) => {
                alert("All installments paid for this subscription");
            });

        };
        savePayment(payment).then((res) => {
            installment = installment + 1;
            alert("Payment Done Successfully" + installment);
            navigate('/StudentMenu');
        });
    }
    const returnBack = () => {
        navigate('/StudentMenu');
    }
    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-12 offset-md-3 offset-md-3">
                        <div className="login-box">
                            <h2 className="text-center"><u>Payment for Subscribed Course</u></h2>
                            <br />
                            <form>
                                <div className="form-group">
                                    <label>Bill Number: {newId} </label>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Subscription Id: {subscription.subscriptionId} </label>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Installment Number: {installment + 1} </label>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label>Amount:{subscription.installmentAmount}</label>
                                </div>
                                <br />
                                <div>
                                    <label>Select Payment Date:</label>
                                    <input type="date" className="form-control" value={date1} onChange={(e) => setDate1(e.target.value)} />

                                </div>
                                <br />
                                <button className="btn-btn-success" onClick={paymentSave}>Save</button>
                                &nbsp;&nbsp;
                                <button className="btn-btn-danger" onClick={returnBack}>Return</button>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default PaymentEntry;