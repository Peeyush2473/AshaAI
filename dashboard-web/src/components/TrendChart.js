import React from 'react';

// react-chartjs-2 se component ab window object se aayega
const { Line } = window.ReactChartjs2;

// Chart.js global object se aayega
const { Chart: ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } = window.Chart;

// Chart.js ke zaroori modules ko register karein
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

// --- MOCK DATA (Asli app mein yeh API se aayega) ---
const mockChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'High-Risk Anemia Cases',
      data: [65, 59, 80, 81, 56, 55, 90],
      fill: true,
      backgroundColor: 'rgba(239, 83, 80, 0.2)', // Halka laal area
      borderColor: 'rgba(239, 83, 80, 1)', // Gaadha laal line
      tension: 0.4, // Line ko smooth banane ke liye
      pointBackgroundColor: 'rgba(239, 83, 80, 1)',
      pointBorderColor: '#fff',
      pointHoverRadius: 7,
    },
  ],
};

// --- CHART OPTIONS ---
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
      ticks: { font: { family: "'Inter', sans-serif" } }
    },
    y: {
      grid: { color: '#e0e0e0' },
      ticks: { font: { family: "'Inter', sans-serif" } }
    },
  },
};

const TrendChart = ({ data, options }) => {
  return (
    <div className="chart-container">
      <Line data={data || mockChartData} options={options || chartOptions} />
    </div>
  );
};

export default TrendChart;

