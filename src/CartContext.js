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

  const addToCart = (product) => {
    const updatedCart = [...cart];
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

    updatedCart.push({ ...product, quantity: 1 });
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
  <ToastContainer />
</CartContext.Provider>

  );
};
