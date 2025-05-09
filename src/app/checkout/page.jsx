import React from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const Page = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Billing Information */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Billing Information</h2>
          <form className="space-y-4 w-full text-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Enter your First Name" className="border px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Enter your Last Name" className="border px-4 py-2 rounded w-full" />
            </div>
            <input type="text" placeholder="Enter your Company/Organization" className="border px-4 py-2 rounded w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="email" placeholder="Enter your Email" className="border px-4 py-2 rounded w-full" />
              <input type="tel" placeholder="Enter your Phone" className="border px-4 py-2 rounded w-full" />
            </div>
            <select className="border px-4 py-2 rounded w-full">
              <option>Bangladesh</option>
              <option>India</option>
              <option>USA</option>
            </select>
            <input type="text" placeholder="Street Address" className="border px-4 py-2 rounded w-full" />
            <input type="text" placeholder="Apartment, suite unit etc. (optional)" className="border px-4 py-2 rounded w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="City" className="border px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Zip / Postal Code" className="border px-4 py-2 rounded w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="State" className="border px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Zip / Postal Code" className="border px-4 py-2 rounded w-full" />
            </div>
            <button type="submit" className="bg-[#7CB84D] text-[#1C2836] py-2 px-16 rounded-lg hover:bg-green-700 w-full sm:w-auto">
              SAVE
            </button>
          </form>
        </div>

        {/* Payment Details */}
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Payment Details</h2>
          <div className="border rounded p-6 shadow-sm w-full">
            <div className="mb-4">
              <div className="flex justify-between font-semibold text-sm sm:text-base">
                <span className="text-[#6f6f6f]">PRODUCT</span>
                <span className="text-[#6f6f6f]">SUB TOTAL</span>
              </div>
              <div className="flex justify-between py-2 border-t mt-2 text-sm sm:text-base">
                <span className="text-[#b7b7b7]">VARSITY LETTERMAN JACKET FRONT VIEW</span>
                <span>$15</span>
              </div>
              <div className="flex justify-between font-bold text-[#1C2836] border-t pt-2 text-sm sm:text-base">
                <span className="text-[#6f6f6f]">SUBTOTAL</span>
                <span>$15</span>
              </div>
            </div>

           <div className="flex items-center flex-col lg:flex-row lg:justify-between gap-4 lg:gap-1 mb-4">
              <input type="text" placeholder="Coupon code" className="border px-3 py-2 rounded w-64 " />
              <button className="bg-[#7CB84D] text-white px-12 py-2 rounded-lg hover:bg-green-700">APPLY COUPON</button>
            </div>

            <div className="text-center text-[#c1c1c1] mt-20 font-bold text-lg">
              YOUR TOTAL: <span className="text-[#1C2836]">$30</span>
            </div>

            <button className="w-full mt-4 bg-[#006a4e] text-white py-2 rounded-lg hover:bg-green-700 font-bold">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
