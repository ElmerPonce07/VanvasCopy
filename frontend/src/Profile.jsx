import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import './Profile.css';
import Sidebar from './Sidebar';
import profilePicture from './assets/pfp.png';
import { useAuth } from './context/AuthContext';

/* comment for a change */
const Profile = () => {
    const auth = useAuth();  
    return (
        <div className='profile-page'>
            <div className='profile-container'>

                <div className='profile-header'>
                    <h1>Profile Page</h1>
                    <div className="line-to-do"></div>
                </div>

                <div className='profile-info'>
                    <div className='profile-picture'>
                        <img src={profilePicture} alt="your profile picture" />
                    </div>
                    <div className='profile-account'>
                        <p>Name: {auth.user.userData.firstName + " " + auth.user.userData.lastName}</p>
                        <p>Email: {auth.user.userData.email}</p>
                        <p>Role: {auth.user.role}</p>
                    </div>
                </div>
            </div>
        </div>
            
    );
};

export default Profile;