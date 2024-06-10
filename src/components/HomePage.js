import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl text-center transform transition duration-500 hover:scale-105">
                <h1 className="text-5xl font-extrabold mb-8 text-gray-800">Student Management System</h1>
                <p className="mb-8 text-lg text-gray-700">Welcome to the Student Management System. Please log in or register to continue.</p>
                <div className="flex justify-center space-x-6">
                    <Link to="/login" className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transform transition duration-300">
                        Login
                    </Link>
                    <Link to="/register" className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-lg transform transition duration-300">
                        Register
                    </Link>
                    <Link to="/about" className="bg-gray-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-gray-600 hover:shadow-lg transform transition duration-300">
                        About
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
