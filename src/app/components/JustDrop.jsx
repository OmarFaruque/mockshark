'use client';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'; // we'll use axios for easier API calls
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from '@/CartContext';

const JustDrop = () => {

   const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // optional: show loader
  //  const [cartCount, setCartCount] = useState(0);
  // const products = [
  //   {
  //     id: 1,
  //     title: 'Woman Hoodie Mockup Front View PSD',
  //     price: '$2.99',
  //     oldPrice: '$3.99',
  //     image: 'https://i.ibb.co.com/NdBDG3m0/Whats-App-Image-2025-05-06-at-11-27-52-AM-removebg-preview.png', 
  //   },
  //   {
  //     id: 2,
  //     title: 'Woman Hoodie Mockup Front View PSD',
  //     price: '$2.99',
  //     oldPrice: '$3.99',
  //     image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
  //   },
  //   {
  //     id: 3,
  //     title: 'Woman Hoodie Mockup Front View PSD',
  //     price: '$2.99',
  //     oldPrice: '$3.99',
  //     image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
  //   },
  //   {
  //     id: 4,
  //     title: 'Woman Hoodie Mockup Front View PSD',
  //     price: '$2.99',
  //     oldPrice: '$3.99',
  //     image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
  //   },
  //   {
  //     id: 5,
  //     title: 'Woman Hoodie Mockup Front View PSD',
  //     price: '$2.99',
  //     oldPrice: '$3.99',
  //     image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
  //   },
  //   {
  //     id: 6,
  //     title: 'Woman Hoodie Mockup Front View PSD',
  //     price: '$2.99',
  //     oldPrice: '$3.99',
  //     image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
  //   },
  // ];

  useEffect(() => {
    // Step 2: Fetch data when component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://mockshark-backend.vercel.app/api/v1/customer/products');
        setProducts(response.data.data);  // set product list in state
        setLoading(false);           // stop loader
      } catch (error) {
        console.error('Product fetch failed:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // empty dependency array = run once on component mount





const { addToCart, cartCount } = useContext(CartContext);







  // Step 3: Show loading or list
if (loading) return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 py-10 max-w-6xl mx-auto">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="rounded-2xl shadow-md p-4 animate-pulse bg-white"
      >
        {/* Image Placeholder */}
        <div className="w-full h-[200px] bg-gray-200 rounded-xl mb-4" />

        {/* Title Line */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        {/* Subtitle Line */}
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />

        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-3 bg-gray-300 rounded w-1/4" />

        {/* Button Placeholder */}
        <div className="mt-6 h-10 bg-gray-300 rounded-full w-full" />
      </div>
    ))}
  </div>
);



  

  return (
    <section className="py-9 bg-white text-center max-w-6xl mx-auto ">
      <h2 className="text-2xl font-extrabold mb-2 text-[#1C2836]">Fresh Mockups Just Dropped!</h2>
      <p className="text-[#000000] mb-8 max-w-2xl mx-auto">
        Explore our newest collection of high-quality mockups designed to bring your creative vision
        to life. Crafted for realism and easy customization.
      </p>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6  px-4  ">
        {products?.map((product) => (
          
         <Link href={`/product-details/${product?.id}`} key={product?.id}>
           <div
            key={product?.id}
            className=" rounded-2xl shadow-md transition pb-4 lg:h-[500px]"
          >
           <img
  src={product?.images?.[1]?.image || 'https://via.placeholder.com/262'}
  alt={product?.title}
  className="rounded-t-2xl w-full h-full lg:w-[262] lg:h-[262px] object-contain mb-4 bg-[#E6E6E6]"
/>

          <h3 className="text-[18px] lg:text-[15px] font-bold text-gray-800 leading-tight  px-4 h-[40px]">
  {product?.name}
</h3>

<div className="mt-4 mb-4">
  <div className="text-[30px] font-extrabold text-gray-900">
    ${product?.productAttributes?.[0]?.costPrice}
  </div>
  <div className="text-[14px] text-gray-400 line-through">
    Regular Price : ${product?.productAttributes?.[0]?.retailPrice}
  </div>
</div>


           <div className='p-4'>
         <button
  className="py-2 p-4 font-medium text-sm hover:bg-gray-100 transition bg-[#E8E8E8] w-full rounded-full text-black"
  onClick={(e) => {
    e.preventDefault(); // prevent navigation
    addToCart(product); // call addToCart with current product
  }} // pass current product object here
>
  + Add to Cart
</button>

           </div>
          </div>
          </Link>
        ))}
      </div>
      
   

    </section>
  );
};

export default JustDrop;
