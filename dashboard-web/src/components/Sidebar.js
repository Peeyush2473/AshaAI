import React from 'react';
import { NavLink } from 'react-router-dom';

// SVG icons are defined as simple functional components for reusability.
// This is a modern and efficient way to handle icons in React without extra libraries.
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const AnalyticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

const ResourcesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

const CampaignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
);


const Sidebar = () => {
  // A mock logout function. In the real app, this would clear authentication tokens.
  const handleLogout = () => {
    console.log("User logged out");
    // navigate('/login'); // This would be handled by your auth context
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/" end>
              <DashboardIcon />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics">
              <AnalyticsIcon />
              <span>Analytics & Trends</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/resources">
              <ResourcesIcon />
              <span>Resource Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/campaigns">
              <CampaignIcon />
              <span>Campaign Planner</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        {/* This section can be built out later to show user info */}
        <div className="user-profile">
          {/* User info here */}
        </div>
        <button onClick={handleLogout} className="sidebar-logout-button">
            <LogoutIcon />
            <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
