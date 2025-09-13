import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../constants/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const login = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};

const syncScreenings = (screenings) => {
  return apiClient.post('/screenings/sync', { screenings });
};

const apiService = {
  login,
  register,
  syncScreenings,
};

export default apiService;
