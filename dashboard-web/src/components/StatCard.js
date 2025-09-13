import React from 'react';

// Define SVG icons as components for modularity and clarity.
const ScreeningsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 3.5a2.5 2.5 0 0 1 3 3L11 13H8v-3l9.5-6.5z"></path><path d="M12 21H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"></path></svg>
);

const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);

const WardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/></svg>
);

// Map icon names to their respective components for easy dynamic rendering.
const icons = {
  screenings: <ScreeningsIcon />,
  alerts: <AlertIcon />,
  wards: <WardIcon />,
};

/**
 * A reusable card component to display a key statistic.
 * @param {object} props - The component props.
 * @param {string} props.icon - The name of the icon to display ('screenings', 'alerts', 'wards').
 * @param {string} props.title - The title of the statistic (e.g., "Total Screenings").
 * @param {string|number} props.value - The main value of the statistic.
 * @param {string} [props.trend] - An optional trend indicator (e.g., "+5.2%").
 * @param {boolean} [props.isLoading] - If true, displays a loading skeleton.
 */
const StatCard = ({ icon, title, value, trend, isLoading }) => {
  const trendColor = trend && trend.startsWith('+') ? 'trend-positive' : 'trend-negative';

  if (isLoading) {
    return (
      <div className="stat-card loading">
        <div className="card-icon-skeleton"></div>
        <div className="card-content-skeleton">
          <div className="title-skeleton"></div>
          <div className="value-skeleton"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="stat-card">
      <div className={`card-icon-wrapper ${icon}`}>
        {icons[icon] || null}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
        {trend && (
          <span className={`card-trend ${trendColor}`}>{trend}</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
