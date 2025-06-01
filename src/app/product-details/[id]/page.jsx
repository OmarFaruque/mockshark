'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useState ,useRef ,useEffect } from 'react';
import Image from 'next/image'
import { Navbar } from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useParams } from 'next/navigation';


import RecommendedProduct from '@/app/components/RecommendedProduct';



const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(0,0,0,0.8)] rounded-full p-2 transition duration-300"
  >
    <FaChevronRight className="text-white text-xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(0,0,0,0.8)] rounded-full p-2 transition duration-300"
  >
    <FaChevronLeft className="text-white text-xl" />
  </div>
);


const page = () => {

const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/v1/customer/products/${id}`);
        const data = await res.json();
        setProduct(data?.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

 


 



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


   const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);



  //  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const thumbnails = [
    '/mockup-1.png',
    '/mockup-1.png',
    '/mockup-3.png',
     '/mockup-3.png',

   
    
  ];

  // const handlePrev = () => {
  //   setMainImageIndex((prevIndex) =>
  //     prevIndex === 0 ? thumbnails.length - 1 : prevIndex - 1
  //   );
  // };

  // const handleNext = () => {
  //   setMainImageIndex((prevIndex) =>
  //     prevIndex === thumbnails.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

 
 if (loading) {
  return (
    <div className="animate-pulse p-4 max-w-7xl mx-auto">
      {/* Image slider skeleton */}
      <div className="flex gap-4">
        <div className="w-full max-w-[600px] aspect-square bg-gray-200 rounded-2xl" />

        {/* Text section */}
        <div className="flex-1 space-y-4">
          <div className="h-6 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-36 w-full bg-gray-200 rounded mt-4" />
        </div>
      </div>

      {/* Thumbnail skeleton */}
      <div className="flex gap-4 mt-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-[130px] h-[100px] bg-gray-200 rounded-xl"
          />
        ))}
      </div>

      {/* Description section skeleton */}
      <div className="mt-10 space-y-3">
        <div className="h-5 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

  if (!product) return <div className="text-center py-10">Product not found.</div>;
  const {
    name,
    shortDescription,
    longDescription,
    images = [],
    productAttributes = [],
    category,
    subcategory,
    brand,
    fileSize,
    resolution,
    createdAt
  } = product;


  return (
    <div>
     <Navbar/>
      {/* Product Section */}
     <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1160px] mx-auto px-2 py-4 bg-white">
  {/* Image Display + Thumbnails */}
  <div className="md:col-span-2 w-full max-w-[900px] mx-auto px-4 relative  gap-4 ">
  {/* Main Slider */}
{images?.length > 0 ? (
  <Slider
    asNavFor={nav2}
    ref={(slider) => setNav1(slider)}
    arrows={true}
    slidesToShow={1.3}
    centerMode={true}
    centerPadding="0px"
    infinite={false}
    className="w-full h-auto"
    nextArrow={<NextArrow />}
    prevArrow={<PrevArrow />}
  >
    {images.map((item, index) => (
      <div
        key={index}
        className={index !== images.length - 1 ? "pr-2" : ""}
      >
        <div className="bg-gray-100 rounded-2xl overflow-hidden w-full max-w-[600px] aspect-square">
          <Image
            src={item?.image || '/placeholder.png'} // fallback image
            alt={`Slide ${index + 1}`}
            layout="responsive"
            width={400}
            height={400}
            className="rounded-2xl object-contain"
          />
        </div>
      </div>
    ))}
  </Slider>
) : (
  <div className="text-center text-gray-400 py-8">No images available</div>
)}



  {/* Thumbnail Slider */}

{images?.length > 0 && (
  <Slider
    asNavFor={nav1}
    ref={(slider2) => setNav2(slider2)}
    slidesToShow={images.length} // number of thumbnails = number of images
    swipe={false}
    draggable={false}
    arrows={false}
    infinite={false}
    focusOnSelect={true}
    className="mt-4 px-0 thumbnail-slider"
  >
    {images.map((item, index) => (
      <div key={index}>
        <Image
          src={item?.image || '/placeholder.png'}
          alt={`Thumb ${index}`}
          width={130}
          height={100}
          className="rounded-xl border border-gray-300 hover:border-black transition object-cover"
        />
      </div>
    ))}
  </Slider>
)}







  {/* Meta Info */}
 <div className="flex flex-col items-start gap-2 mt-4 text-gray-700 text-lg ">
  <div className="flex items-center gap-2">
    <Image src="/calender.png" width={16} height={16} alt="Calendar" />
   <span>{new Date(createdAt).toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})}</span>

  </div>
  <div className="flex items-center gap-2">
    <Image src="/file.png" width={16} height={16} alt="File Size" />
    <span>{fileSize}</span>
  </div>
  <div className="flex items-center gap-2">
    <Image src="/size.png" width={16} height={16} alt="Resolution" />
    <span>{resolution}</span>
  </div>
</div>

</div>


  {/* Product Details */}
  <div className="space-y-4 p-4 border border-gray-300 rounded-xl mt-20 lg:mt-0 mr-4 h-[560px]">
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
    <button className=" h-[40px] border border-[#1C2836] text-[#1C2836] rounded-full w-full font-semibold">
      ADD TO CART
    </button>
    <Link href="/checkout">
      <button className="bg-[#1C2836] h-[40px] rounded-full w-full font-semibold text-white">
        CHECKOUT
      </button>
    </Link>
    <div className=" rounded text-[#939393] text-center">
      <p className='mt-3'>
        Get our bundle pack and Unlock <br />
        <strong>Exclusive Discounts!</strong>
      </p>
      <button className="bg-[#46D8F9] mt-3 h-[40px]  rounded-full w-full font-semibold text-[#1C2836]">
        GET NOW
      </button>
    </div>
  </div>
</section>



      {/* Description Section */}
      <section className='mx-auto lg:p-2 p-4 max-w-[1130px] bg-white lg:mt-11 '>
        <h3 className='mb-2 font-bold text-[#1C2836] text-2xl'>
          Description
        </h3>
        <p className='mb-4 text-[#939393]'>
          {shortDescription}
        </p>
        <h4 className='mb-2 font-bold text-[#1C2836] text-2xl'>
          Which License is Right for You?
        </h4>
       { longDescription }
      </section>

      {/* Recommended Products */}
   <RecommendedProduct/>

      {/* Footer */}
    <Footer/>
    </div>
  )
}

export default page



