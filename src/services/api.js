import axios from 'axios';

const API_BASE_URL = 'http://192.168.10.49:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    header: {
        'Content-Type': 'application/json'
    }
});

export default api;