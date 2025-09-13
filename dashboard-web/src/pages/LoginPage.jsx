import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Logo ke liye ek chhota sa SVG component
const AshaAILogo = () => (
    <svg width="48" height="48" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="64" fill="url(#paint0_linear_1_2)"/>
        <path d="M48.2827 101.889L25.6055 64.0001L48.2827 26.1112H93.125L70.4478 64.0001L93.125 101.889H48.2827Z" fill="white" fillOpacity="0.9"/>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="64" y1="0" x2="64" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2E7D32"/>
                <stop offset="1" stopColor="#004D40"/>
            </linearGradient>
        </defs>
    </svg>
);


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, loading, error, token } = useAuth();

  // Agar user pehle se logged in hai, to usse dashboard par bhej dein
  if (token) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dummy credentials ko check karein
    const success = await login(email, password);
    if (success) {
      navigate('/'); // Safal login par dashboard par redirect karein
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-branding-panel">
        <div className="branding-content">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="National Emblem of India" className="emblem-img" />
            <h1>ASHA-AI</h1>
            <p className="branding-subtitle">Public Health Dashboard</p>
            <p className="branding-authority">Bhopal Municipal Corporation</p>
            <p className="branding-footer">Government of Madhya Pradesh</p>
        </div>
      </div>
      <div className="login-form-panel">
        <div className="login-form-container">
          <div className="login-header">
            <AshaAILogo />
            <h2>Dashboard Login</h2>
            <p>Please enter your official credentials to access the dashboard.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., official@bmc.gov.in"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.g. target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

