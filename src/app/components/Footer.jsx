import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-900 px-6 py-12 text-white'>
      <div className='gap-8 grid grid-cols-1 md:grid-cols-4 mx-auto max-w-7xl'>
        {/* Logo + Social */}
        <div>
          <div className='flex justify-start items-center gap-2'>
            <img
              src='/logo.png'
              alt='Mockshark Logo'
              className='w-14 h-14 object-contain'
            />
            <h2 className='mb-2 font-bold text-cyan-400 text-2xl'>
              Mock <br /> <span className='text-white'>Shark</span>
            </h2>
          </div>
          <div className='flex gap-3 text-xl'>
            <a href='#'>
              <img
                src='/icon (1).png'
                alt='Mockshark Logo'
                className='w-6 h-6 object-contain'
              />
            </a>
            <a href='#'>
              <img
                src='/icon (2).png'
                alt='Mockshark Logo'
                className='w-6 h-6 object-contain'
              />
            </a>
            <a href='#'>
              <img
                src='/icon (3).png'
                alt='Mockshark Logo'
                className='w-6 h-6 object-contain'
              />
            </a>
            <a href='#'>
              <img
                src='/icon (4).png'
                alt='Mockshark Logo'
                className='w-6 h-6 object-contain'
              />
            </a>
          </div>
        </div>

        {/* Information */}
        <div>
          <h4 className='mb-2 font-bold'>Information</h4>
          <ul className='space-y-1 text-sm'>
            <li>
              <a href='#' className='hover:underline'>
                Home
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                About Us
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className='mb-2 font-bold'>Legal</h4>
          <ul className='space-y-1 text-sm'>
            <li>
             <Link href="/Terms-Conditions">
           
                Terms of Service
            
             </Link>
            </li>
            <li>
              <Link href='/Privacypolicy'>
            
                Privacy Policy
             
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className='mb-2 font-bold'>Support</h4>
          <ul className='space-y-1 text-sm'>
            <li>
              
                Help Center
              
            </li>
            <li>
              
                FAQs
              
            </li>
            <li>
             <Link href='/contact-us'>
             
                Contact Us
             
             </Link>

            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className='mt-10 pt-4 border-slate-700 border-t text-gray-400 text-sm text-center'>
        © 2025 MockShark.com. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
