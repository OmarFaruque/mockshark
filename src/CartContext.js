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
 const addToCart = (product, selectedVariant) => {
  const updatedCart = [...cart];

  

  // Check by product ID + variant size to avoid duplicates of same variant
  const index = updatedCart.findIndex(
    (item) => item.id === product.id && item.productAttributes[0].size === selectedVariant.size
  );

  if (index > -1) {
    toast.info("🛒 Product is already in your cart.", { position: "top-right" });
    return;
  }
const cartItem = {
  id: product.id,
  name: product.name,
  quantity: 1,
  image: product.images?.[0]?.image || '', // use the first image from images array, fallback to empty string
  selectedSize: selectedVariant.size,      
  price: selectedVariant.discountedRetailPrice,
  productAttributes: [selectedVariant],
  paddlePriceId: selectedVariant.paddlePriceId,
};


  updatedCart.push(cartItem);
  setCart(updatedCart);

  toast.success("✅ Product added to cart!", { position: "bottom-right" });
};


  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoaded) return null;

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, cartCount }}>
      {children}
      <ToastContainer
        position="bottom-right"
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
