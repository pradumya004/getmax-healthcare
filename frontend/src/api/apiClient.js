// src/api/apiClient.js
import axios from 'axios';

// Base URL from environment or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Inject token into request if available
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // You can customize key
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: handle global response errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('[API ERROR]', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Export raw instance
export default apiClient;

// Optional helper for cleaner use
export const apiCall = async (method, url, data = null, config = {}) => {
    try {
        const response = await apiClient({ method, url, data, ...config });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error:
                error.response?.data?.message ||
                error.response?.data?.error ||
                'Request failed'
        };
    }
};
