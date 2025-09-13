import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom';

// Import the AuthProvider and the useAuth hook
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';

// Import all the page components
import LoginPage from './pages/LoginPage.jsx';
import DashboardOverview from './pages/DashboardOverview.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import ResourcePage from './pages/ResourcePage.jsx';

/**
 * @component ProtectedRoute
 * A wrapper component that checks for user authentication.
 * If the user is logged in, it renders the child components (the protected pages).
 * If not, it redirects the user to the login page.
 */
const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  // Show a loading indicator while the auth state is being determined
  // This prevents a flicker effect on page load
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  // If there's no token, redirect to the login page
  // The `replace` prop is used to prevent the user from going back to the protected page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the requested page
  // The <Outlet /> component renders the matched child route component
  return <Outlet />;
};

/**
 * @component App
 * The main component that sets up the entire application's routing.
 * It wraps all routes with the AuthProvider to make auth state available globally.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route: Anyone can access the login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes: Only authenticated users can access these */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/resources" element={<ResourcePage />} />
            {/* Add other protected routes like /campaigns here in the future */}
          </Route>

          {/* Fallback Route: Redirect any other path to the dashboard if logged in, or login if not */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

