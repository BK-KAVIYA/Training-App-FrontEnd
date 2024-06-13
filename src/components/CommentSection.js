import React, { useState, useEffect } from 'react';
import commentApi from '../services/comment-api';

const CommentSection = ({ postId, authorId }) => {
    const [comments, setComments] = useState([]);
    const [contentc, setContent] = useState('');

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

    const handleAddComment = async (content) => {
        if (!content) {
            alert('Please add a comment.');
            return;
        }
        
        const token = localStorage.getItem('token');

        const newComment = {
            content: content,
            post_id: postId,
            user_id: authorId,
        };

        try {
            const addedComment = await commentApi.addComment(newComment, token);
            setComments([...comments, addedComment]);
            setContent(''); // Clear the textarea after successfully adding comment
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
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
                    value={contentc} // Ensure controlled component
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleAddComment(contentc)}
                >
                    Add Comment
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
