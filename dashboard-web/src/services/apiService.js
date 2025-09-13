// This file will centralize all API requests to the backend.
// It uses Axios to create an instance with a base URL and an interceptor
// to automatically attach the authentication token to every request.

import axios from 'axios';

// 1. Create an Axios instance
const apiClient = axios.create({
  // The base URL for all API requests.
  // Replace this with your actual deployed Flask backend URL.
  // For example: 'https://your-username.pythonanywhere.com/api'
  baseURL: 'http://localhost:5000/api', // Using localhost for development
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add a request interceptor
// This function will run before every single request is sent from the app.
apiClient.interceptors.request.use(
  (config) => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('authToken');

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Return the modified config object to proceed with the request
    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(error);
  }
);

// 3. Define and export API functions
// We create a function for each specific backend endpoint.
// This makes the code in our components much cleaner.

const apiService = {
  // --- Authentication ---
  login: (credentials) => {
    // credentials will be an object like { email: '...', password: '...' }
    return apiClient.post('/auth/login', credentials);
  },

  // --- Dashboard Data ---
  getDashboardStats: () => {
    return apiClient.get('/dashboard/stats');
  },

  getHeatmapData: (filters) => {
    // filters can be an object like { condition: 'anemia', dateRange: '7d' }
    return apiClient.get('/dashboard/heatmap', { params: filters });
  },

  // --- Analytics Data ---
  getAnalyticsTrends: (filters) => {
    return apiClient.get('/analytics/trends', { params: filters });
  },

  getDemographicData: (filters) => {
    return apiClient.get('/analytics/demographics', { params: filters });
  },

  getDetailedScreenings: (filters) => {
    return apiClient.get('/analytics/screenings', { params: filters });
  },

  // --- Resource Management Data ---
  getWorkerPerformance: () => {
    return apiClient.get('/resources/workers');
  },

  getAiSuggestions: () => {
    return apiClient.get('/resources/suggestions');
  },
};

export default apiService;
