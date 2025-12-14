import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-400 to-teal-600 text-gray-100 pt-10 pb-5 rounded-md mx-4 my-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">FeedbackHub</h3>
            <p className="text-gray-100 text-sm">
              Your platform to collect, analyze, and visualize user feedback efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-100 text-sm">
              <li><a href="/admin/dashboard" className="hover:text-gray-200 transition">Dashboard</a></li>
              <li><a href="/admin/dashboard/analytics" className="hover:text-gray-200 transition">Analytics</a></li>
              <li><a href="/client/feedback" className="hover:text-gray-200 transition">Feedbacks</a></li>
              
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-100 hover:text-gray-200 transition"><FaFacebookF /></a>
              <a href="#" className="text-gray-100 hover:text-gray-200 transition"><FaTwitter /></a>
              <a href="#" className="text-gray-100 hover:text-gray-200 transition"><FaInstagram /></a>
              <a href="#" className="text-gray-100 hover:text-gray-200 transition"><FaLinkedinIn /></a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-4 text-center text-gray-100 text-sm">
          &copy; {new Date().getFullYear()} FeedbackHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
