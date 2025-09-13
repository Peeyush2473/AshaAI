import React from 'react';
import { Line } from 'react-chartjs-2';  // Correct: Direct import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js/auto';  // Correct: Import from 'chart.js/auto' for auto-registration

// Register Chart.js modules (required for v4+)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock Data (from your code, to be replaced with API data)
const mockChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'High-Risk Anemia Cases',
      data: [65, 59, 80, 81, 56, 55, 90],
      fill: true,
      backgroundColor: 'rgba(239, 83, 80, 0.2)', // Light red area
      borderColor: 'rgba(239, 83, 80, 1)', // Dark red line
      tension: 0.4, // Smooth line
      pointBackgroundColor: 'rgba(239, 83, 80, 1)',
      pointBorderColor: '#fff',
      pointHoverRadius: 7,
    },
  ],
};

// Chart Options (from your code)
const chartOptions = {
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
      text: 'Monthly Trend of High-Risk Cases',
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
      grid: { color: '#e0e0e0' },
      ticks: { font: { family: "'Inter', sans-serif" } },
    },
  },
};

const TrendChart = ({ data, options }) => {
  return (
    <div className="chart-container" style={{ height: '400px', width: '100%' }}> {/* Ensure chart renders */}
      <Line data={data || mockChartData} options={options || chartOptions} />
    </div>
  );
};

export default TrendChart;