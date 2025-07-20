'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { Search } from "lucide-react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

useEffect(() => {
  const fetchOrders = async () => {
    const userId = Cookies.get('userId');
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const [normalRes, bundleRes] = await Promise.all([
        fetch(`http://localhost:4000/api/v1/orders/user/${userId}`),
        fetch(`http://localhost:4000/api/v1/bundle-orders/${userId}`),
      ]);

      const normalData = await normalRes.json();
      const bundleData = await bundleRes.json();

      // Normalize bundle orders to match normal orders' shape
      const normalizedBundle = bundleData?.data.map(order => ({
        ...order,
        isBundle: true,
        invoiceNumber: order.id.slice(0, 8).toUpperCase(), // or generate however you want
        subtotalCost: order.subtotal,
        createdAt: order.createdAt,
      }));

      const allOrders = [...normalData.data, ...normalizedBundle].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(allOrders);
      setFilteredOrders(allOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);


  // Filter orders when search term changes
  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = orders?.filter((order) => {
      const invoiceMatch = order?.invoiceNumber?.toLowerCase().includes(lowerSearch);
      const dateMatch = new Date(order?.createdAt).toLocaleDateString().includes(lowerSearch);
      return invoiceMatch || dateMatch;
    });
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center text-[#0f1c2e]">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-[6px] border-blue-400 border-t-transparent animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
              🦈
            </span>
          </div>
          <h2 className="text-2xl font-bold animate-pulse tracking-wide">
            MockShark is swimming your mockups...
          </h2>
          <p className="text-sm text-gray-500 animate-fadeIn">
            Please wait while we fetch your assets.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0f1c2e]">
      <Navbar />

      {/* Search Bar */}
      <div className=" px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Order No. or Date"
              className="w-full px-4 py-2 pr-12 rounded-full border border-gray-400 text-black placeholder-black  focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto w-full overflow-x-auto mt-6 flex-1 mb-6">
        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100 text-[#0f1c2e] text-sm md:text-base">
            <tr>
              <th className="py-3 px-4 font-semibold border-b">Order</th>
              <th className="py-3 px-4 text-center font-semibold border-b">Date</th>
              <th className="py-3 px-4 text-center font-semibold border-b">Total</th>
              <th className="py-3 px-4 text-right font-semibold border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="text-sm md:text-base hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-red-500 font-bold">#{order.invoiceNumber}</td>
                  <td className="py-3 px-4 text-center font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center font-medium">
                    ${order.subtotalCost?.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                   <Link href='/download'>
                     <button
 
  className="bg-[#192533] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#0f1c2e] transition mr-2"
>
  View 
</button>
                   </Link>

                 <button
  onClick={() =>
    router.push(order.isBundle ? `/bundle-invoice/${order.id}` : `/invoice/${order.id}`)
  }
  className="bg-[#192533] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#0f1c2e] transition"
>
   Invoice
</button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};

export default Order;
