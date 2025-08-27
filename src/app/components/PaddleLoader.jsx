"use client";

import { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";

import { CartContext } from "@/CartContext";

const PaddleLoader = () => {
  
  useEffect(() => {
    
    // Load Paddle.js script
    const script = document.createElement("script");
    const Bearertoken = Cookies.get("token");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      if (typeof Paddle !== "undefined") {
        Paddle.Environment.set("sandbox"); // Remove for live
      }
    };
    document.head.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PaddleLoader;






