"use client";

import { CartContext } from "@/CartContext";
import React, { useContext, useState } from "react";
import { Trash2, ChevronDown, ChevronUp, Plus, Minus, Tag } from "lucide-react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const router = useRouter();
 const handleRemove = (id, selectedSize) => {
  const updatedCart = cart.filter(
    (item) => !(item.id === id && item.selectedSize === selectedSize)
  );
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  toast.success("Item removed", {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    style: {
      background: "#10B981",
      color: "#fff",
    },
  });
};



  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const selectedSize =
        selectedVariants[item.id] || item.productAttributes?.[0]?.size;
      const selectedVariant = item.productAttributes.find(
        (v) => v.size === selectedSize
      );
      const price = selectedVariant?.costPrice ?? 0;
      return acc + price * item.quantity;
    }, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-grow flex flex-col items-center justify-center p-6 text-center"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-cyan-600 text-white rounded-lg shadow-md hover:bg-cyan-700 transition-colors"
            >
              Browse Products
            </motion.button>
          </Link>
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="flex-grow px-4 md:px-6 py-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <span className="mr-3">🛒</span>
            Your Cart
            <span className="ml-2 text-cyan-600">
              ({cart.length} {cart.length === 1 ? "item" : "items"})
            </span>
          </h1>
          <Link
            href="/"
            className="text-sm text-cyan-600 hover:text-cyan-800 font-medium"
          >
            Continue Shopping →
          </Link>
        </motion.div>
        <div className="mb-3">
          <h1 className="text-xl font-medium">To select your different license type, go to the product details page.</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const selectedSize =
                selectedVariants[item.id] || item.productAttributes?.[0]?.size;
              const selectedVariant = item.productAttributes.find(
                (v) => v.size === selectedSize
              );
              const uniqueKey = `${item.id}-${selectedSize}`;
              const price = selectedVariant?.costPrice ?? 0;
              const itemTotal = price * item.quantity;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => router.push(`/product-details/${item.id}`)}
                   key={uniqueKey}
                >
                  <div className="p-5 flex items-start">
                    {/* Image */}
                    <div className="w-20 h-20 shrink-0 mr-4 rounded overflow-hidden border">
                      <Image
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        width={70}
                        height={70}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Item content */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-center min-h-[56px]">
                        {" "}
                        {/* ensure some height */}
                        <div className="flex items-center gap-4 flex-wrap">
                          <h2 className="text-lg font-semibold text-gray-800">
                            {item.name}
                          </h2>

                          <span className="bg-gray-200 text-gray-700 rounded px-2 py-1 text-xs">
                            {item.selectedSize}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemove(item.id ,item.selectedSize);
                            }}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                            title="Remove from cart"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="text-right flex items-center min-h-[56px]">
                          <p className="font-medium text-gray-900">
                            ${itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-cyan-600">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-cyan-600 text-white rounded-lg shadow-md hover:bg-cyan-700 transition-colors font-medium"
                >
                  Proceed to Checkout
                </motion.button>
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms of Service
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
