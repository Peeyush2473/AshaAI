import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx'; // Fixed path
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import Sidebar from '../components/SideBar.jsx'; // Fixed path
import TrendChart from '../components/TrendChart.jsx'; // Fixed path

// Register the necessary components for Chart.js Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// A reusable layout component for dashboard pages
const DashboardLayout = ({ user, children }) => (
  <div className="dashboard-container">
    <Sidebar user={user} />
    <main className="dashboard-content">
      {children}
    </main>
  </div>
);

// Mock data for the demographic chart
const demographicData = {
  labels: ['0-10 yrs', '11-20 yrs', '21-40 yrs', '41-60 yrs', '60+ yrs'],
  datasets: [
    {
      label: 'High-Risk Cases',
      data: [65, 59, 80, 81, 56],
      backgroundColor: 'rgba(41, 128, 185, 0.6)',
      borderColor: 'rgba(41, 128, 185, 1)',
      borderWidth: 1,
    },
  ],
};

// Enhanced options for the Bar chart
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { family: "'Inter', sans-serif", size: 14 },
        color: '#616161',
      },
    },
    title: {
      display: true,
      text: 'High-Risk Cases by Age Group',
      font: { family: "'Inter', sans-serif", size: 18, weight: '600' },
      color: '#212121',
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: "'Inter', sans-serif" } },
    },
    y: {
      beginAtZero: true,
      grid: { color: '#e0e0e0' },
      ticks: { font: { family: "'Inter', sans-serif" } },
    },
  },
};

// Mock data for the table
const rawScreeningData = [
  { id: 'SCR-001', ward: 'Ward 15', condition: 'Anemia', risk: 'High', date: '2025-09-12', worker: 'Anita Sharma' },
  { id: 'SCR-002', ward: 'Ward 7', condition: 'Malnutrition', risk: 'Medium', date: '2025-09-12', worker: 'Sunita Verma' },
  { id: 'SCR-003', ward: 'Ward 22', condition: 'Anemia', risk: 'Low', date: '2025-09-11', worker: 'Rajesh Kumar' },
  { id: 'SCR-004', ward: 'Ward 15', condition: 'Hypertension', risk: 'High', date: '2025-09-11', worker: 'Anita Sharma' },
  { id: 'SCR-005', ward: 'Ward 5', condition: 'Jaundice', risk: 'Medium', date: '2025-09-10', worker: 'Priya Singh' },
];

const AnalyticsPage = () => {
  const { token, user } = useAuth();
  
  // State for filters - in a real app, this would trigger API calls
  const [filters, setFilters] = useState({
    condition: 'all',
    ward: 'all',
    startDate: '',
    endDate: '',
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // If user is not logged in, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout user={user}>
      <header className="page-header">
        <h1>Analytics & Reporting</h1>
        <p>Deep dive into public health trends and generate reports.</p>
      </header>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="condition">Condition</label>
          <select name="condition" id="condition" value={filters.condition} onChange={handleFilterChange}>
            <option value="all">All Conditions</option>
            <option value="anemia">Anemia</option>
            <option value="malnutrition">Malnutrition</option>
            <option value="jaundice">Jaundice</option>
            <option value="hypertension">Hypertension</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="ward">Ward</label>
          <select name="ward" id="ward" value={filters.ward} onChange={handleFilterChange}>
            <option value="all">All Wards</option>
            <option value="5">Ward 5</option>
            <option value="7">Ward 7</option>
            <option value="15">Ward 15</option>
            <option value="22">Ward 22</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="startDate">Start Date</label>
          <input type="date" name="startDate" id="startDate" value={filters.startDate} onChange={handleFilterChange} />
        </div>
        <div className="filter-group">
          <label htmlFor="endDate">End Date</label>
          <input type="date" name="endDate" id="endDate" value={filters.endDate} onChange={handleFilterChange} />
        </div>
        <button className="btn btn-secondary">Apply Filters</button>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <div className="content-card-header">
            <h2>Cases Over Time</h2>
          </div>
          <div className="chart-container">
            <TrendChart />
          </div>
        </div>
        <div className="content-card">
          <div className="content-card-header">
            <h2>High-Risk Cases by Age Group</h2>
          </div>
          <div className="chart-container">
            <Bar data={demographicData} options={barOptions} />
          </div>
        </div>
      </div>
      
      <div className="content-card full-width">
        <div className="content-card-header">
          <h2>Detailed Screening Data</h2>
          <button className="btn btn-sm">Export as CSV</button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Screening ID</th>
                <th>Ward</th>
                <th>Condition</th>
                <th>Risk Level</th>
                <th>Date</th>
                <th>ASHA Worker</th>
              </tr>
            </thead>
            <tbody>
              {rawScreeningData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.ward}</td>
                  <td>{item.condition}</td>
                  <td><span className={`risk-pill risk-${item.risk.toLowerCase()}`}>{item.risk}</span></td>
                  <td>{item.date}</td>
                  <td>{item.worker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;