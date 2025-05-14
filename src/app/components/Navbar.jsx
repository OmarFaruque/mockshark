'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
const [expandedCategories, setExpandedCategories] = useState({}); 
  const [expandedCategory, setExpandedCategory] = useState(null); // Track which category is expanded
  const categories = {
    "T-shirt Mockups": ["Front View", "Back View", "Folded", "Hanging"],
    "Device Mockups": ["iPhone", "iPad", "MacBook", "Android"],
    "Poster Mockups": ["Indoor", "Outdoor", "Framed", "Rolled"],
    "Logo Mockups": ["Wall Sign", "Embossed", "Paper", "Glass"]
  };

const handleCategoryClick = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category] // Toggle the selected category's expanded state
    }));
  };


  return (
    <nav className="bg-[#1C2836] text-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
       <Link href='/'>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold">Mockshark</span>
        </div>

       </Link>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Dropdown Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-cyan-300 transition">
              Mockups
              <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute top-full mt-2 hidden group-hover:block bg-[#0d0f18] border border-cyan-400/30 rounded-lg shadow-lg w-72 z-50 py-2 backdrop-blur-md">
              <ul className="space-y-1 px-2">
                {Object.entries(categories).map(([category, subcategories]) => (
                  <li key={category} className="relative group/item">
                    <div
                      className="flex justify-between items-center px-4 py-3 hover:bg-cyan-400/10 hover:border-l-2 hover:border-l-cyan-400 rounded-md cursor-pointer"
                      onMouseEnter={() => setHoveredCategory(category)}
                    >
                      <span className="text-sm text-gray-100 group-hover/item:text-cyan-300">{category}</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400/50 group-hover:item:text-cyan-400 group-hover:item:translate-x-1 transition" />
                    </div>

                    {hoveredCategory === category && (
                      <div className="absolute left-full top-0 ml-1 bg-[#0d0f18] border border-cyan-400/20 rounded-lg shadow-lg w-64 z-50 py-2">
                        <ul className="space-y-1">
                          {subcategories.map((sub, idx) => (
                            <li key={idx} className="px-4 py-2.5 hover:bg-cyan-400/5 hover:text-cyan-300 text-sm text-gray-300 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Static Links */}
          <a href="#" className="hover:text-cyan-300 transition">About Us</a>
          <a href="#" className="hover:text-cyan-300 transition">Bundle Deals</a>
          <a href="#" className="hover:text-cyan-300 transition">Blog</a>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer hover:text-cyan-300" />
          <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-cyan-300" />
          <User className="w-5 h-5 cursor-pointer hover:text-cyan-300" />

          {/* Desktop Sign In */}
         <Link href='/login'>
          <button className="hidden md:block px-4 py-1.5 bg-white text-[#1C2836] font-medium rounded hover:bg-gray-100 transition">
            Sign In
          </button>

         </Link>
          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </div>
        </div>
      </div>

    {/* Mobile Menu */}
 {mobileMenuOpen && (
          <div className="md:hidden mt-3 space-y-2 animate-slideDown">
            {/* Mockups Dropdown for Mobile */}
            <div className="px-4">
              <button
                onClick={() => handleCategoryClick('Mockups')}
                className="w-full flex justify-between items-center py-2 text-left text-white hover:text-cyan-300"
              >
                Mockups
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedCategories['Mockups'] ? "rotate-90" : ""}`} />
              </button>
              {expandedCategories['Mockups'] && (
                <div className="mt-1 space-y-1">
                  {Object.entries(categories).map(([category, subcategories]) => (
                    <div key={category}>
                      <button
                        onClick={() => handleCategoryClick(category)} // Toggle subcategories for the selected category
                        className="w-full flex justify-between items-center py-2 text-left text-gray-200"
                      >
                        <span className="text-sm font-semibold">{category}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedCategories[category] ? "rotate-90" : ""}`} />
                      </button>
                      {expandedCategories[category] && (
                        <div className="pl-4 space-y-1">
                          {subcategories.map((sub, i) => (
                            <div key={i} className="text-sm text-gray-300 hover:text-cyan-200 py-1">
                              - {sub}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="block px-4 py-2 hover:text-cyan-300">About Us</a>
            <a href="#" className="block px-4 py-2 hover:text-cyan-300">Bundle Deals</a>
            <a href="#" className="block px-4 py-2 hover:text-cyan-300">Blog</a>

            {/* Mobile Auth Buttons */}
            <div className="flex justify-center gap-4 mt-3">
              <button className="bg-white text-[#1C2836] px-4 py-1.5 rounded hover:bg-gray-200">Login</button>
              <button className="bg-white text-[#1C2836] px-4 py-1.5 rounded hover:bg-gray-200">Signup</button>
            </div>
          </div>
        )}

      
    </nav>
  );
};
