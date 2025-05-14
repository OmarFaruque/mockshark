'use client';
import Link from 'next/link';
import React from 'react';

const JustDrop = () => {
  const products = [
    {
      id: 1,
      title: 'Woman Hoodie Mockup Front View PSD',
      price: '$2.99',
      oldPrice: '$3.99',
      image: 'https://i.ibb.co.com/NdBDG3m0/Whats-App-Image-2025-05-06-at-11-27-52-AM-removebg-preview.png', 
    },
    {
      id: 2,
      title: 'Woman Hoodie Mockup Front View PSD',
      price: '$2.99',
      oldPrice: '$3.99',
      image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
    },
    {
      id: 3,
      title: 'Woman Hoodie Mockup Front View PSD',
      price: '$2.99',
      oldPrice: '$3.99',
      image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
    },
    {
      id: 4,
      title: 'Woman Hoodie Mockup Front View PSD',
      price: '$2.99',
      oldPrice: '$3.99',
      image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
    },
    {
      id: 5,
      title: 'Woman Hoodie Mockup Front View PSD',
      price: '$2.99',
      oldPrice: '$3.99',
      image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
    },
    {
      id: 6,
      title: 'Woman Hoodie Mockup Front View PSD',
      price: '$2.99',
      oldPrice: '$3.99',
      image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png',
    },
  ];

  return (
    <section className="py-12 bg-white text-center max-w-6xl mx-auto ">
      <h2 className="text-2xl font-extrabold mb-2 text-[#1C2836]">Fresh Mockups Just Dropped!</h2>
      <p className="text-[#000000] mb-8 max-w-xl mx-auto">
        Explore our newest collection of high-quality mockups designed to bring your creative vision
        to life. Crafted for realism and easy customization.
      </p>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 space-y-5 px-4  ">
        {products.map((product) => (
          
         <Link href={`/product-details/${product.id}`} key={product.id}>
           <div
            key={product.id}
            className=" rounded-2xl shadow-md transition pb-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[270] h-[230px] object-contain mb-4 bg-[#E6E6E6]  "
            />
          <h3 className="text-[20px] font-semibold text-gray-800 leading-tight line-clamp-2 px-4">
  {product.title}
</h3>

<div className="mt-4 mb-4">
  <div className="text-[30px] font-extrabold text-gray-900">
    {product.price}
  </div>
  <div className="text-[14px] text-gray-400 line-through">
   Regular Price : {product.oldPrice}
  </div>
</div>

           <div className='p-4'>
           <button className=" py-2 p-4  font-medium text-sm hover:bg-gray-100 transition bg-[#E8E8E8]  w-full rounded-full text-black">
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
