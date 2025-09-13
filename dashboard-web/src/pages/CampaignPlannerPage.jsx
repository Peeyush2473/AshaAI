import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar.jsx';

// Mock data simulating what the AI would use or generate
const mockHighRiskWards = ['Ward 5 - Arera Colony', 'Ward 12 - Shahpura', 'Ward 28 - Kolar'];
const mockTargetDemographics = {
  anemia: 'Women (20-40 years)',
  jaundice: 'Newborns (0-1 month)',
  malnutrition: 'Children (1-5 years)',
};

const CampaignPlannerPage = () => {
  const [campaignGoal, setCampaignGoal] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = (e) => {
    e.preventDefault();
    if (!campaignGoal) {
      alert('Please select a campaign goal.');
      return;
    }

    setIsLoading(true);
    setGeneratedPlan(null);

    // Simulate AI processing delay
    setTimeout(() => {
      const plan = {
        goal: campaignGoal,
        targetAudience: mockTargetDemographics[campaignGoal.toLowerCase()] || 'General Population',
        highImpactWards: mockHighRiskWards,
        keyMessage: `Early detection and proper nutrition are key to fighting ${campaignGoal}. Visit your nearest Anganwadi center for free check-ups.`,
        suggestedActivities: [
          { name: 'Door-to-Door Awareness Drive', locations: mockHighRiskWards.join(', '), timeline: 'Weeks 1-2' },
          { name: 'Free Health Check-up Camp', locations: 'Community halls in high-risk wards', timeline: 'Week 3' },
          { name: 'Nutrition & Hygiene Workshop', locations: 'Anganwadi Centers city-wide', timeline: 'Ongoing' },
          { name: 'Poster & Pamphlet Distribution', locations: 'Public spaces, markets, bus stops', timeline: 'Weeks 1-4' },
        ],
      };
      setGeneratedPlan(plan);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        <header className="page-header">
          <h1>AI Campaign Planner</h1>
          <p>Design effective public health campaigns using data-driven insights.</p>
        </header>

        <div className="content-card">
          <div className="content-card-header">
            <h2>Step 1: Define Your Campaign Goal</h2>
          </div>
          <form className="campaign-form" onSubmit={handleGeneratePlan}>
            <div className="filter-group">
              <label htmlFor="campaignGoal">Select a primary health concern:</label>
              <select
                id="campaignGoal"
                value={campaignGoal}
                onChange={(e) => setCampaignGoal(e.target.value)}
              >
                <option value="">-- Select a Goal --</option>
                <option value="Anemia">Anemia Awareness</option>
                <option value="Jaundice">Neonatal Jaundice Prevention</option>
                <option value="Malnutrition">Child Malnutrition Eradication</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Generating Plan...' : 'Generate AI-Powered Plan'}
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="content-card">
            <div className="loading-spinner-container">
              <div className="loading-spinner"></div>
              <p>Analyzing health data and generating strategy...</p>
            </div>
          </div>
        )}

        {generatedPlan && (
          <div className="content-card plan-results">
            <div className="content-card-header">
              <h2>Step 2: Your Generated Campaign Plan</h2>
            </div>
            <div className="plan-grid">
              <div className="plan-detail-card">
                <h3>🎯 Target Audience</h3>
                <p>{generatedPlan.targetAudience}</p>
              </div>
              <div className="plan-detail-card">
                <h3>📍 High-Impact Wards</h3>
                <p>{generatedPlan.highImpactWards.join(', ')}</p>
              </div>
              <div className="plan-detail-card full-width">
                <h3>🔑 Key Message</h3>
                <p>"{generatedPlan.keyMessage}"</p>
              </div>
            </div>

            <h3>Suggested Activities & Timeline</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Locations</th>
                    <th>Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedPlan.suggestedActivities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.name}</td>
                      <td>{activity.locations}</td>
                      <td>{activity.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-secondary" onClick={() => window.print()}>
              Export Plan as PDF
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CampaignPlannerPage;