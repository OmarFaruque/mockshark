'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Payment = ({
  title,
  price,
  regularPrice,
  savings,
  mockups,
  color,
  savingsColor = 'text-[#1C2836]',
  titleColor = 'text-[#1C2836]',
  licenseColor = 'text-[#1C2836]',
  priceColor = 'text-[#1C2836]',
  onBuyNow,
}) => {
  return (
    <div className={`rounded-xl p-6 ${color} text-black w-full sm:w-80 h-96`}>
      <h3 className={`text-xl font-extrabold ${titleColor} mt-6`}>{title}</h3>
      <p className={`mb-4 text-sm ${licenseColor}`}>Commercial License</p>
      <h2 className={`text-3xl font-bold mb-2 ${priceColor}`}>${price}</h2>
      <p className={`text-xs line-through ${savingsColor}`}>
        Regular Price: ${regularPrice} | Save: ${savings}
      </p>
      <button className="bg-white my-4 px-4 py-2 rounded-3xl w-full font-bold text-[#1C2836]">
        {mockups} Mockups
      </button>
      <button
        className="bg-black px-4 py-2 rounded-3xl w-full text-white"
        onClick={onBuyNow}
      >
        Buy Now
      </button>
    </div>
  );
};

const BundlePackages = () => {
  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await fetch('https://mockshark-backend.vercel.app/api/v1/bundles');
        const data = await res.json();
        if (data.success) {
          setBundles(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch bundles:', error);
      }
    };

    fetchBundles();
  }, []);

  const handleBuyNow = ({ title, price, mockups }) => {
   const item = {
  // productId: '10211d12-6853-4e85-95ef-5e4f5ea6b6c9',
  name: title,
  variant: `${mockups} Mockups`,
  quantity: 1,
  price: parseFloat(price),
  // productAttributeId: null,
  productAttributes: [],
  isBundle: true,              // ✅ Add this
  credits: mockups             // ✅ How many mockups this bundle gives
};


    localStorage.setItem('checkoutItem', JSON.stringify(item));
    localStorage.removeItem('cart');
    window.location.href = '/checkout';
  };

  // helper to assign design styles based on mockup count
  const getDesignConfig = (mockups) => {
    switch (mockups) {
      case 10:
        return { color: 'bg-cyan-500' };
      case 20:
        return {
          color: 'bg-[#7CB84D]',
          savingsColor: 'text-white',
          licenseColor: 'text-white',
        };
      case 50:
        return {
          color: 'bg-[#F42A40]',
          titleColor: 'text-white',
          priceColor: 'text-white',
        };
      default:
        return { color: 'bg-gray-200' };
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-slate-900 text-white py-16 text-center p-4">
        <h2 className="text-3xl font-extrabold mb-2 text-cyan-400">
          Our Bundle Packages
        </h2>
        <p>
          Get high-quality mockups at unbeatable prices — choose a bundle and save up to 70%!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-10">
          {bundles.map((bundle) => {
            const {
              title,
              price,
              regularPrice,
              discountPrice,
              mockups,
            } = bundle;

            const savings = (regularPrice - discountPrice).toFixed(2);
            const style = getDesignConfig(mockups);

            return (
              <Payment
                key={bundle.id}
                title={title}
                price={price}
                regularPrice={regularPrice}
                savings={discountPrice}
                mockups={mockups}
                {...style}
                onBuyNow={() =>
                  handleBuyNow({
                    title,
                    price: price,
                    mockups,
                  })
                }
              />
            );
          })}
        </div>

        
         <Link href="/Bundle-Deals" className='mt-3'>
          <span className="text-cyan-400 underline">Click Here</span> to see full details
         </Link>
        
      </section>
    </div>
  );
};

export default BundlePackages;
