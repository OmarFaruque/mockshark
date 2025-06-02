'use client'

import { useContext } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { CartContext } from '@/CartContext';
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {


const { cart, setCart } = useContext(CartContext);

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success("✅ Product removed from cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const subtotal = cart.reduce((acc, item) => {
    const price = item.productAttributes?.[0]?.retailPrice ?? 0;
    return acc + price * item.quantity;
  }, 0);














  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Billing Information */}
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1C2836]">Billing Information</h2>
          <form className="space-y-4 w-full text-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Enter your First Name" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Enter your Last Name" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
            </div>
            <input type="text" placeholder="Enter your Company/Organization" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="email" placeholder="Enter your Email" className="border  border-[#b7b7b7] px-4 py-2 rounded w-full" />
              <input type="tel" placeholder="Enter your Phone" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
            </div>
            <select className="border border-[#b7b7b7] px-4 py-2 rounded w-full">
              <option>Bangladesh</option>
              <option>India</option>
              <option>USA</option>
            </select>
            <input type="text" placeholder="Street Address" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
            <input type="text" placeholder="Apartment, suite unit etc. (optional)" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="City" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Zip / Postal Code" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="State" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
              <input type="text" placeholder="Zip / Postal Code" className="border border-[#b7b7b7] px-4 py-2 rounded w-full" />
            </div>
            <button type="submit" className="bg-[#7CB84D] font-bold text-[#1C2836] py-2 px-16 rounded-lg hover:bg-green-700 w-full sm:w-auto">
              SAVE
            </button>
          </form>
        </div>

        {/* Payment Details */}
      <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#1C2836]">Payment Details</h2>
      <div className="border border-[#b7b7b7] rounded p-6 w-full">
        <div className="mb-4">
          <div className="flex justify-between font-bold">
            <span className="text-[#6f6f6f] text-[17px]">PRODUCT</span>
            <span className="text-[#6f6f6f] text-[17px]">SUB TOTAL</span>
          </div>

          {cart.map((item) => {
            const price = item.productAttributes?.[0]?.retailPrice ?? 0;
            const itemTotal = price * item.quantity;

            return (
              <div key={item.id} className="flex justify-between items-center py-2 border-t border-[#b7b7b7]">
                <div className="flex ">
                  <span className="text-[#1C2836] font-medium">{item.name} </span>
               <span> <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 ml-4">
  <Trash2 size={18} />
</button></span>
                </div>
                <span className="text-[#1C2836] font-medium">${itemTotal.toFixed(2)}</span>
                
              </div>
            );
          })}

          <div className="flex justify-between items-center font-bold text-[#1C2836] border-t border-[#b7b7b7] pt-2">
            <span className="text-[#6f6f6f] text-[17px]">SUBTOTAL</span>
            <span className='text-[25px]'>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center flex-col lg:flex-row lg:justify-between gap-4 lg:gap-1 mb-4">
          <input type="text" placeholder="Coupon code" className="border border-[#b7b7b7] px-3 py-2 rounded w-64 " />
          <button className="bg-[#7CB84D] text-white px-12 py-2 rounded-lg hover:bg-green-700">APPLY COUPON</button>
        </div>

        <div className="text-center text-[#c1c1c1] mt-20 font-bold text-lg">
          YOUR TOTAL: <span className="text-[#1C2836]">${subtotal.toFixed(2)}</span>
        </div>

        <button className="w-full mt-4 bg-[#006a4e] text-white py-2 rounded-lg hover:bg-green-700 font-bold">
          PLACE ORDER
        </button>
      </div>
    </div>
      </div>

      <Footer />
      <ToastContainer/>
    </div>
  );
};

export default Page;
