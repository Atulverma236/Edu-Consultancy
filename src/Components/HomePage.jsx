import React, { useState, useEffect } from 'react';
import logo1 from "./../assets/logo1.png";
import Bgimg from './../assets/backimg.png';
import { useNavigate } from 'react-router-dom';
import '../CSS/home.css'


const HomePage = () => {
  
    let navigate = useNavigate();
    const login = () => {
        navigate('/login');
    }



    return (
        <div>
            <div class="shadow-lg p-2 mb-1 bg-dark-light d-flex align-items-center">
                <img src={logo1} style={{ width: "30px", height: "30px", marginRight: "10px", filter: "brightness(0) invert(1)" }} alt="logo" />

                <h3 class="text-center text-white m-0 flex-grow-1">Education Consultancy</h3>
                <button className='btn btn-primary' onClick={login}>Login</button>
            </div>

            <div className='image-container'>
                <img src={Bgimg} style={{ width: "100%", height: "100vh", maxWidth: "100%" }} alt="image not found" />
                
            </div>
            <footer style={{ textAlign: "center", color: "white", padding: "0px" }}>
                <p>&copy; 2025 Educon. All rights reserved.</p>
            </footer>

        </div>

    );
}
export default HomePage;