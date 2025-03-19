import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
