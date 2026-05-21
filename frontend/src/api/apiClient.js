import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and handle FormData
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sivion_admin_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // When sending FormData, let the browser set Content-Type automatically
    // (it needs to add the multipart boundary)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
