import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const commentApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchComments = async () => {
  try {
    const response = await commentApi.get('/comments');
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const getCommentsForPost = async (postId, token) => {
  try {
    const response = await commentApi.get(`/comments/post/${postId}`, {
      headers: { Authorization: `${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments for post:', error);
    throw error;
  }
};

export const addComment = async (commentData) => {
  try {
    const response = await commentApi.post('/comments', commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await commentApi.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const getCommentById = async (commentId) => {
  try {
    const response = await commentApi.get(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment by ID:', error);
    throw error;
  }
};

export const updateComment = async (commentId, updatedContent, token) => {
  try {
    const response = await commentApi.put(`/comments/${commentId}`, updatedContent ,
      { headers: { Authorization: `${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};


export default {
  fetchComments,
  deleteComment,
  addComment,
  getCommentsForPost,
  getCommentById,
  updateComment,
};
