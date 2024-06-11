import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-blue-800 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-white font-bold text-xl">My Blog</Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                <Link to="/about" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/register" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                                    <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                </>
                            ) : (
                                <button onClick={handleLogout} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
