'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Cookie } from 'next/font/google';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

  const handleFocus = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused(prev => ({ ...prev, [field]: false }));
  };

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 403 && data.message?.includes("verify")) {
        toast.error('You need to verify your email first');
      } else {
        toast.error(data.message || 'Login failed');
      }
      return;
    }

   
    localStorage.setItem('token', data?.data?.accessToken);

   
    Cookies.set('userId', data?.data?.id, { expires: 7 }); // expires in 7 days
    Cookies.set('token', data?.data?.accessToken, { expires: 7 }); // expires in 7 days
    Cookies.set('name', data?.data?.name, { expires: 7 }); // expires in 7 days
    Cookies.set('roleId', data?.data?.roleId, { expires: 7 }); // expires in 7 days


    toast.success('Login successful');

    router.push('/');
  } catch (err) {
    console.error(err);
    toast.error('Something went wrong');
  }
};



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl grid md:grid-cols-2 gap-0 bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
        >
          {/* Illustration Side */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#1C2836] to-[#3A4B5F] p-10 relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative z-10"
            >
              <Image
                src="/loginSignupageimg.png" 
                alt="Creative Work"
                width={400}
                height={400}
                className="rounded-xl"
              />
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full bg-[#ffffff10]"></div>
              <div className="absolute bottom-[-30px] right-[-30px] w-[150px] h-[150px] rounded-full bg-[#ffffff10]"></div>
              <div className="absolute top-1/2 right-[-25px] w-[50px] h-[50px] rounded-full bg-[#ffffff20]"></div>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 text-center text-white/80">
              <p className="text-sm">Unlock your creative potential</p>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex flex-col justify-center p-10 space-y-6 relative">
            {/* Floating label effect */}
            {/* <div className="absolute top-6 right-6 flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div> */}
            
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-[#1C2836]">Welcome back</h2>
              <p className="text-gray-500 mt-2">Sign in to access your exclusive content</p>
            </motion.div>

            <form className="space-y-6 mt-8" onSubmit={handleLogin}>
              <div className="relative">
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 transition-all duration-200 ${
                    isFocused.email || email 
                      ? 'top-[-12px] text-xs bg-white px-2 text-[#1C2836]'
                      : 'top-3 text-sm text-gray-500'
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1C2836] focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <label 
                  htmlFor="password" 
                  className={`absolute left-4 transition-all duration-200 ${
                    isFocused.password || password 
                      ? 'top-[-12px] text-xs bg-white px-2 text-[#1C2836]'
                      : 'top-3 text-sm text-gray-500'
                  }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1C2836] focus:border-transparent outline-none transition"
                />
              </div>

              <div className="flex justify-between items-center">
                {/* <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-300 text-[#1C2836] focus:ring-[#1C2836]"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#1C2836] hover:underline">
                  Forgot password?
                </Link> */}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#1C2836] to-[#3A4B5F] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Sign In
              </motion.button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
               
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
              
    <Link href="/forgot-password">
      <span className="text-blue-600 hover:underline transition duration-200 px-2 bg-white">
        Forgot your password?
      </span>
    </Link>
 
              </div>
            </div>

            {/* <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                <Image src="/google-icon.svg" width={20} height={20} alt="Google" />
                <span className="text-sm">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                <Image src="/github-icon.svg" width={20} height={20} alt="GitHub" />
                <span className="text-sm">GitHub</span>
              </button>
            </div> */}

            <p className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#1C2836] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
      <ToastContainer/>
    </div>
  );
};

export default LoginPage;