import React, { useEffect, useState } from 'react';
import { LuMessageCircleMore } from "react-icons/lu";
import { FaRegStar, FaThumbsUp, FaRegSmile } from "react-icons/fa";
import AdminNavBar from './AdminNavBar';
import { Pie } from 'react-chartjs-2';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [metrics, setMetrics] = useState({
    averageRating: 0,
    recommendRate: 0,
    positiveSentiment: 0,
    totalFeedbacks: 0
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5555/feedbacks')
      .then(res => res.json())
      .then(data => {
        setFeedbacks(data || []);

        const total = data?.length || 0;

        const averageRating =
          total > 0
            ? (data.reduce((acc, fb) => acc + fb.rating_overall, 0) / total).toFixed(1)
            : 0;

        const recommendRate =
          total > 0
            ? ((data.filter(fb => fb.recommend === "yes").length / total) * 100).toFixed(1)
            : 0;

        const positiveSentiment =
          total > 0
            ? ((data.filter(fb => fb.rating_overall >= 4).length / total) * 100).toFixed(1)
            : 0;

        setMetrics({
          averageRating,
          recommendRate,
          positiveSentiment,
          totalFeedbacks: total
        });
      })
      .catch(err => console.error('Error fetching feedbacks:', err));
  }, []);

  // Pie chart data
  const pieData = {
    labels: ['Recommend Yes', 'Recommend No'],
    datasets: [
      {
        label: 'Recommendation',
        data: [
          feedbacks?.filter(fb => fb.recommend === "yes").length || 0,
          feedbacks?.filter(fb => fb.recommend === "no").length || 0
        ],
        backgroundColor: ['#22c55e', '#f87171'],
        hoverOffset: 8
      },
    ],
  };

  return (
    <div className='flex h-screen w-full'>
      {/* Sidebar */}
      <div className='fixed h-[530px] top-0 left-0 w-[200px] mt-4 ml-5 rounded-lg shadow-md overflow-y-auto'>
        <AdminNavBar />
      </div>

      {/* Main content */}
      <div className='ml-[245px] flex flex-col w-full items-center justify-start overflow-y-auto pt-7'>

        {/* Page Header */}
        <div className='flex w-[950px] bg-gradient-to-r from-cyan-400 to-teal-600 p-3 h-[200px] mb-10 rounded-xl flex-col items-center justify-center'>
          <h1 className='text-white text-2xl font-bold text-center'>
            Feedback Analytics
          </h1>
          <p className='text-gray-200 text-[12px] mt-2 text-center font-semibold'>
            Monitor and analyze customer feedback to improve your services
          </p>
        </div>

        {/* Metrics Cards */}
        <div className='grid grid-cols-4 gap-5 items-center justify-center mt-2 w-[950px]'>
          <Card icon={<LuMessageCircleMore size={20} color='white' />} value={metrics.averageRating} label="Average Rating" />
          <Card icon={<FaRegStar size={25} color='white' />} value={`${metrics.recommendRate}%`} label="Recommend Rate" />
          <Card icon={<FaThumbsUp size={20} color='white' />} value={`${metrics.positiveSentiment}%`} label="Positive Sentiment" />
          <Card icon={<FaRegSmile size={20} color='white' />} value={metrics.totalFeedbacks} label="Total Feedbacks" />
        </div>

        {/* Pie Chart + Feedback Table */}
        <div className='grid grid-cols-2 gap-5 mt-10 w-[950px]'>

          {/* Left Column: Pie Chart */}
          <div className='shadow-md p-5 rounded-lg flex flex-col items-center'>
            <h2 className='text-gray-700 font-semibold mb-3 text-center'>Pie Chart: Recommendations</h2>
            <Pie data={pieData} height={250} />
          </div>

          {/* Right Column: Feedback Table */}
          <div className='shadow-md w-full rounded-lg overflow-x-auto max-h-[700px]'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gradient-to-r from-teal-600 to-cyan-500 text-white sticky top-0'>
                <tr>
                  <th className='px-6 py-3 text-left text-[10px] font-medium uppercase tracking-wider'>Index</th>
                  <th className='px-6 py-3 text-left text-[10px] font-medium uppercase tracking-wider'>Name</th>
                  <th className='px-6 py-3 text-left text-[10px] font-medium uppercase tracking-wider'>Event</th>
                  <th className='px-6 py-3 text-left text-[10px] font-medium uppercase tracking-wider'>Rating</th>
                  <th className='px-6 py-3 text-left text-[10px] font-medium uppercase tracking-wider'>Recommend</th>
                  <th className='px-6 py-3 text-left text-[10px] font-medium uppercase tracking-wider'>Comments</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {feedbacks?.map((fb, index) => (
                  <tr key={fb.id || index} className='hover:bg-gray-100'>
                    <td className='px-6 text-[11px] py-4 whitespace-nowrap'>{index + 1}</td>
                    <td className='px-6 text-[11px] py-4 whitespace-nowrap'>{fb.name || "Anonymous"}</td>
                    <td className='px-6 text-[11px] py-4 whitespace-nowrap'>{fb.event}</td>
                    <td className='px-6 text-[11px] py-4 whitespace-nowrap'>{fb.rating_overall}★</td>
                    <td className='px-6 text-[11px] py-4 whitespace-nowrap'>{fb.recommend}</td>
                    <td className='px-6 text-[11px] py-4 whitespace-nowrap'>{fb.comments || "-"}</td>
                  </tr>
                )) || <tr><td colSpan={6} className='text-center py-4'>No feedbacks available</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Card Component
const Card = ({ icon, value, label }) => (
  <div className='grid grid-cols-3 gap-5 h-[90px] px-5 w-full shadow-md rounded-lg items-center justify-center'>
    <div className='w-[45px] h-[45px] flex items-center justify-center p-4 rounded-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-500'>
      {icon}
    </div>
    <div className='flex col-span-2 flex-col'>
      <h2 className='font-bold text-gray-700 text-xl'>{value}</h2>
      <p className='text-gray-600 font-semibold text-[10px] mt-1'>{label}</p>
    </div>
    
  </div>
);

export default AdminDashboard;
