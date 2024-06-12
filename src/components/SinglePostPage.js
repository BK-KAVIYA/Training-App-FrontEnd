import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import api from '../services/blog-api';
import userApi from '../services/api';
import commentApi from '../services/comment-api';
import EditPostModal from './EditPostModal';

const SinglePostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState('');
    const [comments, setComments] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [updateComment, setUpdateComment] = useState(null);
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

        commentApi.getCommentsForPost(postId, token)
            .then(commentData => {
                setComments(commentData);
            })
            .catch(error => {
                console.error('Error fetching comments:', error.message);
            });

    }, [postId]);

    const handleDelete = (commentId) => {
        const token = localStorage.getItem('token');
        commentApi.deleteComment(commentId, token)
            .then(() => {
                setComments(comments.filter(comment => comment.id !== commentId));
            })
            .catch(error => {
                console.error('Failed to delete comment:', error.message);
            });
    };

    const handleEdit = async (commentId) => {
        try {
            // Retrieve the comment data from the backend using the commentId
            const token = localStorage.getItem('token');
            const comment = await commentApi.getCommentById(commentId, token);

            // Prompt the user to edit the comment content
            const editedContent = prompt('Edit comment:', comment.content);

            // If the user cancels or does not provide new content, exit the function
            if (editedContent !== null) {
                // Update only the content of the comment
                const updatedComment = {
                    ...comment,
                    content: editedContent
                };

                console.log('Updated comment:', updatedComment);
                // Send a request to the backend to update the comment with the new content
                await commentApi.updateComment(commentId, updatedComment, token);

                // Update the UI to reflect the changes made to the comment
                setComments(comments.map(c => c.id === commentId ? { ...c, content: editedContent } : c));
            }
        } catch (error) {
            console.error('Error editing comment:', error.message);
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddComment = (content) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        commentApi.addCommentToPost(postId, content, userId, token)
            .then(newComment => {
                setComments([...comments, newComment]);
            })
            .catch(error => {
                console.error('Error adding comment:', error.message);
            });
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
                <div>
                    <h2 className="text-xl font-semibold mb-2">Comments:</h2>
                    {comments.map(comment => (
                <div key={comment.id} className="mb-4 p-4 bg-white shadow-md rounded-lg">
                    <p className="text-gray-700 text-lg mb-2">{comment.user.username}</p>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <p className="text-gray-500 mb-4">Posted at: {comment.createdAt}</p>
                    {String(comment.user.username) === localStorage.getItem('username') && (
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => handleEdit(comment.id)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(comment.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
                </div>
                <div>
                    <textarea 
                        className="w-full border rounded-md p-2 mb-4" 
                        rows="4" 
                        placeholder="Add a new comment..." 
                    />
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded" 
                        onClick={handleAddComment}
                    >
                        Add Comment
                    </button>
                </div>
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
