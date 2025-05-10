'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination ,Thumbs  } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/thumbs';
import { useState ,useRef } from 'react';
import Image from 'next/image'
import { Navbar } from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import JustDrop from '@/app/components/JustDrop';
import RecommendedProduct from '@/app/components/RecommendedProduct';

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



   const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const thumbnails = [
    '/mockup-1.png',
    '/mockup-1.png',
    '/mockup-3.png',
    '/mockup-1.png',
    '/mockup-4.jpeg',
  ];

  const handlePrev = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? thumbnails.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setMainImageIndex((prevIndex) =>
      prevIndex === thumbnails.length - 1 ? 0 : prevIndex + 1
    );
  };

 
 
  return (
    <div>
     <Navbar/>
      {/* Product Section */}
     <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-2 py-4 bg-white">
  {/* Image Display + Thumbnails */}
  <div className="md:col-span-2 w-full">
    {/* Main Swiper */}
   <Swiper
  modules={[Navigation, Pagination, Thumbs]}
  spaceBetween={10}
  navigation
  pagination={{ clickable: true }}
  thumbs={{ swiper: thumbsSwiper }}
  className="rounded bg-gray-100 p-2 lg:w-[630px] lg:h-[444px] custom-swiper"
>
  {thumbnails.map((src, index) => (
    <SwiperSlide key={index}>
      <div className="flex items-center justify-center">
        <Image
          src={src}
          alt={`Slide ${index}`}
          width={400}
          height={400}
          className="rounded object-contain"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>


    {/* Thumbnails Swiper */}
    <Swiper
      modules={[Thumbs]}
      onSwiper={setThumbsSwiper}
      spaceBetween={10}
      watchSlidesProgress
      breakpoints={{
        320: { slidesPerView: 5 },
        640: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
      className="mt-4 "
    >
      {thumbnails.map((src, index) => (
        <SwiperSlide key={index} className="cursor-pointer">
          <Image
            src={src}
            alt={`Thumb ${index}`}
            width={70}
            height={70}
            className="rounded border border-gray-300 hover:border-black transition w-full h-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>

    {/* Meta Info */}
    <div className="flex flex-col items-start gap-1 mt-3 text-gray-600 text-xs">
      <div className="flex items-center gap-1">
        <Image src="/calender.png" width={12} height={12} alt="Calendar" />
        <span>18 Nov 2028</span>
      </div>
      <div className="flex items-center gap-1">
        <Image src="/file.png" width={12} height={12} alt="File Size" />
        <span>PSD 700 MB</span>
      </div>
      <div className="flex items-center gap-1">
        <Image src="/size.png" width={12} height={12} alt="Resolution" />
        <span>4000x4000px</span>
      </div>
    </div>
  </div>

  {/* Product Details */}
  <div className="space-y-4 p-4 border border-gray-300 rounded-xl mt-20 lg:mt-0">
    <p className="text-[#C0C0C0] text-sm">⭐⭐⭐⭐⭐ 35 Reviews</p>
    <h2 className="font-bold text-[#1C2836] text-xl">
      WOMAN HOODIE MOCKUP FRONT VIEW PSD
    </h2>
    <div className="space-y-4 text-[#1C2836]">
      {[
        { label: 'Personal', price: '$2.99' },
        { label: 'Commercial', price: '$4.99' },
        { label: 'Extended Commercial', price: '$8.99' },
      ].map((option, idx) => (
        <label
          key={idx}
          className="flex justify-between items-center px-2 py-2 rounded cursor-pointer"
        >
          <span>
            <input type="radio" name="license" className="mr-2" />
            {option.label}
          </span>
          <span className="font-bold">{option.price}</span>
        </label>
      ))}
    </div>
    <p className="text-[#1C2836] text-xs">
      For personal & brand usage.{' '}
      <a href="#" className="text-sky-500 underline">
        See License
      </a>
    </p>
    <button className="py-2 border border-[#1C2836] text-[#1C2836] rounded-full w-full font-semibold">
      ADD TO CART
    </button>
    <Link href="/checkout">
      <button className="bg-[#1C2836] py-2 rounded-full w-full font-semibold text-white">
        CHECKOUT
      </button>
    </Link>
    <div className=" rounded text-[#939393] text-center">
      <p>
        Get our bundle pack and Unlock <br />
        <strong>Exclusive Discounts!</strong>
      </p>
      <button className="bg-[#46D8F9] mt-3 py-2  rounded-full w-full font-bold text-[#1C2836]">
        GET NOW
      </button>
    </div>
  </div>
</section>



      {/* Description Section */}
      <section className='mx-auto p-2 max-w-6xl bg-white lg:mt-24 '>
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
   <RecommendedProduct/>

      {/* Footer */}
    <Footer/>
    </div>
  )
}

export default page
