import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../services/blog-api';
import userApi from '../services/api';
import EditPostModal from './EditPostModal';

const SinglePostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        api.getBlogPostById(postId, token)
            .then(postData => {
                setPost(postData);
                return postData.author;
            })
            .then(authorId => {
                return userApi.getById(authorId, token);
            })
            .then(authorData => {
                setAuthor(authorData.username);
            })
            .catch(error => {
                console.error('Error fetching post data:', error.message);
            });

        // userApi.getCurrentUser(token)
        //     .then(userData => {
        //         setCurrentUser(userData);
        //     })
        //     .catch(error => {
        //         console.error('Failed to fetch current user:', error.message);
        //     });
    }, [postId]);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        api.deleteBlogPost(postId, token)
            .then(() => {
                navigate('/'); // Redirect to the blog list page after deletion
            })
            .catch(error => {
                console.error('Failed to delete post:', error.message);
            });
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <button
                    className="text-blue-500 mb-4"
                    onClick={handleBack}
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-700 mb-4">Author: {author}</p>
                <div className="text-gray-700 mb-4">{post.content}</div>
                <p className="text-gray-500">Category: {post.category}</p>
                {String(author) === localStorage.getItem('username') ||
               localStorage.getItem('username') === 'admin' && (
                    <div className="mt-4">
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                )}
                {showEditModal && (
                    <EditPostModal
                        onClose={handleCloseModal}
                        editPostData={post}
                    />
                )}
            </div>
        </div>
    );
};

export default SinglePostPage;
