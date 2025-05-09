import React from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';

const Page = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div className='w-full'>
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* Billing Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Billing Information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Enter your First Name" className="border px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Enter your Last Name" className="border px-4 py-2 rounded w-full" />
            </div>
            <input type="text" placeholder="Enter your Company/Organization" className="border px-4 py-2 rounded w-full" />
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" className="border px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Zip / Postal Code" className="border px-4 py-2 rounded w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="State" className="border px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Zip / Postal Code" className="border px-4 py-2 rounded w-full" />
            </div>
            <button type="submit" className="bg-[#7CB84D] text-[#1C2836] py-2 px-16 rounded-lg hover:bg-green-700">SAVE</button>
          </form>
        </div>

        {/* Payment Details */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Payment Details</h2>
          <div className="border rounded p-6 shadow-sm">
            <div className="mb-4">
              <div className="flex justify-between font-semibold">
                <span className='text-[#6f6f6f]'>PRODUCT</span>
                <span className='text-[#6f6f6f]'>SUB TOTAL</span>
              </div>
              <div className="flex justify-between py-2 border-t mt-2">
                <span className='text-[#b7b7b7]'>VARSITY LETTERMAN JACKET FRONT VIEW</span>
                <span>$15</span>
              </div>
              <div className="flex justify-between font-bold text-[#1C2836] border-t pt-2">
                <span className='text-[#6f6f6f]'>SUBTOTAL</span>
                <span>$15</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-1 mb-4">
              <input type="text" placeholder="Coupon code" className="border px-3 py-2 rounded w-64 " />
              <button className="bg-[#7CB84D] text-white px-12 py-2 rounded-lg hover:bg-green-700">APPLY COUPON</button>
            </div>
            {/* <div className="space-y-3">
              <div className="border px-4 py-3 rounded flex items-center gap-2">
                <input type="radio" name="payment" id="card" />
                <label htmlFor="card" className="flex-1">Pay by Card</label>
                <div className="flex gap-1">
                  <img src="/visa.svg" alt="Visa" className="h-4" />
                  <img src="/mastercard.svg" alt="Mastercard" className="h-4" />
                  <img src="/amex.svg" alt="Amex" className="h-4" />
                </div>
              </div>
              <input type="text" placeholder="Credit or debit card" className="border px-4 py-2 rounded w-full" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM / YY" className="border px-4 py-2 rounded" />
                <input type="text" placeholder="CVC" className="border px-4 py-2 rounded" />
              </div>
              <div className="border px-4 py-3 rounded flex items-center gap-2">
                <input type="radio" name="payment" id="paypal" />
                <label htmlFor="paypal" className="flex items-center gap-2">
                  <img src="/paypal.svg" alt="Paypal" className="h-4" />
                  Paypal
                </label>
              </div>
            </div> */}
            <div className="text-center text-[#c1c1c1] mt-20 font-bold text-lg ">
              YOUR TOTAL: <span className="text-[#1C2836]">$30</span>
            </div>
            <button className="w-full mt-4 bg-[#006a4e] text-white py-2 rounded-lg hover:bg-green-700 font-bold">PLACE ORDER</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
