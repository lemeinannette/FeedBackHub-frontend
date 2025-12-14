import React, { useEffect, useState } from 'react';
import AdminNavBar from './AdminNavBar';
import Footer from '../components/Footer'; // Footer component
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/feedbacks')
      .then(res => res.json())
      .then(data => setFeedbacks(data || []))
      .catch(err => console.error('Error fetching feedbacks:', err));
  }, []);

  const barData = {
    labels: feedbacks.map(fb => fb.event) || [],
    datasets: [
      {
        label: 'Overall Rating',
        data: feedbacks.map(fb => fb.rating_overall) || [],
        backgroundColor: 'rgba(14, 165, 233, 0.6)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Positive (>=4★)', 'Neutral (<4★)'],
    datasets: [
      {
        label: 'Sentiment',
        data: [
          feedbacks.filter(fb => fb.rating_overall >= 4).length || 0,
          feedbacks.filter(fb => fb.rating_overall < 4).length || 0
        ],
        backgroundColor: ['#06b6d4', '#facc15'],
        hoverOffset: 8
      }
    ]
  };

  return (
    <div className='flex w-full'>

      {/* Sidebar */}
      <div className='fixed h-[530px] top-0 left-0 w-[200px] mt-4 ml-5 rounded-lg shadow-md overflow-y-auto'>
        <AdminNavBar />
      </div>

      {/* Main content */}
      <div className='ml-[245px] flex flex-col w-full items-center justify-start overflow-y-auto pt-7 min-h-screen'>

        {/* Page Header */}
        <div className='flex w-[950px] bg-gradient-to-r from-cyan-400 to-teal-600 p-3 h-[80px] mb-10 rounded-xl flex-col items-center justify-center'>
          <h1 className='text-white text-2xl font-bold text-center'>
            Analytics Dashboard
          </h1>
          <p className='text-gray-200 text-[12px] mt-2 text-center font-semibold'>
            Overview of event ratings and sentiment analysis
          </p>
        </div>

        {/* Charts Grid */}
        <div className='grid grid-cols-2 gap-5 mt-10 mb-6 w-[950px]'>

          {/* Bar Chart */}
          <div className='shadow-md p-5 rounded-lg'>
            <h2 className='text-gray-700 font-semibold mb-3 text-center'>Bar Chart: Event Ratings</h2>
            <Bar data={barData} height={200} />
          </div>

          {/* Doughnut Chart */}
          <div className='shadow-md p-5 rounded-lg'>
            <h2 className='text-gray-700 font-semibold mb-3 text-center'>Doughnut Chart: Sentiment</h2>
            <Doughnut data={doughnutData} height={200} />
          </div>

        </div>

        {/* Footer aligned with main content */}
        <div className='w-[950px] mt-10'>
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default Analytics;
