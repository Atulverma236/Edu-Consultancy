import React, { useState } from 'react';
import logo1 from "../../assets/logo1.png";
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { validateUser } from '../../Services/LoginService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const checkLogin = (e) => {
        e.preventDefault();
        const errors = {};

        if (!username.trim()) {
            errors.username = "Username is mandatory";
        }
        if (!password) {
            errors.password = "Password is mandatory";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            validateUser(username, password).then((response) => {
                let role = String(response.data);
                if (role === "Admin")
                    navigate('/AdminMenu');
                else if (role === "Student")
                    navigate('/StudentMenu');
                else
                    alert("Wrong User ID or Password");
            }).catch(() => {
                alert("Server Error or Invalid Credentials");
            });
        }
    }

    const registerNewUser = () => {
        navigate('/Register');
    }

    return (
        <div>
            <div className="shadow-lg p-2 mb-1 d-flex align-items-center" style={{ backgroundColor: 'rgb(2,0,36)' }}>
                <img src={logo1} style={{ width: "30px", height: "30px", marginRight: "10px", filter: "brightness(0) invert(1)" }} alt="logo" />
                <h3 className="text-center text-white m-0 flex-grow-1">Education Consultancy</h3>
            </div>
            <br />
            <div className="container" style={{ height: "80vh" }}>
                <div className="login-box">
                    <h2 className="text-center">Login here!</h2>
                    <br />
                    <form onSubmit={checkLogin}>
                        <div className="form-group">
                            <label>User Name: </label>
                            <input
                                placeholder="Username"
                                name="username"
                                className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setFormErrors(prev => ({ ...prev, username: '' }));
                                }}
                            />
                            {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                        </div>

                        <br />

                        <div className="form-group">
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setFormErrors(prev => ({ ...prev, password: '' }));
                                }}
                            />
                            {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                        </div>

                        <br />
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </form>

                    <div className="mt-3">
                        <button className='btn btn-info' onClick={registerNewUser}>Register New User</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
