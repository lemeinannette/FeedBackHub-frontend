import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CiHome } from "react-icons/ci";
import { SiSimpleanalytics } from "react-icons/si";
import { LuMessageCircle } from "react-icons/lu";
import { BiSolidReport } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";



const AdminNavBar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/login");
  };
  return (
    <div className='flex items-center mt-2 justify gap-13 p-3  center flex-col h-full '>
      <div className='text-[12px] font-semibold text-gray-700 mt-4'>Welcome Back !</div>
        <Link to='/admin/dashboard' className='text-[8px] flex items-center justify-center font-semibold p-1.5 w-[165px] cursor-pointer  text-gray-700 rounded-sm'><CiHome   className='mr-2' color='teal' size={15}/>Dashboard</Link>
        <Link to='/admin/dashboard/analytics' className='text-[8px] flex items-center justify-center font-semibold p-1.5 w-[165px] cursor-pointer  text-gray-700 rounded-sm'><SiSimpleanalytics    className='mr-4' color='teal' size={15}/>Analytics</Link>
        <Link to='/client/feedback' className='text-[8px] flex items-center justify-center font-semibold p-1.5 w-[165px] cursor-pointer  text-gray-700 rounded-sm'><LuMessageCircle   className='mr-2' color='teal' size={15}/>FeedBack</Link>
       
        <button onClick={handleLogout} className='flex w-full bg-linear-to-r from-emerald-500 to-cyan-500 mt-20 text-white cursor-pointer rounded-md  shadow-md'> <div className=' flex  items-center justify-center p-1.5 text-[12px] rounded-md w-full hover:bg-red-400'><RiLogoutCircleLine  className='mr-3'/>Logout</div></button>
        
    </div>
  )
}

export default AdminNavBar