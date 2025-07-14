'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Product & Usage');

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      category: 'Product & Usage',
      icon: '💻',
      items: [
        {
          question: 'What is a mockup, and how do I use it?',
          answer: 'A mockup is a visual representation of a product used to showcase your design in a realistic setting. You can open the PSD file in Adobe Photoshop, replace the smart object with your design, and export the final image.'
        },
        {
          question: 'Are your mockups editable in Photoshop?',
          answer: 'Yes, all our mockups come in fully layered PSD format with smart objects. You can easily insert your design, adjust colors, and backgrounds to suit your needs.'
        },
        {
          question: 'Do I need Photoshop to use your mockups?',
          answer: 'Yes, our mockups are designed for Adobe Photoshop. We recommend using the latest version for the best experience. Photoshop alternatives like Photopea might work, but we don\'t officially support them.'
        },
        {
          question: 'Can I customize colors and designs?',
          answer: 'Absolutely! Our mockups allow full customization, including fabric colors, artwork placement, giving you full control over the final look.'
        }
      ]
    },
    {
      category: 'Licensing',
      icon: '🔐',
      items: [
        {
          question: 'What\'s the difference between Personal, Commercial, and Extended Commercial licenses?',
          answer: 'Personal: Personal use, educational projects, or portfolio presentation.\n\nCommercial: Client projects, business branding, websites, advertisements, and marketing materials.\n\nExtended Commercial: Unlimited commercial use, including resale in templates, digital products, or print-on-demand platforms.'
        },
        {
          question: 'Can I use mockups for client or commercial work?',
          answer: 'Yes, with a Commercial or Extended Commercial license, you can use our mockups for client projects, product showcases, and marketing materials.'
        },
        {
          question: 'Can I resell or share your mockups?',
          answer: 'No. Redistribution, resale, or sharing of our files in original or modified form is strictly prohibited under all licenses.'
        }
      ]
    },
    {
      category: 'Payment & Pricing',
      icon: '💳',
      items: [
        {
          question: 'What payment methods do you support?',
          answer: 'We accept major credit/debit cards and international payment methods via our secure payment gateway. Additional methods like PayPal may be added in the future.'
        },
        {
          question: 'Do you offer bundle pricing or discounts?',
          answer: 'Yes, we offer bundles that let you save more as you download more. Keep an eye out for seasonal promotions too.'
        }
      ]
    },
    {
      category: 'Downloads & Access',
      icon: '📥',
      items: [
        {
          question: 'How do I download my purchased mockups?',
          answer: 'After payment, your mockups will be instantly available for download from your account dashboard or via email.'
        },
        {
          question: 'I didn\'t get the download link. What should I do?',
          answer: 'Please check your spam or junk folder. If you still don\'t see it, contact our support team with your order ID, and we\'ll resend your link.'
        },
        {
          question: 'How long will my files be accessible?',
          answer: 'You can access your files anytime from your account. We recommend backing up your downloads in case you need them later.'
        }
      ]
    },
    {
      category: 'Custom Mockup Requests',
      icon: '🛠️',
      items: [
        {
          question: 'Do you offer custom mockups?',
          answer: 'Yes! If you need a specific mockup that you can\'t find, we offer a custom mockup service tailored to your needs.'
        },
        {
          question: 'How can I order a custom mockup?',
          answer: 'Simply email us the details of your project, including your design needs and mockup preferences. Our team will review your request and respond promptly with next steps, pricing, and timeline.'
        },
        {
          question: 'What\'s the delivery time for custom mockups?',
          answer: 'Basic custom mockups typically take 10–20 days. Complex requests may take longer, depending on the requirements.'
        }
      ]
    },
    {
      category: 'Support & Account',
      icon: '📧',
      items: [
        {
          question: 'How do I contact support?',
          answer: 'You can reach us via our Contact Us page or email us at contact@mockshark.com. We aim to respond within 24 hours.'
        },
        {
          question: 'I lost access to my account. What now?',
          answer: 'Use the "Forgot Password" option on the login page. If you\'re still having issues, contact support with your order details.'
        },
        {
          question: 'Can I get an invoice or receipt?',
          answer: 'Yes, a detailed invoice is automatically generated and sent to your email after purchase. You can also download it anytime from your account.'
        }
      ]
    }
  ];

  const filteredData = faqData.filter(section => section.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How can we help?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our products and services.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Navigation */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/4"
            >
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {faqData.map((section) => (
                    <li key={section.category}>
                      <button
                        onClick={() => {
                          setActiveCategory(section.category);
                          setActiveIndex(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${activeCategory === section.category ? 'bg-cyan-100 text-cyan-700' : 'hover:bg-gray-100 text-gray-700'}`}
                      >
                        <span className="mr-3 text-xl">{section.icon}</span>
                        {section.category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* FAQ Content */}
            <div className="lg:w-3/4">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {filteredData.map((section) => (
                  <div key={section.category}>
                    <div className="flex items-center mb-6">
                      <span className="text-3xl mr-4">{section.icon}</span>
                      <h2 className="text-2xl font-bold text-gray-900">{section.category}</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => {
                        const index = `${section.category}-${itemIndex}`;
                        return (
                          <motion.div 
                            key={index}
                            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
                            whileHover={{ y: -2 }}
                          >
                            <motion.button
                              onClick={() => toggleAccordion(index)}
                              className="flex justify-between items-center w-full text-left p-6 focus:outline-none"
                            >
                              <span className="text-lg font-medium text-gray-900">{item.question}</span>
                              <motion.span
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                className="ml-4 h-6 w-6 flex-shrink-0 text-cyan-600"
                              >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </motion.span>
                            </motion.button>
                            
                            <AnimatePresence>
                              {activeIndex === index && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="px-6 pb-6"
                                >
                                  <div className="prose text-gray-600 whitespace-pre-line border-t border-gray-200 pt-4">
                                    {item.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Still have questions? */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-16 bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl p-8 text-white"
              >
                <div className="max-w-2xl mx-auto text-center">
                  <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                  <p className="text-cyan-100 mb-6">
                    Can't find the answer you're looking for? Our support team is here to help.
                  </p>
                 <button
  onClick={() => window.location.href = 'mailto:contact@mockshark.com'}
  className="bg-white text-cyan-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
>
  Contact Support
</button>

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;