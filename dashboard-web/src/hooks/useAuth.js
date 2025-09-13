import { useState, createContext, useContext, useEffect } from 'react';

// Ek context banayein jo authentication state ko poore app mein share karega
const AuthContext = createContext(null);

// AuthProvider component banayein jo saare child components ko auth state dega
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User ki jaankari (e.g., name, role)
  const [token, setToken] = useState(localStorage.getItem('authToken') || null); // Auth token
  const [loading, setLoading] = useState(false); // Login process ke liye loading state
  const [error, setError] = useState(null); // Login error handle karne ke liye

  // Jab app load ho, to local storage se token check karein
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Asli app mein, aap is token ko validate karne ke liye API call kar sakte hain
      // aur user details fetch kar sakte hain. Abhi ke liye, hum ek dummy user set kar rahe hain.
      setUser({ name: 'BMC Official', role: 'Admin' });
      setToken(storedToken);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Yahan aap apne backend API ko call karenge
      // Abhi ke liye, hum ek dummy login process simulate kar rahe hain
      console.log('Logging in with:', { email, password });
      
      // 1 second ka delay simulate karein
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dummy response
      if (email === 'admin@bmc.gov.in' && password === 'password') {
        const fakeToken = 'dummy-jwt-token-12345';
        const fakeUser = { name: 'Dr. Sharma', role: 'Admin' };

        localStorage.setItem('authToken', fakeToken); // Token ko local storage mein save karein
        setToken(fakeToken);
        setUser(fakeUser);
        return true; // Login safal
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      return false; // Login asaphal
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken'); // Local storage se token hatayein
  };

  // Context ki value tayyar karein
  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook banayein taaki components aasani se context ka istemal kar sakein
export const useAuth = () => {
  return useContext(AuthContext);
};
