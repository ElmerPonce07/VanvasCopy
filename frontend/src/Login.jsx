import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from './assets/Vanvas.png';
import { useAuth } from './context/AuthContext';


const Login = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleClick = () => {
        navigate('/register');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if(formData.email !== "" && formData.password !== ""){
            auth.loginAction(formData);
            return;
        }
        alert("please provide a valid input");
    };

    /*
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
        setFormData({
            firstName: '',
            lastName: '',
            studentEmail: '',
            studentPassword: '',
            confirmPassword: '',
            isAdmin: false,
        });
    };
    */

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="studentEmail">Email:</label>
                    <input
                        type="email"
                        id="studentEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="studentPassword">Password:</label>
                    <input
                        type="password"
                        id="studentPassword"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {/*success && <p className="success-message">{success}</p>*/}
                <button type="submit">Login</button>
            </form>
            { <p className="register-link">
                Don't have an account?
                <button onClick={handleClick} className="toggle-button">
                    Register here
                </button>
            </p>}
            
        </div>
    );
};

export default Login;