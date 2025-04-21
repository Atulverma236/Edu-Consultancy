import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo1 from "../../assets/logo1.png";
import '../../LoginView.css';
import { registerNewUser } from '../../Services/LoginService';

const RegisterUser = () => {
    const [educonUser, setEduconUser] = useState({
        username: "",
        password: "",
        email: "",
        category: "",
    });

    const [password2, setPassword2] = useState("");
    const [formErrors, setFormErrors] = useState({});
    let navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setEduconUser(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: "" })); 
    };

    const saveNewUser = (event) => {
        event.preventDefault();
        const errors = {};

        if (!educonUser.username.trim()) errors.username = "Username is mandatory";
        if (!educonUser.password) errors.password = "Password is mandatory";
        if (educonUser.password.length < 5 || educonUser.password.length > 10)
            errors.password = "Password must be between 5 to 10 characters";
        if (!password2) errors.password2 = "Confirm Password is mandatory";
        if (educonUser.password && password2 && educonUser.password !== password2)
            errors.password2 = "Passwords do not match";
        if (!educonUser.email.trim()) errors.email = "Email is mandatory";
        if (!educonUser.category) errors.category = "Category is mandatory";

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            registerNewUser(educonUser).then(() => {
                alert("User is registered successfully...Go For Login");
                navigate('/');
            });
        }
    };

    return (
        <div>
            <div className="shadow-lg p-2 mb-1 bg-dark-light d-flex align-items-center">
                <img src={logo1} style={{ width: "30px", height: "30px", marginRight: "10px", filter: "brightness(0) invert(1)" }} alt="logo" />
                <h3 className="text-center text-white m-0 flex-grow-1">Education Consultancy</h3>
            </div>
            <br />
            <div className="container">
                <div className="register-box">
                    <h2 className="text-center"><u>New User Registration</u></h2>
                    <br />

                    <div className="form-group">
                        <label>User Name: </label>
                        <input
                            className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                            name="username"
                            value={educonUser.username}
                            onChange={onChangeHandler}
                            placeholder="Username"
                        />
                        {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                            name="password"
                            value={educonUser.password}
                            onChange={onChangeHandler}
                            placeholder="Password"
                        />
                        {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                    </div>

                    <div className="form-group">
                        <label>Retype/Confirm Password: </label>
                        <input
                            type="password"
                            className={`form-control ${formErrors.password2 ? 'is-invalid' : ''}`}
                            name="password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        {formErrors.password2 && <div className="invalid-feedback">{formErrors.password2}</div>}
                    </div>

                    <div className="form-group">
                        <label>User Email: </label>
                        <input
                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                            name="email"
                            value={educonUser.email}
                            onChange={onChangeHandler}
                            placeholder="Email"
                        />
                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label>Select Category: </label>
                        <input
                            list="types"
                            className={`form-control ${formErrors.category ? 'is-invalid' : ''}`}
                            name="category"
                            value={educonUser.category}
                            onChange={onChangeHandler}
                            placeholder="Category"
                        />
                        <datalist id="types">
                            <option value="Student" />
                            <option value="Admin" />
                        </datalist>
                        {formErrors.category && <div className="invalid-feedback">{formErrors.category}</div>}
                    </div>

                    <br />
                    <button className='btn btn-primary' onClick={saveNewUser}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
