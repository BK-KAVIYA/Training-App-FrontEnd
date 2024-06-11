import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl text-center transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>
                <p className="mb-8 text-lg text-gray-700">Welcome to our blog! We are passionate about sharing knowledge, ideas, and stories with our readers. Our goal is to inspire and inform through engaging content on various topics.</p>
                <p className="mb-8 text-lg text-gray-700">Explore our articles written by talented contributors and join us on our journey of discovery and learning.</p>
                <p className="mb-8 text-lg text-gray-700">At our blog, you'll find a wide range of topics including technology, lifestyle, travel, health, and much more. Whether you're looking for practical tips, insightful analysis, or simply a good read, we've got you covered.</p>
                <p className="mb-8 text-lg text-gray-700">Join our community today and become part of the conversation. Share your thoughts, ask questions, and connect with like-minded individuals who share your interests.</p>
                <div className="flex justify-center space-x-6">
                    <a href="/login" className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg transform transition duration-300">
                        Start Reading
                    </a>
                    <a href="/register" className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 hover:shadow-lg transform transition duration-300">
                        Join Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
