import React from 'react';

const StudentProfile = () => {
    const student = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contactNumber: '123-456-7890',
        address: '123 Main St, City, Country'
        // Add more fields as needed
    };

    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Student Profile</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <p className="text-gray-800">{student.name}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <p className="text-gray-800">{student.email}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Contact Number</label>
                <p className="text-gray-800">{student.contactNumber}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <p className="text-gray-800">{student.address}</p>
            </div>
            {/* Add more fields as needed */}
        </div>
    );
};

export default StudentProfile;
