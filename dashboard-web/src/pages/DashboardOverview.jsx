import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Sidebar from '../components/SideBar';
import StatCard from '../components/StatCard';
import Heatmap from '../components/Heatmap';
import TrendChart from '../components/TrendChart';

// Ek component jo layout ko manage karega
const DashboardLayout = ({ user, children }) => (
    <div className="dashboard-container">
        <Sidebar user={user} />
        <main className="dashboard-content">
            {children}
        </main>
    </div>
);

const DashboardOverview = () => {
    const { token, user } = useAuth();
    const [stats, setStats] = useState({ screenings: null, alerts: null, wards: null });
    const [loading, setLoading] = useState(true);

    // Jab component load ho, to data fetch karne ka simulation
    useEffect(() => {
        const fetchStats = async () => {
            // API call simulate karein
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            setStats({
                screenings: { value: '1,284', trend: '+12.5%' },
                alerts: { value: '72', trend: '-3.1%' },
                wards: { value: 'Ward 15' }
            });
            setLoading(false);
        };
        
        fetchStats();
    }, []);

    // Agar user logged in nahi hai, to usse login page par bhej dein
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <DashboardLayout user={user}>
            <header className="page-header">
                <h1>Dashboard Overview</h1>
                <p>Real-time public health metrics for Bhopal.</p>
            </header>

            <div className="stats-grid">
                <StatCard 
                    isLoading={loading}
                    icon="screenings" 
                    title="Total Screenings (Today)" 
                    value={stats.screenings?.value} 
                    trend={stats.screenings?.trend} 
                />
                <StatCard 
                    isLoading={loading}
                    icon="alerts" 
                    title="High-Risk Cases Identified" 
                    value={stats.alerts?.value} 
                    trend={stats.alerts?.trend}
                />
                <StatCard 
                    isLoading={loading}
                    icon="wards" 
                    title="Most Active Ward" 
                    value={stats.wards?.value}
                />
            </div>

            <div className="content-grid">
                <div className="content-card full-width">
                     <div className="content-card-header">
                        <h2>Health Risk Heatmap</h2>
                    </div>
                    <Heatmap />
                </div>
                <div className="content-card">
                    <div className="content-card-header">
                        <h2>Monthly Trends</h2>
                    </div>
                    <TrendChart />
                </div>
                 <div className="content-card">
                    <div className="content-card-header">
                        <h2>Recent Alerts</h2>
                    </div>
                    {/* Yahan aap alerts ki list dikha sakte hain */}
                    <p style={{textAlign: 'center', padding: '20px'}}>No new alerts.</p>
                </div>
                
            </div>
        </DashboardLayout>
    );
};

export default DashboardOverview;
