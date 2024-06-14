import React, { useState, useEffect } from 'react';
import api from '../services/blog-api';

const EditPostModal = ({ onClose, editPostData }) => {
    const [title, setTitle] = useState(editPostData ? editPostData.title : '');
    const [content, setContent] = useState(editPostData ? editPostData.content : '');
    const [category, setCategory] = useState(editPostData ? editPostData.category : '');
    const [currentImage, setCurrentImage] = useState(null);
    const [newImage, setNewImage] = useState(null); // State for new image file

    useEffect(() => {
        // Fetch images associated with the current post
        const fetchImages = async () => {
            try {
                const token = localStorage.getItem('token');
                const images = await api.fetchImagesByPostId(editPostData.id, token);
                if (images.length > 0) {
                    setCurrentImage(images[0].name); // Assuming you want to display the first image
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        if (editPostData) {
            fetchImages();
        }
    }, [editPostData]);

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
            category,
        };

        try {
            // Update the post details
            await api.updateBlogPost(editPostData.id, updatedPost, token);

            // If a new image is selected, upload it
            if (newImage) {
                const formData = new FormData();
                formData.append('image', newImage);
                formData.append('postId', editPostData.id);

                await api.updateImage(formData, token);
            }

            onClose();
            window.location.reload(); // Refresh the page or update state to reflect changes
        } catch (error) {
            console.error('Error editing blog post:', error);
        }
    };

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setNewImage(e.target.files[0]); // Update the newImage state with the selected file
        const url = URL.createObjectURL(e.target.files[0]);
        console.log(url);
        setCurrentImage(url); // Display the preview of the selected image
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 overflow-y-auto pt-40">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-10">
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
                {currentImage && (
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Current Image</label>
                        <img src={currentImage} alt="Current" className="w-full max-h-48 object-contain mb-2" />
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="image" className="block font-bold mb-2">Change Image</label>
                    <input type="file" id="image" className="w-full border border-gray-300 rounded px-4 py-2" onChange={handleImageChange} />
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
