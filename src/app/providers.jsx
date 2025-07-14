// src/app/providers.jsx
"use client";

import { useState } from "react";
import { CartContext } from "@/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
      
    </CartContext.Provider>
  );
}
