'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) {
      toast.error('Please enter your email address');
    } else {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className="bg-white py-20 text-center">
      <h2 className="mb-2 font-extrabold text-2xl text-[#1C2836]">
        Stay Updated with the Latest Mockups!
      </h2>
      <p className="mb-4 text-[#1C2836]">
        Subscribe to our newsletter for the latest updates and offers.
      </p>

      <div className="flex justify-center gap-2 p-4">
        <input
          type="email"
          value={email}
          placeholder="Email Address"
          className="p-2 border rounded w-64"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSubscribe}
          className="bg-red-600 px-4 py-2 rounded text-white"
        >
          Subscribe Now
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default NewsLetter;
