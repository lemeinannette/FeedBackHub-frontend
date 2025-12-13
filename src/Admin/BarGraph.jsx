import React from 'react';
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

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({
  title = "Bar Graph",
  labels = [],
  data = [],
  color = 'rgba(14, 165, 233, 0.7)',
  width = 400,       // default width in px
  height = 200,      // default height in px
  className = '',    // optional tailwind/custom classes
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: color,
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // important to allow custom height
    plugins: {
      legend: { display: false },
      title: { display: true, text: title, font: { size: 16 } },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ width: width, height: height }} className={className}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarGraph;
