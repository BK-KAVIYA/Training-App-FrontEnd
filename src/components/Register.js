import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    
    const handleRegister = (e) => {
        e.preventDefault();

        // Validation checks
        if (!username.trim() || !email.trim() || !contactNumber.trim() || !password.trim() || !reEnterPassword.trim()) {
            alert('Please fill in all fields');
            return;
        }
        if (password !== reEnterPassword) {
            alert('Passwords do not match');
            return;
        }

        // Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (role===""){
            setRole('USER');
        }

        api.register(username, email, contactNumber, password, role)
            .then(response => {
                console.log(response.data);
                alert('Registration successful');
                navigate('/login');
            })
            .catch(error => {
                console.error(error);
                alert('Registration failed');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contact Number</label>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Re-enter Password</label>
                        <input
                            type="password"
                            value={reEnterPassword}
                            onChange={(e) => setReEnterPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
