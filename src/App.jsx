import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' 
import Home from './components/Home'
import NavBar from './components/NavBar'
import FeedBack from './Client/FeedBack'
import AdminLogin from './Admin/AdminLogin'
import AdminDashboard from './Admin/AdminDashboard'
import Analytics from './Admin/Analytics'
import Footer from './components/Footer'
import Report from './Admin/Report'

const App = () => {
  return (
    <Router>
      <div className='flex mb-7 flex-1  w-full'>
         </div>
        <NavBar />
      
      <Routes>
        <Route path='/' Component={Home } />
        <Route path='/client/feedback' Component={FeedBack } />
        <Route path='/login' Component={AdminLogin } />
        <Route path='/admin/dashboard' Component={AdminDashboard} />
        <Route path='/admin/dashboard/analytics' Component={Analytics} />
        <Route path='/footer' Component={Footer} />
        <Route path='/admin/report' Component={Report} />

      </Routes>
     
    </Router>
  )
}

export default App