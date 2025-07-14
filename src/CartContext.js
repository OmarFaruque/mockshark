'use client';

import { createContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // 🛒 Only adds product with all variants, no selection yet
  const addToCart = (product) => {
    const updatedCart = [...cart];

    // Check if this product is already in cart (only by id)
    const index = updatedCart.findIndex((item) => item.id === product.id);

    if (index > -1) {
      toast.info("🛒 Product is already in your cart.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

  const personalVariant = product.productAttributes.find(
  (attr) => attr.size === "Personal"
);

const cartItem = {
  id: product.id,
  name: product.name,
  quantity: 1,
  productAttributes: [personalVariant], // ✅ only "Personal"
};


    updatedCart.push(cartItem);
    setCart(updatedCart);

    toast.success("✅ Product added to cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoaded) return null;

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, cartCount }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CartContext.Provider>
  );
};
