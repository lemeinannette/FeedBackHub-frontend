import React, { useEffect, useState } from 'react'
import { FaRegPenToSquare } from "react-icons/fa6";
import { CiLock, CiStar } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { Link } from 'react-router-dom';

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    average: 0,
    satisfaction: 0
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5555/feedbacks')
      .then(res => res.json())
      .then(data => {
        setFeedbacks(data);

        const total = data.length;

        const average =
          total > 0
            ? (data.reduce((acc, fb) => acc + fb.rating_overall, 0) / total).toFixed(1)
            : 0;

        const satisfied =
          total > 0
            ? (data.filter(fb => fb.recommend === "yes").length / total * 100).toFixed(1)
            : 0;

        setMetrics({
          total,
          average,
          satisfaction: satisfied
        });
      })
      .catch(err => console.error('Error fetching feedbacks:', err));
  }, []);

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='grid mt-5 grid-cols-2 gap-6'>
        <div className='flex ml-[170px] w-full flex-col items-center'>
          <h1 className='text-5xl w-full font-bold text-teal-600'>Welcome to Feedback</h1>
          <h1 className='text-5xl w-full font-bold text-teal-600'>Hub</h1>
          <p className='w-full text-gray-600 mt-7 text-[13px]'>Your opinion matters! Share your experience with us</p>
          <p className='w-full text-gray-600 text-[13px]'>and help us improve our services.</p>

          <div className='flex w-full items-center gap-7 mt-6'>
            <Link to='/client/feedback' className='text-[13px] flex items-center justify-center font-semibold p-1.5 w-[165px] cursor-pointer shadow-md bg-linear-to-r from-teal-600 to-cyan-500 text-white rounded-sm'>
              <FaRegPenToSquare className='mr-2' color='white' size={20}/>Leave Feedback
            </Link>
            <Link to='/login' className='text-[13px] flex items-center justify-center font-semibold p-1.5 w-[165px] cursor-pointer shadow-md bg-white text-teal-600 rounded-sm'>
              <CiLock className='mr-2' color='teal' size={20}/>Admin Login
            </Link>
          </div>
        </div>

        <div className='flex wfull items-center justify-center'>
          <img src='/icon.png' alt='home-illustration' className='w-[400px] h-auto '/>
        </div>
      </div>

      <div className='flex w-full items-center justify-center flex-col'>
        <h1 className='text-3xl font-bold text-gray-700'>Why Your Feedback Matters</h1>
        <div className='grid grid-cols-3 gap-5'>
          <div className='flex p-5 flex-col items-center rounded-xl shadow-md h-full mt-6 w-[300px]'>
            <div className='w-[80 px] p-4 rounded-lg font-bold bg-linear-to-r from-teal-600 to-cyan-500'>
              <CiStar size={20} color='white'/>
            </div>
            <h2 className='font-bold text-gray-700 text-xl mt-2'>Improve Our Services</h2>
            <p className='text-center text-gray-600 text-[13px] mt-3'>Your feedback helps us understand what we are doing right and where we can improve.</p>
          </div>

          <div className='flex p-5 flex-col items-center rounded-xl shadow-md h-full mt-6 w-[300px]'>
            <div className='w-[80 px] p-4 rounded-lg font-bold bg-linear-to-r from-teal-600 to-cyan-500'>
              <FaRegHeart size={20} color='white'/>
            </div>
            <h2 className='font-bold text-gray-700 text-xl mt-2'>Customer Satisfaction</h2>
            <p className='text-center text-gray-600 text-[13px] mt-3'>We value your opinion and strive to provide the best experience possible.</p>
          </div>

          <div className='flex p-5 flex-col items-center rounded-xl shadow-md h-full mt-6 w-[300px]'>
            <div className='w-[80 px] p-4 rounded-lg font-bold bg-linear-to-r from-teal-600 to-cyan-500'>
              <TiMessages size={20} color='white'/>
            </div>
            <h2 className='font-bold text-gray-700 text-xl mt-2'>Open Communication</h2>
            <p className='text-center text-gray-600 text-[13px] mt-3'>Feedback creates a dialog between us and our valued customers.</p>
          </div>
        </div>
      </div>

      <div className='flex w-[950px] bg-linear-to-r mt-[60px] h-[170px] mb-10 from-teal-600 to-cyan-400 items-center rounded-xl justify-between'>
        <div className='flex flex-col w-full items-center justify-center'>
          <h1 className='text-6xl font-bold text-white'>{metrics.total}</h1>
          <p className='text-white'>Feedbacks Received</p>
        </div>
        <div className='flex flex-col items-center w-full justify-center'>
          <h1 className='text-6xl font-bold text-white'>{metrics.average}</h1>
          <p className='text-white'>Average Rating</p>
        </div>
        <div className='flex flex-col items-center w-full justify-center'>
          <h1 className='text-6xl font-bold text-white'>{metrics.satisfaction}%</h1>
          <p className='text-white'>Satisfaction Rate</p>
        </div>
      </div>
    </div>
  )
}

export default Home
