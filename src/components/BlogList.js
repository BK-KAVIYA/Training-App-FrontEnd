import React, { useEffect, useState } from 'react';
import api from '../services/blog-api';
import CreatePostModal from './CreatePostModal';
import EditPostModal from './EditPostModal'; // Import the EditPostModal component

const BlogList = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editPostData, setEditPostData] = useState(null); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        api.fetchBlogPosts(token)
            .then(blogPostsData => {
                setBlogPosts(blogPostsData);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        api.deleteBlogPost(id, token)
            .then(() => {
                setBlogPosts(blogPosts.filter(post => post.id !== id));
            })
            .catch(error => {
                console.error(error.message);
            });
    };

    const handleEdit = (post) => {
        setEditPostData(post); // Set the data of the post being edited
        setShowCreateForm(true); // Show the edit post modal
    };

    const handleCloseModal = () => {
        setShowCreateForm(false);
        setEditPostData(null); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-4">Blog Post List</h2>
                <div className="flex justify-end w-full mb-4 mr-10"> 
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded" 
                        onClick={() => setShowCreateForm(true)} 
                    >
                        Create Post
                    </button>
                </div>
                {showCreateForm && (
                    editPostData ? ( // Check if there is data for editing
                        <EditPostModal onClose={handleCloseModal} editPostData={editPostData} />
                    ) : (
                        <CreatePostModal onClose={handleCloseModal} />
                    )
                )}
                <div className="flex flex-wrap justify-center">
                    {blogPosts.map(post => (
                        <div key={post.id} className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{post.title}</div>
                                <p className="text-gray-700 text-base">{post.content.substring(0, 100)}...</p>
                            </div>
                            <div className="px-6 py-4 ">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    Author: {post.author}
                                </span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    Category: {post.category}
                                </span>
                                <div className="inline-block">
                                    <button 
                                        className="bg-red-500 text-white px-4 py-2 rounded mt-3" 
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Delete
                                    </button>
                                    <button 
                                        className="bg-yellow-500 text-white px-4 py-2 rounded ml-2 mt-3" 
                                        onClick={() => handleEdit(post)} // Pass the entire post object for editing
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogList;
