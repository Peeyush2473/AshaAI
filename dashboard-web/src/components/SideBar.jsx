// import React from 'react';
// import { NavLink } from 'react-router-dom';

// // SVG icons are defined as simple functional components for reusability.
// // This is a modern and efficient way to handle icons in React without extra libraries.
// const DashboardIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
// );

// const AnalyticsIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
// );

// const ResourcesIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
// );

// const CampaignIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon><line x1="3" y1="22" x2="21" y2="22"></line></svg>
// );

// const LogoutIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
// );


// const Sidebar = () => {
//   // A mock logout function. In the real app, this would clear authentication tokens.
//   const handleLogout = () => {
//     console.log("User logged out");
//     // navigate('/login'); // This would be handled by your auth context
//   };

//   return (
//     <aside className="sidebar">
//       <nav>
//         <ul className="sidebar-nav">
//           <li>
//             <NavLink to="/" end>
//               <DashboardIcon />
//               <span>Dashboard</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/analytics">
//               <AnalyticsIcon />
//               <span>Analytics & Trends</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/resources">
//               <ResourcesIcon />
//               <span>Resource Management</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/campaigns">
//               <CampaignIcon />
//               <span>Campaign Planner</span>
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
      
//       <div className="sidebar-footer">
//         {/* This section can be built out later to show user info */}
//         <div className="user-profile">
//           {/* User info here */}
//         </div>
//         <button onClick={handleLogout} className="sidebar-logout-button">
//             <LogoutIcon />
//             <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;



import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// SVG icons are defined as simple functional components for reusability.
// This is a modern and efficient way to handle icons in React without extra libraries.
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const AnalyticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const ResourcesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CampaignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
    <line x1="3" y1="22" x2="21" y2="22"></line>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

// Theme toggle icons
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const Sidebar = () => {
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // A mock logout function. In the real app, this would clear authentication tokens.
  const handleLogout = () => {
    console.log("User logged out");
    // navigate('/login'); // This would be handled by your auth context
  };

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <div className="logo-icon">A</div>
        <div className="logo-text">Asha AI</div>
      </div>

      {/* Navigation */}
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

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-button"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        {/* User Profile Section */}
        <div className="user-profile">
          {/* User info can be added here later */}
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="sidebar-logout-button">
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;