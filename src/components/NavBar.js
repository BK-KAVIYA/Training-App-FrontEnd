import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="w-full bg-white shadow p-4">
            <ul className="flex justify-center space-x-4">
                <li>
                    <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                </li>
                <li>
                    <Link to="/about" className="text-blue-500 hover:underline">About</Link>
                </li>
                {!isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                        </li>
                        <li>
                            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
                    </li>
                )}
                
            </ul>
        </nav>
    );
};

export default NavBar;
