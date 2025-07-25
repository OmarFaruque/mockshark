'use client';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios'; // we'll use axios for easier API calls
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from '@/CartContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const JustDrop = ({ title, paragraph }) => {

   const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // optional: show loader
   const [userCredits, setUserCredits] = useState(0);
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

  // useEffect(() => {
  //   // Step 2: Fetch data when component mounts
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get('https://mockshark-backend.vercel.app/api/v1/customer/products');
  //       setProducts(response.data.data);  // set product list in state
  //       setLoading(false);           // stop loader
  //     } catch (error) {
  //       console.error('Product fetch failed:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []); // empty dependency array = run once on component mount

 useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://mockshark-backend.vercel.app/api/v1/customer/products');
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Product fetch failed:', error);
        setLoading(false);
      }
    };

    // Fetch user credits
    const fetchUserCredits = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) return;

        const res = await axios.get(`https://mockshark-backend.vercel.app/api/v1/customer/auth/users/${userId}`);
        setUserCredits(res.data?.data?.credits - res.data?.data?.creditsUsed || 0);
      } catch (error) {
        console.error("Failed to fetch user credits", error);
      }
    };

    fetchProducts();
    fetchUserCredits();
  }, []);

  const handleBuyNow = async (productId) => {
    try {
      const userId = Cookies.get("userId");
      if (!userId) {
        toast.error("Please log in first");
        return;
      }

      const res = await axios.get('https://mockshark-backend.vercel.app/api/v1/download-with-credit', {
        params: { userId, productId }
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // Reduce local credits count immediately for UI update
        setUserCredits((prev) => prev - 1);
        // Open download link
        window.open(res.data?.downloadUrl, "_blank");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Download failed. Please try again.");
      console.error(error);
    }
  };


const { addToCart, cartCount } = useContext(CartContext);







  // Step 3: Show loading or list
// if (loading) return (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 py-10 max-w-6xl mx-auto">
//     {Array.from({ length: 4 }).map((_, i) => (
//       <div
//         key={i}
//         className="rounded-2xl shadow-md p-4 animate-pulse bg-white"
//       >
//         {/* Image Placeholder */}
//         <div className="w-full h-[200px] bg-gray-200 rounded-xl mb-4" />

//         {/* Title Line */}
//         <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
//         {/* Subtitle Line */}
//         <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />

//         {/* Price */}
//         <div className="h-5 bg-gray-200 rounded w-1/3 mb-2" />
//         <div className="h-3 bg-gray-300 rounded w-1/4" />

//         {/* Button Placeholder */}
//         <div className="mt-6 h-10 bg-gray-300 rounded-full w-full" />
//       </div>
//     ))}
//   </div>
// );

if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center text-[#0f1c2e]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24">
          {/* Spinner Ring */}
          <div className="absolute inset-0 rounded-full border-[6px] border-blue-400 border-t-transparent animate-spin"></div>
          
          {/* Shark Emoji */}
          <span className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
            🦈
          </span>
        </div>

        {/* Brand Text */}
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
    <section className="py-9 bg-white text-center max-w-6xl mx-auto ">
      <h2 className="text-2xl font-extrabold mb-2 text-[#1C2836]">{title}</h2>
      <p className="text-[#000000] mb-8 max-w-2xl mx-auto">
       {paragraph}
      </p>

    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {products.map((product) => (
           <Link href={`/product-details/${product?.id}`} key={product?.id}>
           
          <div key={product.id} className="rounded-2xl shadow-md pb-4 lg:h-[500px]">
            <img
              src={product?.images?.[0]?.image || 'https://via.placeholder.com/262'}
              alt={product?.title}
              className="rounded-t-2xl w-full h-full lg:w-[262] lg:h-[262px] object-contain mb-4 bg-[#E6E6E6]"
            />

            <h3 className="text-[18px] lg:text-[15px] font-bold text-gray-800 leading-tight px-4 h-[40px]">
              {product.name}
            </h3>

            <div className="mt-4 mb-4">
              <div className="text-[30px] font-extrabold text-gray-900">
                ${product.productAttributes?.find(v => v.size === "Personal")?.costPrice}
              </div>
              <div className="text-[14px] text-gray-400 line-through">
                Regular Price : ${product.productAttributes?.find(v => v.size === "Personal")?.retailPrice}
              </div>
            </div>

            <div className="p-4">
           
               <button
  className="py-2 px-4 font-medium text-sm hover:bg-gray-100 transition bg-[#E8E8E8] w-full rounded-full text-black"
  onClick={(e) => {
    e.preventDefault();

    const personalVariant = product.productAttributes.find(
      (attr) => attr.size === "Personal"
    );

    if (personalVariant) {
      addToCart(product, personalVariant);
    } else {
      toast.error("Personal license not available for this product.");
    }
  }}
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
