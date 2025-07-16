// frontend/src/api/auth.js

import { apiCall } from './apiClient';

export const registerUser = (data) => apiCall('post', '/auth/register', data);

export const loginUser = async (data) => {
    const res = await apiCall('post', '/auth/login', data);
    if (res.success) {
        localStorage.setItem('authToken', res.data.token); // Save for future
    }
    return res;
};

export const getCurrentUser = () => apiCall('get', '/auth/me');

export const logoutUser = async () => {
    const res = await apiCall('post', '/auth/logout');
    localStorage.removeItem('authToken');
    return res;
};
