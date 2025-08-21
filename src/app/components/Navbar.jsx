"use client";
import React, { useState, useRef, useEffect, useContext ,menuRef } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { CartContext } from "@/CartContext";
import useUser from "../hooks/user";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [creditInfo, setCreditInfo] = useState({ total: 0, used: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const user = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  // const [hoveredCategory, setHoveredCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null); // Track which category is expanded
  // const categories = {
  //   "T-shirt Mockups": ["Front View", "Back View", "Folded", "Hanging"],
  //   "Device Mockups": ["iPhone", "iPad", "MacBook", "Android"],
  //   "Poster Mockups": ["Indoor", "Outdoor", "Framed", "Rolled"],
  //   "Logo Mockups": ["Wall Sign", "Embossed", "Paper", "Glass"]
  // };
  const userId = Cookies.get("userId");
  const hoverTimeout = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/aboutus" },
    { label: "Order", href: "/order", protected: true },
    { label: "Download", href: "/download", protected: true },
    { label: "Blogs", href: "/blog" },
    { label: "FAQs", href: "/faq" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Terms of Services", href: "/Terms-Conditions" },
    { label: "Privacy Policy", href: "/Privacypolicy" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://mockshark-backend.vercel.app/api/v1/customer/categories"
        );
        const json = await res.json();

        if (json.success) {
          const structuredData = {};
          json.data.forEach((cat) => {
            structuredData[cat.name] = (cat.subcategory || []).map(
              (sub) => sub.name
            );
          });

          setCategories(structuredData);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    Cookies.remove("userId"); // Remove user ID cookie
    Cookies.remove("token"); // Remove token cookie
    Cookies.remove("roleId"); // Remove role ID cookie
    router.push("/login");
  };

  const handleCategoryClick = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const { cartCount } = useContext(CartContext);
  // const [cartCount, setCartCount] = useState(0);

  //   useEffect(() => {
  //     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  //     const totalCount = existingCart.reduce((acc, item) => acc + item.quantity, 0);
  //     setCartCount(totalCount);
  //   }, []);
  // // Load initial cart count on mount
  //   useEffect(() => {
  //     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  //     setCartCount(existingCart.reduce((acc, item) => acc + item.quantity, 0));
  //   }, []);

  const handleCartClick = () => {
    window.location.href = "/cart";
  };

  const fetchCredits = async () => {
    const id = Cookies.get("userId"); // adjust if your cookie name is different
    const res = await fetch(
      `https://mockshark-backend.vercel.app/api/v1/customer/auth/users/${id}`,
      {}
    );

    const data = await res.json();
    setCreditInfo({
      total: data?.data?.credits || 0,
      used: data?.data?.creditsUsed || 0,
    });
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  return (
    <nav className="bg-[#1C2836] text-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-start gap-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mt-1 ml-3 hidden lg:block"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <Link href="/">
            <div className="flex items-center gap-2">
              <img
                src="/ML-05.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">Mockshark</span>
            </div>
          </Link>
        </div>

        {/* Sidebar Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-opacity-50 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar Panel */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-[#1C2836] z-50 shadow-xl transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b border-gray-600">
            <span className="text-xl font-bold">Menu</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5 text-white " />
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            {menuItems.map((item, idx) =>
              item.protected ? (
                <span
                  key={idx}
                  onClick={() => {
                    if (!userId) {
                      router.push("/login");
                    } else {
                      router.push(item.href);
                    }
                  }}
                  className="block cursor-pointer text-white uppercase hover:text-cyan-300 transition-colors duration-200"
                >
                  {item.label}
                </span>
              ) : (
                <Link key={idx} href={item.href}>
                  <span className="block text-white uppercase hover:text-cyan-300 transition-colors duration-200">
                    {item.label}
                  </span>
                </Link>
              )
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Dropdown Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-cyan-300 transition">
              Mockups
              <svg
                className="w-4 h-4 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className="absolute top-full  hidden group-hover:block bg-[#0d0f18] border border-cyan-400/30 rounded-lg shadow-lg w-72 z-50 py-2 backdrop-blur-md">
              <ul className="space-y-1 px-2">
                {Object.entries(categories).map(([category, subcategories]) => (
                  <li
                    key={category}
                    className="relative group/item"
                    onMouseEnter={() => {
                      if (hoverTimeout.current)
                        clearTimeout(hoverTimeout.current);
                      setHoveredCategory(category);
                    }}
                    onMouseLeave={() => {
                      hoverTimeout.current = setTimeout(() => {
                        setHoveredCategory(null);
                      }, 300); // 👈 Delay to prevent flickering
                    }}
                  >
                    <div className="flex justify-between items-center px-4 py-3 hover:bg-cyan-400/10 hover:border-l-2 hover:border-l-cyan-400 rounded-md cursor-pointer">
                      <span className="text-sm text-gray-100 group-hover/item:text-cyan-300">
                        {category}
                      </span>
                      <ChevronRight className="w-4 h-4 text-cyan-400/50 group-hover:item:text-cyan-400 group-hover:item:translate-x-1 transition" />
                    </div>

                    {hoveredCategory === category && (
                      <div
                        className="absolute left-full top-0 ml-1 bg-[#0d0f18] border border-cyan-400/20 rounded-lg shadow-lg w-64 z-50 py-2"
                        onMouseEnter={() => {
                          if (hoverTimeout.current)
                            clearTimeout(hoverTimeout.current);
                        }}
                        onMouseLeave={() => {
                          hoverTimeout.current = setTimeout(() => {
                            setHoveredCategory(null);
                          }, 300);
                        }}
                      >
                        <ul className="space-y-1">
                          {subcategories.map((sub, idx) => (
                            <li
                              key={idx}
                              onClick={() => router.push(`/subcategory/${sub}`)}
                              className="px-4 py-2.5 hover:bg-cyan-400/5 hover:text-cyan-300 text-sm text-gray-300 flex items-center gap-2 cursor-pointer"
                            >
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
          <Link href="/aboutus" className="hover:text-cyan-300 transition">
            About Us
          </Link>

          <Link href="/Bundle-Deals" className="hover:text-cyan-300 transition">
            Bundle Deals
          </Link>
          <Link href="/blog" className="hover:text-cyan-300 transition">
            Blog
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <p className="text-cyan-400 mr-2">
            {creditInfo.used}/{creditInfo.total}
          </p>
          <div className="relative flex items-center">
            {/* Search Icon */}
            {!showSearch && (
              <Search
                className="w-5 h-5 cursor-pointer hover:text-cyan-300 transition"
                onClick={() => setShowSearch(true)}
              />
            )}

            {/* Search Bar */}
            {showSearch && (
              <div className="absolute top-9 ml-[-220px] lg:ml-[-800px] flex items-center bg-white border border-gray-300 rounded-xl shadow-md px-3 py-5 lg:w-[780px] w-[270px] z-50 ">
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-grow text-black outline-none bg-transparent  rounded-md"
                />

                <X
                  className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500 ml-2"
                  onClick={() => setShowSearch(false)}
                />
              </div>
            )}
          </div>
          <div className="relative inline-block">
            <ShoppingCart
              className="w-5 h-5 cursor-pointer hover:text-cyan-300"
              onClick={handleCartClick}
            />

            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                style={{ lineHeight: 1 }}
              >
                {cartCount}
              </span>
            )}
          </div>

         <div className="hidden sm:inline-block">
           {user ? (
            <div className="relative inline-block">
              {/* Avatar - peer */}
              <div className="peer flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 cursor-pointer transition-all hover:ring-2 hover:ring-blue-400/30">
                <Image
                  src={user.image || "/default-avatar.png"}
                  width={32}
                  height={32}
                  alt="User Avatar"
                  className="rounded-full border-2 border-[#0d0f18]"
                />
              </div>

              {/* Dropdown menu */}
              <div
                className="absolute right-0  w-56 origin-top-right bg-[#1a1d28] rounded-xl shadow-2xl shadow-black/50 border border-gray-800/50 backdrop-blur-sm z-50
      opacity-0 scale-95 pointer-events-none
      peer-hover:opacity-100 peer-hover:scale-100 peer-hover:pointer-events-auto
      hover:opacity-100 hover:scale-100 hover:pointer-events-auto
      transition-all duration-150 ease-in-out"
              >
                <div className="px-4 py-3 border-b border-gray-800/50">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-[#252a38] transition-colors duration-100"
                >
                  {/* Icon */}
                  <svg
                    className="w-5 h-5 mr-3 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Account Settings
                </Link>

                <button
                  onClick={() => {
                    Cookies.remove("userId");
                    window.location.reload();
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-[#252a38] transition-colors duration-100"
                >
                  <svg
                    className="w-5 h-5 mr-3 opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-block  text-cyan-400 px-4 py-2 rounded-lg"
            >
              <span className="relative z-10">Sign In</span>
            </Link>
          )}
         </div>

          {/* Desktop Sign In */}
          {/* {!isLoggedIn && (
            <Link href="/login">
              <button className="hidden md:block px-4 py-1.5 text-cyan-400 font-medium rounded hover:bg-gray-100 transition">
                Sign In
              </button>
            </Link>
          )} */}
          {/* Mobile Menu Icon */}
          <div
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-2 animate-slideDown">
          {/* Mockups Dropdown for Mobile */}
          <div className="px-4">
           <div className="flex justify-end items-center w-full">
  {user ? (
    <div className="relative inline-block" ref={menuRef}>
      {/* Avatar */}
      <div
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 cursor-pointer transition-all hover:ring-2 hover:ring-blue-400/30"
      >
        <Image
          src={user.image || "/default-avatar.png"}
          width={32}
          height={32}
          alt="User Avatar"
          className="rounded-full border-2 border-[#0d0f18]"
        />
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right bg-[#1a1d28] rounded-xl shadow-2xl shadow-black/50 border border-gray-800/50 backdrop-blur-sm z-50
          transition-all duration-150 ease-in-out"
        >
          <div className="px-4 py-3 border-b border-gray-800/50">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>

          <Link
            href="/profile"
            className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-[#252a38] transition-colors duration-100"
          >
            <svg
              className="w-5 h-5 mr-3 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Account Settings
          </Link>

          <button
            onClick={() => {
              Cookies.remove("userId");
              window.location.reload();
            }}
            className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-[#252a38] transition-colors duration-100"
          >
            <svg
              className="w-5 h-5 mr-3 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link
      href="/login"
      className="hidden sm:inline-block text-cyan-400 px-4 py-2 rounded-lg"
    >
      <span className="relative z-10">Sign In</span>
    </Link>
  )}
</div>

            <button
              onClick={() => handleCategoryClick("Mockups")}
              className="w-full flex justify-between items-center py-2 text-left text-white hover:text-cyan-300"
            >
              Mockups
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  expandedCategories["Mockups"] ? "rotate-90" : ""
                }`}
              />
            </button>
            {expandedCategories["Mockups"] && (
              <div className="mt-1 space-y-1">
                {Object.entries(categories).map(([category, subcategories]) => (
                  <div key={category}>
                    <button
                      onClick={() => handleCategoryClick(category)} // Toggle subcategories for the selected category
                      className="w-full flex justify-between items-center py-2 text-left text-gray-200"
                    >
                      <span className="text-sm font-semibold">{category}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          expandedCategories[category] ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                    {expandedCategories[category] && (
                      <div className="pl-4 space-y-1">
                        {subcategories.map((sub, i) => (
                          <div
                            key={i}
                            className="text-sm text-gray-300 hover:text-cyan-200 py-1"
                          >
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

          <a href="#" className="block px-4 py-2 hover:text-cyan-300">
            About Us
          </a>
          <a href="#" className="block px-4 py-2 hover:text-cyan-300">
            Bundle Deals
          </a>
          <a href="#" className="block px-4 py-2 hover:text-cyan-300">
            Blog
          </a>

          {/* Mobile Auth Buttons */}
          <div className="flex justify-center gap-4 mt-3">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <button className="relative px-6 py-2 overflow-hidden font-semibold text-white border border-white rounded-lg group">
                    <span className="relative z-10">Login</span>
                    <span className="absolute inset-0 w-0 bg-cyan-500 transition-all duration-500 ease-out group-hover:w-full z-0"></span>
                  </button>
                </Link>

                <Link href="/signup">
                  <button className="relative px-6 py-2 overflow-hidden font-semibold text-white border border-white rounded-lg group">
                    <span className="relative z-10">Signup</span>
                    <span className="absolute inset-0 w-0 text-cyan-500 transition-all duration-500 ease-out group-hover:w-full z-0"></span>
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className=" px-4 py-1.5 text-red-500 font-medium rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
