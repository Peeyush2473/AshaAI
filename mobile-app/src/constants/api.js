/**
 * This file contains the base URL for the backend API.
 * Using a centralized file makes it easy to switch between
 * development and production environments.
 */

// =====================================================================================
// IMPORTANT: How to choose the right URL
// =====================================================================================
//
// 1. FOR ANDROID EMULATOR (if your Flask backend is running on the same computer):
//    Use 'http://10.0.2.2:5000/api'. This is a special address that the Android
//    emulator uses to connect to your computer's localhost.
//
// 2. FOR PHYSICAL PHONE (if your phone and computer are on the SAME Wi-Fi):
//    Find your computer's local IP address (e.g., 192.168.1.10) and use that.
//    Example: 'http://192.168.1.10:5000/api'
//
// 3. FOR PRODUCTION (after you deploy your backend to a service like PythonAnywhere):
//    Use your live production URL.
//    Example: 'https://your-username.pythonanywhere.com/api'
//
// =====================================================================================


// --- ACTIVE CONFIGURATION ---
// We will use the Android Emulator address for development.
const API_BASE_URL = 'http://10.0.2.2:5000/api';


// Example for a production URL (commented out)
// const API_BASE_URL = 'https://asha-ai-backend.pythonanywhere.com/api';


export default API_BASE_URL;
