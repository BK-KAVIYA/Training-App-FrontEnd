import React, { useState, useEffect } from 'react';
import commentApi from '../services/comment-api';

const CommentSection = ({ postId, author }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
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
            const token = localStorage.getItem('token');
            const comment = await commentApi.getCommentById(commentId, token);

            const editedContent = prompt('Edit comment:', comment.content);

            if (editedContent !== null) {
                const updatedComment = {
                    ...comment,
                    content: editedContent
                };

                await commentApi.updateComment(commentId, updatedComment, token);

                setComments(comments.map(c => c.id === commentId ? { ...c, content: editedContent } : c));
            }
        } catch (error) {
            console.error('Error editing comment:', error.message);
        }
    };

    //Need To be Fixed
    const handleAddComment = (content) => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        commentApi.addComment(postId, content, username, token)
            .then(newComment => {
                setComments([...comments, newComment]);
            })
            .catch(error => {
                console.error('Error adding comment:', error.message);
            });
    };

    return (
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
        </div>
    );
};

export default CommentSection;
