import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Update if the backend URL changes
});

export default api;
