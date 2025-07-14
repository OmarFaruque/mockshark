'use client'
import React from 'react'
import { Navbar } from '../components/Navbar'

import Footer from '../components/Footer'
import BundlePackages from '../components/Payment'
const page = () => {
  return (
    <div>
        <div>
<Navbar/>
        </div>
        <div className='py-16 text-center p-8  text-white rounded-lg '>
<BundlePackages/>
        </div>
        <div>
<Footer/>
        </div>
    </div>
  )
}

export default page