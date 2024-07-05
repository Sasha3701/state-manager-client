import axios from "axios";

export const urls = {
    users: {
        get: 'users',
    },
    user: {
        patch: 'users'
    },
    error: {
        get: 'error',
    }
};

export const api = axios.create({
    baseURL: 'http://localhost:3000/',
});