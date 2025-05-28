// app/page.jsx or wherever you want to place this
import React from 'react'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { Download, Search } from 'lucide-react'

const products = [
  {
    name: 'VARSITY LETTERMAN JACKET FRONT VIEW',
  },
  {
    name: 'VARSITY LETTERMAN JACKET BACK VIEW',
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-[#0f1c2e]">
      <Navbar />

      {/* Search */}
 <div className="bg-[#192533] px-4 py-6">
  <div className="max-w-6xl mx-auto">
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="w-full px-4 py-2 pr-12 rounded-full border border-gray-400 text-white placeholder-white bg-[#192533] focus:outline-none"
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
    </div>
  </div>
</div>


      {/* Table Header */}
      <div className="bg-gray-100 px-4 py-3 font-bold text-xl text-[#0f1c2e]">
        <div className="max-w-6xl mx-auto grid grid-cols-3">
          <div>Product</div>
          <div className="text-center">Lisence</div>
          <div className="text-end">Download</div>
        </div>
      </div>

      {/* Table Content */}
      <div className="max-w-6xl mx-auto divide-y divide-gray-200 h-screen">
        {products.map((product, idx) => (
          <div key={idx} className="grid grid-cols-3  py-6 items-center">
            <div className="text-xl font-medium text-[#0f1c2e]">
              {product.name}
            </div>
            <div className="flex justify-center">
              <Download className="text-[#0f1c2e]" />
            </div>
            <div className="flex justify-end">
              <button className="bg-[#192533] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#0f1c2e] transition">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}
