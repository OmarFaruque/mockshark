import React from 'react'

const Payment = ({ title, price, regularPrice, savings, mockups, color, savingsColor='text-black', titleColor="text-black", licenseColor="text-black", priceColor="text-black" }) => {
  return (
    <div className={`rounded-xl p-6 ${color} text-black w-full sm:w-80 h-96  `}>
      <h3 className={`text-xl font-extrabold ${titleColor} mt-6`}>{title}</h3>
      <p className={`mb-4 text-sm ${licenseColor}`}>Commercial License</p>
      <h2 className={`text-3xl font-bold mb-2 ${priceColor}`}>{price}</h2>
      <p className={`text-xs line-through ${savingsColor}`}>
        Regular Price: {regularPrice} | Save: {savings}
      </p>
      <button className='bg-white my-4 px-4 py-2 rounded-3xl w-full font-bold text-black'>
        {mockups} Mockups
      </button>
      <button className='bg-black px-4 py-2 rounded-3xl w-full text-white'>
        Buy Now
      </button>
    </div>
  )
}

export default Payment
