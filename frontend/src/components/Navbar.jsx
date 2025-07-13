import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? 'backdrop-blur-2xl bg-white/80 border-b border-white/20 shadow-xl shadow-black/5'
        : 'backdrop-blur-xl bg-white/70 border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-400/25 hover:shadow-emerald-400/40 transition-all duration-300">
                <span className="text-white font-bold text-xl">G</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 rounded-xl opacity-75 blur-sm"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">GetMax Healthcare</h1>
              <p className="text-xs text-gray-500 font-medium">Solution Pvt Ltd</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/About" className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group">
                About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/services" className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/newsletter" className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group">
              Newsletter
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/testimonials" className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group">
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/blog" className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/contact" className="text-gray-700 hover:text-emerald-600 transition-all duration-300 font-medium relative group">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
              <a href="/login" className="group relative px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-base font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105 hover:from-emerald-600 hover:to-teal-600 flex items-center">
    <span className="relative z-10 flex items-center">
      Login
      <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
  </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
