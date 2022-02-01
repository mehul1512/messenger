import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_ROOT_URL,
});

// local storage token
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//         req.headers.Authorization = `Bearer ${
//             JSON.parse(localStorage.getItem('profile')).token
//         }`;
//     }

//     return req;
// });

export const postLogin = (email, password) =>
    API.post('/auth/login', { email, password });

export const postRegister = (user) => API.post('/auth/register', user);
