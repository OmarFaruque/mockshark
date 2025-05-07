import React from 'react'

const NewsLetter = () => {
    return (
        <div className="bg-white py-20 text-center">
          <h2 className="mb-2 font-extrabold text-2xl">Stay Updated with the Latest Mockups!</h2>
          <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
          <div className="flex justify-center gap-2">
            <input type="email" placeholder="Email Address" className="p-2 border rounded w-64" />
            <button className="bg-red-600 px-4 py-2 rounded text-white">Subscribe Now</button>
          </div>
        </div>
      )
}

export default NewsLetter