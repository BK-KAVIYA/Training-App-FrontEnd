import React, { useEffect, useState } from 'react';
import api from '../services/blog-api';
import userApi from '../services/api';
import CreatePostModal from './CreatePostModal';
import EditPostModal from './EditPostModal';
import { useNavigate } from 'react-router-dom';

const UserBlogList = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [images, setImages] = useState({});
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editPostData, setEditPostData] = useState(null);
    const [authors, setAuthors] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        // Fetch blog posts
        api.fetchBlogPosts(token)
            .then(blogPostsData => {
                setBlogPosts(blogPostsData);
            })
            .catch(error => {
                console.error(error.message);
            });

        // Fetch current user
        userApi.getCurrentUser(username, token)
            .then(userData => {
                setCurrentUser(userData);
            })
            .catch(error => {
                console.error('Failed to fetch current user:', error.message);
            });
    }, []);

    // Fetch authors of blog posts
    useEffect(() => {
        const fetchAuthors = async () => {
            const token = localStorage.getItem('token');
            const authorData = {};
            const fetchAuthorPromises = blogPosts.map(post =>
                userApi.getById(post.author, token)
                    .then(userData => {
                        authorData[post.id] = userData.username;
                    })
                    .catch(error => {
                        console.error(`Failed to fetch author for post ${post.id}:`, error.message);
                    })
            );
            await Promise.all(fetchAuthorPromises);
            setAuthors(authorData);
        };

        if (blogPosts.length > 0) {
            fetchAuthors();
        }
    }, [blogPosts]);

    // Fetch images associated with blog posts
    useEffect(() => {
        const fetchImages = async () => {
            const token = localStorage.getItem('token');
            const imageMap = {};
            const fetchImagePromises = blogPosts.map(post =>
                api.fetchImagesByPostId(post.id, token)
                    .then(imageData => {
                        imageMap[post.id] = imageData;
                    })
                    .catch(error => {
                        console.error(`Failed to fetch images for post ${post.id}:`, error.message);
                    })
            );
            await Promise.all(fetchImagePromises);
            setImages(imageMap);
        };

        if (blogPosts.length > 0) {
            fetchImages();
        }
    }, [blogPosts]);

    // Handle delete post
    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        api.deleteBlogPost(id, token)
            .then(() => {
                // Delete images associated with the post
                api.deleteImagesByPostId(id, token);
                setBlogPosts(blogPosts.filter(post => post.id !== id));
            })
            .catch(error => {
                console.error(error.message);
            });
    };

    // Handle card click to view post details
    const handleCardClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    // Handle edit post
    const handleEdit = (post) => {
        setEditPostData(post);
        setShowCreateForm(true);
    };

    // Close create/edit post modal
    const handleCloseModal = () => {
        setShowCreateForm(false);
        setEditPostData(null);
    };

    // Pagination logic
    const totalPosts = blogPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const currentPosts = blogPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    // Render component
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
                    editPostData ? (
                        <EditPostModal onClose={handleCloseModal} editPostData={editPostData} />
                    ) : (
                        <CreatePostModal onClose={handleCloseModal} />
                    )
                )}
                <div className="flex flex-wrap justify-center">
                    {currentPosts.map(post => (
                        <div
                            key={post.id}
                            className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer"
                            onClick={() => handleCardClick(post.id)}
                        >
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{post.title}</div>
                                {/* Render images associated with the post */}
                                <div className="px-6 py-4">
                                    
                                    {images[post.id] && images[post.id].map(image => (
                                        
                                        <img
                                            key={image.id}
                                            src={image.name}
                                            alt={image.name}
                                            className="mb-4"
                                            style={{ maxWidth: '100%', maxHeight: '300px' }}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-700 text-base">{post.content.substring(0, 200)}...</p>
                            </div>
                            <div className="px-6 py-4">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    Author: {authors[post.id] || 'Loading...'}
                                </span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                                    Category: {post.category}
                                </span>
                                { currentUser && String(currentUser.id) === String(post.author) && (
                                    <div className="inline-block">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded mt-3"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(post.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded ml-2 mt-3"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(post);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserBlogList;
