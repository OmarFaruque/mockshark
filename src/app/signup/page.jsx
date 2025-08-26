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

const SignupPage = () => {
  const router = useRouter(); 

 const [formData, setFormData] = useState({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
});


  const [isFocused, setIsFocused] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false
  });

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Combine first and last name
  const fullName = `${formData.firstname} ${formData.lastname}`.trim();

  // Prepare only required backend fields
  const payload = {
    name: fullName,
    fullname: fullName,
    email: formData.email,
    password: formData.password,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Registration successful! Please check your email.');
    } else {
      toast.error(data?.message || 'Registration failed!');
    }
  } catch (error) {
    toast.error('Something went wrong!');
    console.error(error);
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

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full bg-[#ffffff10]"></div>
              <div className="absolute bottom-[-30px] right-[-30px] w-[150px] h-[150px] rounded-full bg-[#ffffff10]"></div>
              <div className="absolute top-1/2 right-[-25px] w-[50px] h-[50px] rounded-full bg-[#ffffff20]"></div>
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-center text-white/80">
              <p className="text-sm">Join and unlock exclusive content</p>
            </div>
          </div>

          {/* Signup Form */}
          <div className="flex flex-col justify-center p-10 space-y-6 relative">
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
              <h2 className="text-4xl font-bold text-[#1C2836]">Create an account</h2>
              <p className="text-gray-500 mt-2">Sign up to get started</p>
            </motion.div>

            <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
              {['firstname', 'lastname', 'email', 'password'].map((field) => (
                <div key={field} className="relative">
                  <label
                    htmlFor={field}
                    className={`absolute left-4 transition-all duration-200 ${
                      isFocused[field] || formData[field]
                        ? 'top-[-12px] text-xs bg-white px-2 text-[#1C2836]'
                        : 'top-3 text-sm text-gray-500'
                    }`}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1).replace('name', ' Name')}
                  </label>
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(field)}
                    onBlur={() => handleBlur(field)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1C2836] focus:border-transparent outline-none transition"
                  />
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#1C2836] to-[#3A4B5F] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Sign Up
              </motion.button>
            </form>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-[#1C2836] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignupPage;
