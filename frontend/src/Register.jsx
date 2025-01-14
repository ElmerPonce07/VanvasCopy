import React, { useState, useEffect } from 'react';
import './Login.css';
import logo from './assets/Vanvas.png';
import { useNavigate } from 'react-router-dom';
/* comment for a change */
const Register = () => {
    const navigate = useNavigate();
    
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        studentEmail: '',
        studentPassword: '',
        confirmPassword: '',
        isAdmin: false,
    });

    useEffect(() => {
        console.log(admin);
        if (registered) {
          navigate('/login');
        }
    },[registered])

    const handleClick = () => {
        navigate('/login');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAdmin(checked);
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        console.log(admin)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!admin){
            try{
                if (formData.studentPassword !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }
    
                const response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        teacherEmail: formData.studentEmail,
                        teacherPassword: formData.studentPassword,
                        isAdmin: false,
                    }),
                });
                
                setRegistered(true);
            }
            catch(err){
                setError(err.message || 'An unexpected error occurred');
                console.error('API error:', err);
            }
        }
        else{
            try {
                if (formData.studentPassword !== formData.confirmPassword) {
                    setError('Passwords do not match');
                    return;
                }
    
                const response = await fetch('http://localhost:8080/api/students/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        studentEmail: formData.studentEmail,
                        studentPassword: formData.studentPassword,
                        isAdmin: false,
                    }),
                });
                
                if(!response.ok){
                    throw new Error("Not a student account");
                }
    
                setRegistered(true);
                /*
                if (!response.ok) {
                    const contentType = response.headers.get('content-type');
                    const errorMessage = contentType && contentType.includes('application/json')
                        ? (await response.json()).message || 'An error occurred'
                        : await response.text();
                    throw new Error(errorMessage);
                }
    
                const data = await response.json();
                */
    
                //setSuccess(isLogin ? 'Login successful!' : 'Registration successful!');
                //console.log('Success:', data);
            } catch (err) {
                setError(err.message || 'An unexpected error occurred');
                console.error('API error:', err);
            }
        }
        
    };

    

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="studentEmail">Email:</label>
                    <input
                        type="email"
                        id="studentEmail"
                        name="studentEmail"
                        value={formData.studentEmail}
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
                        name="studentPassword"
                        value={formData.studentPassword}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="isAdmin">
                        <input
                            type="checkbox"
                            id="isAdmin"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={handleChange}
                        />
                        Admin
                    </label>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Register</button>
            </form>
            <p className="register-link">Already have an account?
                <button onClick={handleClick} className="toggle-button">
                    Login here
                </button>
            </p>
        </div>
    );
};

export default Register;