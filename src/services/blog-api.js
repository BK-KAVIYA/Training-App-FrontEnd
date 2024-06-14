import axios from 'axios';

const API_URL = 'http://localhost:8080/api/blog-posts'; 
const API_URL_IMAGE = 'http://localhost:8080';

const fetchBlogPosts = async (token) => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: `${token}` }
    });
    return response.data;
};

const getBlogPostById = async (id, token) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `${token}` }
    });
    return response.data;
};

const deleteBlogPost = async (id, token) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `${token}` }
    });
};

const createBlogPost = async (blogPost, token) => {
    const response = await axios.post(API_URL, blogPost, {
        headers: { Authorization: `${token}` }
    });
    return response.data;
};

const updateBlogPost = async (id, blogPost, token) => {
    const response = await axios.put(`${API_URL}/${id}`, blogPost, {
        headers: { Authorization: `${token}` }
    });
    return response.data;
};

export const fetchImagesByPostId = async (postId, token) => {
    try {
      const response = await axios.get(`${API_URL_IMAGE}/api/images/bypost/${postId}`, {
        headers: { Authorization: `${token}` },
      });
      return response.data; 
    } catch (error) {
      throw new Error(`Failed to fetch images for post ${postId}: ${error.message}`);
    }
    };

export default {
    fetchBlogPosts,
    deleteBlogPost,
    createBlogPost,
    updateBlogPost,
    getBlogPostById,
    fetchImagesByPostId
};