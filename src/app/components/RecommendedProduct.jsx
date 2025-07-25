'use client';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '@/CartContext';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const RecommendedProduct = () => {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('https://mockshark-backend.vercel.app/api/v1/customer/featured-products');
        setProducts(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);




const { addToCart, cartCount } = useContext(CartContext);

  return (
    <section className="py-12 bg-white text-center max-w-6xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-2 text-[#1C2836] text-left ml-3">Recommended Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {products.map((product) => {
          const firstAttribute = product.productAttributes[0];
          const price = firstAttribute?.discountedRetailPrice || firstAttribute?.retailPrice || 'N/A';
          const oldPrice = firstAttribute?.retailPrice || '';

          return (
            <Link href={`/product-details/${product.id}`} key={product.id}>
              <div className="rounded-2xl shadow-md transition pb-4 hover:shadow-lg lg:h-[500px]">
                <img
                  src={product.images?.[0]?.image || '/placeholder.png'}
                  alt={product.name}
                  className="rounded-t-2xl w-full h-full lg:w-[262px] lg:h-[262px] object-contain mb-4 bg-[#E6E6E6]"
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
          );
        })}
      </div>
    </section>
  );
};

export default RecommendedProduct;
