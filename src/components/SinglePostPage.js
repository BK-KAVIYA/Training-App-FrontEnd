import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../services/blog-api';
import userApi from '../services/api';
import EditPostModal from './EditPostModal';
import CommentSection from './CommentSection';

const SinglePostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [images, setImages] = useState([]);
    const [author, setAuthor] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        api.getBlogPostById(postId, token)
            .then(postData => {
                setPost(postData);
                return postData.author;
            })
            .then(authorId => {
                setAuthorId(authorId); 
                return userApi.getById(authorId, token);
            })
            .then(authorData => {
                setAuthor(authorData.username);
            })
            .catch(error => {
                console.error('Error fetching post data:', error.message);
            });
    }, [postId]);

    // Fetch images associated with the blog post
    useEffect(() => {
        const token = localStorage.getItem('token');
        api.fetchImagesByPostId(postId, token)
            .then(imageData => {
                setImages(imageData);
            })
            .catch(error => {
                console.error(`Failed to fetch images for post ${postId}:`, error.message);
            });
    }, [postId]);

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleBack = () => {
        navigate(-1);
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
                {/* Render images associated with the post */}
                <div className="flex items-center justify-center">
                    {images.map(image => (
                        <img
                            key={image.id}
                            src={image.name} 
                            alt={image.name}
                            className="mb-4"
                            style={{ maxWidth: '100%', maxHeight: '300px' }}
                        />
                    ))}
                </div>
                <div className="text-gray-700 mb-4">{post.content}</div>
                <p className="text-gray-500">Category: {post.category}</p>
                {(String(author) === localStorage.getItem('username') ||
                    localStorage.getItem('username') === 'admin') && (
                        <div className="mt-4">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => setShowEditModal(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => {}}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                    
                <CommentSection postId={postId} authorId={authorId} />
 
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
