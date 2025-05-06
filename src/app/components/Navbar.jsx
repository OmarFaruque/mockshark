'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User ,ChevronDown } from 'lucide-react';
 // Adjust the path as necessary
export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#1C2836] text-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Side */}
        <div className="relative flex items-center space-x-2">
  <img
    src="/logo.png"
    alt="Mockshark Logo"
    className="w-8 h-8 object-contain"
  />
  <button className="font-bold text-xl flex items-center space-x-1 text-white">
    <span>Mockshark</span>
  </button>
</div>


        {/* Center Nav Links */}
      {/* Center Nav Links with Mockups Dropdown */}
<div className="hidden md:flex space-x-6 items-center">
  {/* Mockups Dropdown */}
  <div className="relative group">
    <button className="hover:text-gray-300 flex items-center gap-1">
      Mockups
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div className="absolute top-full mt-2 hidden group-hover:block bg-[#1C2836] text-white  rounded-2xl shadow w-40 z-50">
      <ul>
        <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer border-b border-b-white/10 ">T-shirt Mockups</li>
        <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer border-b border-b-white/10">Device Mockups</li>
        <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer border-b border-b-white/10">Poster Mockups</li>
        <li className="px-4 py-2 hover:bg-gray-900 cursor-pointer border-b border-b-white/10">Logo Mockups</li>
      </ul>
    </div>
  </div>

  {/* Static Links */}
  <a href="#" className="hover:text-gray-300">About Us</a>
  <a href="#" className="hover:text-gray-300">Bundle Deals</a>
  <a href="#" className="hover:text-gray-300">Blog</a>
</div>


        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
          </div>

          {/* Desktop Menu (Login/Signup hover menu) */}
          <div
            className="relative group hidden md:block"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <Menu className="w-6 h-6 cursor-pointer" />
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-[#1C2836] text-white rounded-2xl shadow w-28 z-50">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-900   cursor-pointer border-b border-b-white/10">Login</li>
                  <li className="px-4 py-2 hover:bg-gray-900  cursor-pointer border-b border-b-white/10">Signup</li>
                </ul>
              </div>
            )}
          </div>

          {/* Icons */}
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <User className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Mobile Menu Links */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-2 animate-slideDown">
          <a href="#" className="hover:text-gray-300">Mockups</a>
          <a href="#" className="hover:text-gray-300">About Us</a>
          <a href="#" className="hover:text-gray-300">Bundle Deals</a>
          <a href="#" className="hover:text-gray-300">Blog</a>
          <div className="flex space-x-4 mt-2 ">
            <button className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">Login</button>
            <button className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200">Signup</button>
          </div>
        </div>
      )}
    </nav>
  );
};
