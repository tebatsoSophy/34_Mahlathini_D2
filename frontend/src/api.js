// src/api.js
const API_BASE_URL = 'http://localhost:5000'; // Change this if your backend URL differs

export const signup = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Signup failed');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
