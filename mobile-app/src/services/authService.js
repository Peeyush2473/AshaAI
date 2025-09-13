import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from './apiService';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

const login = async (credentials) => {
  try {
    const response = await apiService.login(credentials);
    if (response.data && response.data.token) {
      await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      return { success: true, user: response.data.user };
    }
    return { success: false, error: 'Invalid response from server' };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Login failed' };
  }
};

const register = async (userData) => {
  try {
    const response = await apiService.register(userData);
    if (response.data && response.data.token) {
      await AsyncStorage.setItem(TOKEN_KEY, response.data.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      return { success: true, user: response.data.user };
    }
    return { success: false, error: 'Invalid response from server' };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || 'Registration failed' };
  }
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

const getUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

const authService = {
  login,
  register,
  logout,
  getToken,
  getUser,
};

export default authService;
