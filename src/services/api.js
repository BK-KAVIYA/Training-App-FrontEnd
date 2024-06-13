import axios from 'axios';

const API_URL = 'http://localhost:8080/';

const register = (username, email, contactNumber, password,role) => {
    return axios.post(`${API_URL}auth/register`, {
        username,
        email,
        contactNumber,
        password,
        role
    });
};

const login = (username, password) => {
    return axios.post(`${API_URL}auth/login`, {
        username,
        password
    });
};

const getCurrentUser = async (username, token) => {
    try {
        const response = await axios.get(`${API_URL}auth/${username}`, {
            headers: { Authorization: token }
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error; 
    }
};

const getById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}auth/get-by/${id}`, {
            headers: { Authorization: token }
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error; 
    }
};

export default {
    register,
    login,
    getCurrentUser,
    getById
};


