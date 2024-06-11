import React, { useState } from 'react';
import api from '../services/blog-api';

const EditPostModal = ({ onClose, editPostData }) => {
    const [title, setTitle] = useState(editPostData ? editPostData.title : '');
    const [content, setContent] = useState(editPostData ? editPostData.content : '');
    const [category, setCategory] = useState(editPostData ? editPostData.category : '');

    const handleSubmit = async () => {
        if (!title || !content || !category) {
            alert('Please fill in all fields.');
            return;
        }

        const token = localStorage.getItem('token');

        const updatedPost = {
            ...editPostData,
            title,
            content,
            category
        };

        try {
            await api.updateBlogPost(editPostData.id, updatedPost, token);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Error editing blog post:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
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
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSubmit}>Save</button>
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;
