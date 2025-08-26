'use client'
import React from 'react'
import { Mail, Smartphone, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'

const HelpCenter = () => {
  return (
  <div>
    <div>
        <Navbar/>
    </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-10 h-10 text-cyan-600" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600">
          Have a question or need support? We're here to help!
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Email Support Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
        >
          <div className="bg-cyan-600 p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-semibold">Email Support</h2>
            </div>
            <p className="text-cyan-100">Response within 24 hours</p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 mb-4">
              <a 
                href="mailto:contact@mockshark.com" 
                className="text-lg font-medium text-cyan-600 hover:text-cyan-700 break-all"
              >
               service.mockshark@gmail.com
              </a>
            </div>
            <p className="text-gray-600 text-center">
              For general inquiries, order questions, and account support
            </p>
          </div>
        </motion.div>

        {/* Emergency Support Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
        >
          <div className="bg-amber-500 p-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <Smartphone className="w-8 h-8 mr-3" />
              <h2 className="text-2xl font-semibold">Emergency Support</h2>
            </div>
            <p className="text-amber-100">WhatsApp only - Quick replies</p>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 mb-4">
              <a 
                href="https://wa.me/8801600140898" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg font-medium text-gray-900 hover:text-amber-600"
              >
                +880 1600 140898
              </a>
            </div>
            <p className="text-gray-600 text-center">
              Please mention your Order ID or Account Email for faster service
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-2xl mx-auto mt-16 bg-white rounded-xl shadow-md p-8 border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Before contacting us:</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start">
            <span className="text-cyan-600 mr-2">•</span>
            Check your order status in your account dashboard
          </li>
          <li className="flex items-start">
            <span className="text-cyan-600 mr-2">•</span>
            Review our FAQ section for common questions
          </li>
          <li className="flex items-start">
            <span className="text-cyan-600 mr-2">•</span>
            Have your order number ready for faster service
          </li>
        </ul>
      </motion.div>
    </div>
    <div>
        <Footer/>
    </div>
  </div>
  )
}

export default HelpCenter