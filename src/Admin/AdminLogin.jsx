import React, { useState, useEffect } from 'react'
import { GiPoliceBadge } from "react-icons/gi"
import { GoPerson } from "react-icons/go"
import { Link, useNavigate } from 'react-router-dom'
import { IoLockClosedOutline } from "react-icons/io5"
import { LuLogIn } from "react-icons/lu"
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaCheck } from "react-icons/fa6"

const AdminLogin = () => {
    const navigate = useNavigate()

    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const [showSuccess, setShowSuccess] = useState(false)

    // 🔥 Redirect immediately if token exists
    useEffect(() => {
        const token = sessionStorage.getItem("adminToken")
        if (token) {
            navigate("/admin/dashboard")
        }
    }, [navigate])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const HandleLogin = (e) => {
        e.preventDefault()

        fetch('http://127.0.0.1:5555/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) throw new Error('Login failed')
            return response.json()
        })
        .then(data => {
            sessionStorage.setItem('adminToken', data.access_token)
            sessionStorage.setItem('adminUsername', data.username)

            // ✅ SHOW SUCCESS CARD
            setShowSuccess(true)

            setTimeout(() => {
                navigate('/admin/dashboard')
            }, 1800)
        })
        .catch(error => {
            console.error('Error:', error)
            alert('Login failed. Please check your credentials and try again.')
        })
    }

    return (
        <div className='flex w-full items-center justify-center relative'>

            {/* ✅ SUCCESS OVERLAY (NO DESIGN CHANGE BELOW) */}
            {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-3 animate-scale-in">
                        
                        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                            <FaCheck className="text-emerald-600" size={22} />
                        </div>

                        <h2 className="text-[15px] font-semibold text-gray-700">
                            Login Successful
                        </h2>

                        <p className="text-[11px] text-gray-500">
                            Redirecting to dashboard…
                        </p>
                    </div>
                </div>
            )}

            <div className='grid grid-cols-2'>
                
                <div className='flex wfull items-center justify-center'>
                    <img
                        src='/login.jpg'
                        alt='admin-login-illustration'
                        className='w-[400px] mt-20 h-auto'
                    />
                </div>

                <div className='flex w-[300px] shadow-md h-[480px] rounded-lg mt-7 ml-[120px]'>
                    <div className='flex flex-col w-full p-5 items-center justify-center'>
                        
                        <div className='w-20 shadow-md mb-3 p-4 rounded-lg font-bold bg-linear-to-r from-teal-600 to-cyan-500'>
                            <GiPoliceBadge size={20} color='white'/>
                        </div>

                        <h1 className='text-2xl font-bold text-gray-700 mb-2'>
                            Admin Login
                        </h1>

                        <p className='text-gray-600 text-[12px] font-semibold text-center'>
                            Enter your credentials to access the admin panel
                        </p>

                        <form
                            onSubmit={HandleLogin}
                            className='flex w-full items-center justify-center flex-col mt-6'
                        >
                            
                            <div className='flex flex-col w-full items-center'>
                                <label className='self-start text-gray-600 font-semibold text-[12px]'>
                                    Username
                                </label>

                                <div className='flex mt-2 border border-gray-200 w-full p-1.5 rounded-lg bg-gray-50 items-center text-[12px] gap-3'>
                                    <GoPerson className='text-gray-400' />
                                    <input
                                        onChange={handleChange}
                                        className='text-gray-700 outline-none w-full'
                                        type='text'
                                        name='username'
                                        value={data.username}
                                        placeholder='Enter your username'
                                    />
                                </div>
                            </div>

                            <div className='flex mt-8 flex-col w-full items-center'>
                                <label className='self-start text-gray-600 font-semibold text-[12px]'>
                                    Password
                                </label>

                                <div className='flex mt-2 border border-gray-200 w-full p-1.5 rounded-lg bg-gray-50 items-center text-[12px] gap-3'>
                                    <IoLockClosedOutline className='text-gray-400' />
                                    <input
                                        onChange={handleChange}
                                        className='text-gray-700 outline-none w-full'
                                        type='password'
                                        name='password'
                                        value={data.password}
                                        placeholder='Enter your password'
                                    />
                                </div>
                            </div>

                            <button className='w-full flex items-center cursor-pointer justify-center mt-8 bg-linear-to-r from-teal-600 font-semibold text-[11px] to-cyan-500 text-white p-1.5 rounded-sm'>
                                <LuLogIn className='mr-2' size={15}/>Login
                            </button>
                        </form>

                        <Link
                            to='/'
                            className='text-[11px] flex items-center font-semibold text-teal-600 mt-6'
                        >
                            <FaArrowLeftLong size={13} className='mr-3'/>
                            Back to Home
                        </Link>

                        <div className='flex text-[11px] border rounded-lg p-1.5 border-dotted mt-4 bg-emerald-50 border-emerald-500 text-gray-500 w-full items-center justify-center'>
                            Demo. username:
                            <span className='font-semibold text-gray-700 ml-1 mr-1'>admin</span>,
                            password:
                            <span className='font-semibold text-gray-700'>password</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ✅ ANIMATION (LOCAL, DOES NOT AFFECT DESIGN) */}
            <style>
                {`
                  @keyframes scaleIn {
                    0% { transform: scale(0.85); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                  }
                  .animate-scale-in {
                    animation: scaleIn 0.35s ease-out forwards;
                  }
                `}
            </style>
        </div>
    )
}

export default AdminLogin
