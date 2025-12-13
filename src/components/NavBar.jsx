import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMoon } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";


const NavBar = () => {
    const [isDark, setIsDark] = useState(false);
    const toggleMode =()=>{
        setIsDark(!isDark);
    }
  return (
    <div className='flex h-10 fixed top-0 left-0  bg-white z-50 text-gray-600 shadow-sm w-full items-center justify-between '>
        <Link className='flex mt-4 items-center justify-center' to='/'>
        <img  src='/logo.png' alt='logo' className='w-[200px]   ml-[110px] h-auto'/></Link>
        <div className='flex gap-10 mr-[30px]'>
        <Link className='text-[12px] font-semibold' to='/'>Home</Link>
        <Link className='text-[12px] font-semibold' to='/client/feedback'>FeedBack</Link>
        <Link to='/'>
        <button onClick={toggleMode}>{isDark ? <IoIosSunny size={20} color='teal' /> : <FaMoon size={20} color='teal' />}</button>
        </Link>
        </div>
    </div>
  )
}

export default NavBar