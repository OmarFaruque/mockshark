'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import Image from 'next/image'
import { Navbar } from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Link from 'next/link'


const page = () => {
 const products = [
    {
      id: 1,
      title: 'Woman Hoodie Mockup Front View PSD',
      price: '$2.99',
      oldPrice: '$3.99',
      image: 'https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png', 
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


  const [mainImageIndex, setMainImageIndex] = useState(0);
  const thumbnails = [
    '/mockup-1.png',
    '/mockup-1.png',
    '/mockup-3.png',
    '/mockup-1.png',
    '/mockup-4.jpeg',
  ];

 
  return (
    <div>
     <Navbar/>
      {/* Product Section */}
      <section className='grid md:grid-cols-3 mx-auto px-2 py-4 max-w-6xl gap-6 min-h-[200px] bg-white'>
  {/* Image Display + Thumbnails */}
  <div className='md:col-span-2'>
    {/* Main Image */}
    <div className='bg-gray-100 p-2 rounded overflow-hidden'>
      <Image
        src={thumbnails[mainImageIndex]}
        width={800}
        height={600}
        alt={`Main Image`}
        className='w-full h-auto object-cover rounded'
      />
    </div>

    {/* Thumbnails */}
    <div className='flex items-center gap-3 mt-3 overflow-x-auto'>
      {thumbnails.map((src, index) => (
        <Image
          key={index}
          src={src}
          width={70}
          height={70}
          alt={`Thumbnail ${index + 1}`}
          onClick={() => setMainImageIndex(index)}
          className={`rounded border-2 cursor-pointer hover:scale-105 transition ${
            mainImageIndex === index ? 'border-black' : 'border-transparent'
          }`}
        />
      ))}
    </div>

    {/* Meta Info */}
    <div className='flex flex-col items-start gap-1 mt-3 text-gray-600 text-xs'>
      <div className='flex items-center gap-1'>
        <Image src='/calendar_icon.png' width={12} height={12} alt='Calendar' />
        <span> 18 Nov 2028</span>
      </div>
      <div className='flex items-center gap-1'>
        <Image src='/file_icon.png' width={12} height={12} alt='File Size' />
        <span> PSD 700 MB</span>
      </div>
      <div className='flex items-center gap-1'>
        <Image src='/res_icon.png' width={12} height={12} alt='Resolution' />
        <span> 4000x4000px</span>
      </div>
    </div>
  </div>

  {/* Product Details (unchanged) */}
  <div className='space-y-4 p-4 border border-gray-300 rounded-xl'>
    <p className='text-[#C0C0C0] text-sm'>⭐⭐⭐⭐⭐ 35 Reviews</p>
    <h2 className='font-bold text-[#1C2836] text-xl'>
      WOMAN HOODIE MOCKUP FRONT VIEW PSD
    </h2>

    <div className='space-y-4 text-[#1C2836]'>
      {[
        { label: 'Personal', price: '$2.99' },
        { label: 'Commercial', price: '$4.99' },
        { label: 'Extended Commercial', price: '$8.99' },
      ].map((option, idx) => (
        <label
          key={idx}
          className='flex justify-between items-center px-2 py-2 rounded cursor-pointer'
        >
          <span>
            <input type='radio' name='license' className='mr-2' />
            {option.label}
          </span>
          <span className='font-bold'>{option.price}</span>
        </label>
      ))}
    </div>

    <p className='text-[#1C2836] text-xs'>
      For personal & brand usage.{' '}
      <a href='#' className='text-sky-500 underline'>
        See License
      </a>
    </p>

    <button className='py-2 border border-[#1C2836] rounded-full w-full font-semibold'>
      ADD TO CART
    </button>
    <Link href='/checkout'>
      <button className='bg-[#1C2836] py-2 rounded-full w-full font-semibold text-white'>
        CHECKOUT
      </button>
    </Link>
    <div className='px-2 rounded text-[#939393] text-center'>
      <p>
        Get our bundle pack and Unlock <br />
        <strong>Exclusive Discounts!</strong>
      </p>
      <button className='bg-[#46D8F9] mt-3 py-2 rounded-full w-full font-bold text-[#1C2836]'>
        GET NOW
      </button>
    </div>
  </div>
</section>


      {/* Description Section */}
      <section className='mx-auto p-2 max-w-7xl bg-white'>
        <h3 className='mb-2 font-bold text-[#1C2836] text-xl'>
          Description
        </h3>
        <p className='mb-4 text-[#939393]'>
          Showcase your designs with our Varsity Jacket Mockup. This versatile
          mockup features a classic letterman style with ribbed cuffs and
          waistband, perfect for school or team representations. Easily
          customize different sections of the jacket with special layers and
          smart objects, ensuring precise placement and stunning results. The
          mockup also includes additional masks for flawless line positioning.
          Ideal for presenting your artwork in a professional and impactful way.
        </p>
        <h4 className='mb-2 font-bold text-[#1C2836] text-lg'>
          Which License is Right for You?
        </h4>
        <p className='mb-4 text-[#939393]'>
          Our Essentials License is perfect for designers who want to build
          their portfolios, share their creations on social media, or simply get
          creative. It's ideal for freelancers working on individual projects
          for clients.
          <br />
          <br />
          If you need flexibility for multiple projects or clients, our
          Professional License is the way to go. It provides unlimited use for
          various products and clients, making it perfect for agencies and
          companies with diverse needs.
        </p>

        <h4 className='mb-2 font-bold text-[#1C2836] text-lg'>FAQs</h4>
        <ul className='space-y-2 text-[#939393]'>
          <li>
            <p className='font-bold'>
              Can I use these templates for client projects?
            </p>
            <p>
              Yes, you can use our templates for client projects, but you cannot
              use them to create derivative or competing products. For detailed
              information, please review our license agreement.
            </p>
          </li>
          <br />

          <li>
            <p className='font-bold'>
              Can I use the templates for my own commercial projects?
            </p>
            <p>
              Absolutely! Your license allows you to use the templates in as
              many commercial projects as you need. For more details, please
              check our license agreement.
            </p>
          </li>
          <br />
          <li>
            <p className='font-bold'>Can I get an invoice for my purchase?</p>
            <p>
              Yes, an invoice will be sent to you via email right after your
              purchase is completed.
            </p>
          </li>
          <br />
          <li>
            <p className='font-bold'>
              Do you accept PayPal as a payment method?
            </p>
            <p>
              Yes, you can pay with any major credit card or PayPal during
              checkout.
            </p>
          </li>
          <br />
          <li>
            <p className='font-bold'>
              Do you offer discounts for students or registered nonprofits?
            </p>
            <p>
              Yes, we offer a 20% discount. Please contact us with your
              organization or student email address to receive a coupon.
            </p>
          </li>
        </ul>
      </section>

      {/* Recommended Products */}
      <section className='mx-auto px-2 py-10 max-w-7xl bg-white'>
        <h2 className='mb-6 font-medium text-[#1C2836] text-xl'>
          Recommended Products
        </h2>
        <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {products.map(product => (
            <div
              key={product.id}
              className='relative bg-white shadow-sm hover:shadow-md border rounded-lg overflow-hidden transition'
            >
              {/* Top Label */}
              <div className='top-2 left-2 absolute bg-[#1C2836] p-1 rounded font-bold text-[#46D8F9] text-xs'>
                PSD
              </div>
              {/* Cart Icon (top-right) */}
              <div className='top-2 right-2 absolute'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='bg-[#1C2836] p-1 rounded-sm w-6 h-6 text-gray-200 hover:text-white cursor-pointer'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v7'
                  />
                </svg>
              </div>

              {/* Image */}
              <Image
                src={product.image}
                width={400}
                height={400}
                alt={product.title}
                className='bg-gray-300 w-full h-auto'
              />

              {/* Details */}
              <div className='p-4'>
                <h3 className='mb-1 pb-4 font-bold text-[#1C2836] text-md'>{product.title}</h3>
                <div className='flex justify-between items-center text-gray-500 text-xs'>
                  <span>{product.category}</span>
                  <p>
                    Starting at{' '}
                    <span className='bg-[#1C2836] px-2 py-1 rounded font-semibold text-[#46D8F9] text-xs'>
                      {product.price}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
    <Footer/>
    </div>
  )
}

export default page
