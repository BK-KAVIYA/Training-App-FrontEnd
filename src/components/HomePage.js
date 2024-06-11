import React from 'react';
import { Link } from 'react-router-dom';
import blogImage from '../assets/blog.png'; // Import a blog image

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl text-center transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Welcome to our Blog</h1>
                <img src={blogImage} alt="Blog" className="w-130 mb-8 shadow-md mx-auto" /> {/* Image component */}
                <p className="mb-8 text-lg text-gray-700">Explore a world of ideas, stories, and insights. Dive into captivating articles written by our talented contributors.</p>
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
