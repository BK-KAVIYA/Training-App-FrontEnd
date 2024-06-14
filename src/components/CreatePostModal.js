import React, { useEffect, useState } from 'react';
import api from '../services/blog-api';
import userApi from '../services/api';

const CreatePostModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null); 
    const username = localStorage.getItem('username');

    useEffect(() => {
        const token = localStorage.getItem('token');
        userApi.getCurrentUser(username, token)
            .then(userData => {
                setAuthor(userData.id);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, [username]);

    const handleSubmit = async () => {
        if (!title || !content || !category) {
            alert('Please fill in all fields.');
            return;
        }

        const token = localStorage.getItem('token');

        const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
        const newPost = {
            title,
            author,
            content,
            category,
            publisheddate: currentDate
        };

        const createdPost = await api.createBlogPost(newPost, token);

        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('postId', createdPost.id);

            await api.uploadImage(formData, token);
        }

        onClose();
        window.location.reload();
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block font-bold mb-2">Title</label>
                    <input type="text" id="title" className="w-full border border-gray-300 rounded px-4 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block font-bold mb-2">Content</label>
                    <textarea id="content" rows="5" className="w-full border border-gray-300 rounded px-4 py-2" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block font-bold mb-2">Category</label>
                    <input type="text" id="category" className="w-full border border-gray-300 rounded px-4 py-2" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block font-bold mb-2">Upload Image</label>
                    <input type="file" id="image" className="w-full border border-gray-300 rounded px-4 py-2" onChange={handleImageChange} />
                </div>
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSubmit}>Create</button>
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
