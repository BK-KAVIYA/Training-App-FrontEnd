import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

const register = (username, email, contactNumber, password,role) => {
    return axios.post(`${API_URL}/register`, {
        username,
        email,
        contactNumber,
        password,
        role
    });
};

const login = (username, password) => {
    return axios.post(`${API_URL}/login`, {
        username,
        password
    });
};

export default {
    register,
    login
};
