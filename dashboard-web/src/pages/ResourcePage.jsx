import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import Sidebar from '../components/SideBar.jsx';

// A reusable layout component for dashboard pages
const DashboardLayout = ({ user, children }) => (
    <div className="dashboard-container">
        <Sidebar user={user} />
        <main className="dashboard-content">
            {children}
        </main>
    </div>
);   

// Mock data for ASHA workers
const ashaWorkers = [
    { id: 'AW-01', name: 'Anita Sharma', ward: 'Ward 15', screenings: 102, status: 'Active' },
    { id: 'AW-02', name: 'Sunita Verma', ward: 'Ward 7', screenings: 88, status: 'Active' },
    { id: 'AW-03', name: 'Rajesh Kumar', ward: 'Ward 22', screenings: 75, status: 'Active' },
    { id: 'AW-04', name: 'Priya Singh', ward: 'Ward 5', screenings: 95, status: 'Active' },
    { id: 'AW-05', name: 'Meena Gupta', ward: 'Ward 11', screenings: 43, status: 'Inactive' },
];

// Mock data for AI-driven suggestions
const aiSuggestions = [
    { id: 'SUG-01', title: 'Deploy Health Camp', details: 'High concentration of Anemia cases detected in Ward 15. Recommend deploying a mobile health camp this weekend.', priority: 'High' },
    { id: 'SUG-02', title: 'Distribute Supplements', details: 'Malnutrition risk is increasing in Ward 7. Suggest immediate distribution of iron and folic acid supplements.', priority: 'Medium' },
    { id: 'SUG-03', title: 'ASHA Training', details: 'Worker AW-05 has low activity. Recommend a follow-up or retraining session.', priority: 'Low' },
];


const ResourcePage = () => {
    const { token, user } = useAuth();

    // If user is not logged in, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <DashboardLayout user={user}>
            <header className="page-header">
                <h1>Resource Management</h1>
                <p>Monitor ASHA worker performance and deploy resources effectively.</p>
            </header>

            <div className="content-grid">
                {/* AI Suggestions Section */}
                <div className="content-card full-width">
                    <div className="content-card-header">
                        <h2>AI-Powered Suggestions</h2>
                    </div>
                    <div className="suggestions-container">
                        {aiSuggestions.map(suggestion => (
                            <div key={suggestion.id} className={`suggestion-card priority-${suggestion.priority.toLowerCase()}`}>
                                <div className="suggestion-header">
                                    <h3>{suggestion.title}</h3>
                                    <span className="priority-pill">{suggestion.priority} Priority</span>
                                </div>
                                <p>{suggestion.details}</p>
                                <div className="suggestion-actions">
                                    <button className="btn btn-sm btn-secondary">Dismiss</button>
                                    <button className="btn btn-sm">Take Action</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ASHA Workers Table */}
                <div className="content-card full-width">
                    <div className="content-card-header">
                        <h2>ASHA Worker Performance</h2>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Worker ID</th>
                                    <th>Name</th>
                                    <th>Assigned Ward</th>
                                    <th>Screenings (Last 30 Days)</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ashaWorkers.map(worker => (
                                    <tr key={worker.id}>
                                        <td>{worker.id}</td>
                                        <td>{worker.name}</td>
                                        <td>{worker.ward}</td>
                                        <td>{worker.screenings}</td>
                                        <td><span className={`status-pill status-${worker.status.toLowerCase()}`}>{worker.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ResourcePage;
