"use client";
import DOMPurify from "dompurify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useRef, useEffect, useContext } from "react";
import { Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import RecommendedProduct from "@/app/components/RecommendedProduct";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "@/CartContext";

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
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const userId = Cookies.get("userId");
  const roleId = Cookies.get("roleId");
  const productId = id; // assuming id is the product ID from the URL
  const token = Cookies.get("token");
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 reviews
  const [showAll, setShowAll] = useState(false); // Toggle state
  const [selectedVariant, setSelectedVariant] = useState(null); // default is first variant

  const router = useRouter();

  const [creditsLeft, setCreditsLeft] = useState(0);
  const [userHasBundle, setUserHasBundle] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  const ADMIN_ROLE_ID = "7b307c77-ca01-4f9f-8935-f9b67f412fb9";

  // useEffect(() => {
  //   const fetchCredits = async () => {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/credits`);
  //       const data = await res.json();

  //       if (data.success) {
  //         const remaining = data.data.remaining; // ✅ your structure
  //         setCreditsLeft(remaining);
  //         setUserHasBundle(remaining > 0);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch credits", err);
  //     }
  //   };

  //   if (userId) {
  //     fetchCredits();
  //   }
  // }, [userId]);

  const handleBuyNow = async (productId) => {
    try {
      const userId = Cookies.get("userId");
      if (!userId) {
        toast.error("Please log in first");
        return;
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/download-with-credit`,
        {
          params: { userId, productId },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Reduce local credits count immediately for UI update
        setUserCredits((prev) => prev - 1);
        // Open download link
        // window.open(res.data?.downloadUrl, "_blank");
        window.location.reload();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Download failed. Please try again.");
      console.error(error);
    }
  };

  const handleCheckout = () => {
    const userId = Cookies.get("userId");
    if (!userId) {
      toast.error("Please log in first");
      window.location.href = "/login";
      return;
    }
    if (!selectedVariant || !selectedVariant.id) {
      toast.error("Please Select a Variant ");
      return;
    }

    const checkoutItem = {
      productId: product.id,
      productAttributeId: selectedVariant.id,
      name: product.name,
      image: product?.images?.[0]?.image,
      variant: selectedVariant.size,
      price: selectedVariant.costPrice,
      quantity: 1,
    };

    console.log("Saving to localStorage:", checkoutItem); // Debug
    localStorage.setItem("checkoutItem", JSON.stringify(checkoutItem));
    router.push("/checkout");
  };

  const currentUser = {
    _id: Cookies.get("userId"), // or whatever key you use
    name: Cookies.get("name") || "Anonymous",
    avatar: "https://cdn-icons-png.flaticon.com/512/9368/9368192.png", // default fallback
  };

  const handleSubmit = async () => {
    if (!token) {
      toast.error("Please login to submit a review.");
      return;
    }

    if (!rating || !comment.trim()) {
      toast.error("Please provide both rating and comment.");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`,
        {
          productId,
          userId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reviewWithUser = {
        ...res.data.data,
        user: {
          name: currentUser?.name || "You",
          avatar:
            currentUser?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/9368/9368192.png",
          _id: userId,
        },
      };

      setReviews((prev) => [reviewWithUser, ...prev]);

      setRating(0);
      setComment("");

      toast.success("Review submitted successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit review. Try again."
      );
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted review from the list
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));

      toast.success("Review deleted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/products/${id}`
        );
        const data = await res.json();
        console.log("Fetched product data:", data);
        setProduct(data?.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
    const fetchUserCredits = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) return;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/auth/users/${userId}`
        );
        setUserCredits(
          res.data?.data?.credits - res.data?.data?.creditsUsed || 0
        );
      } catch (error) {
        console.error("Failed to fetch user credits", error);
      }
    };
    fetchUserCredits();
  }, [id]);

  useEffect(() => {
    setReviews(product?.review || []);
  }, [product]);

  const { addToCart, cartCount } = useContext(CartContext);

  const products = [
    {
      id: 1,
      title: "Woman Hoodie Mockup Front View PSD",
      price: "$2.99",
      oldPrice: "$3.99",
      image:
        "https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png",
    },
    {
      id: 2,
      title: "Woman Hoodie Mockup Front View PSD",
      price: "$2.99",
      oldPrice: "$3.99",
      image:
        "https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png",
    },
    {
      id: 3,
      title: "Woman Hoodie Mockup Front View PSD",
      price: "$2.99",
      oldPrice: "$3.99",
      image:
        "https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png",
    },
    {
      id: 4,
      title: "Woman Hoodie Mockup Front View PSD",
      price: "$2.99",
      oldPrice: "$3.99",
      image:
        "https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png",
    },
    {
      id: 5,
      title: "Woman Hoodie Mockup Front View PSD",
      price: "$2.99",
      oldPrice: "$3.99",
      image:
        "https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png",
    },
    {
      id: 6,
      title: "Woman Hoodie Mockup Front View PSD",
      price: "$2.99",
      oldPrice: "$3.99",
      image:
        "https://i.postimg.cc/MKr3759W/Whats-App-Image-2025-05-06-at-11-27-48-AM-removebg-preview.png",
    },
  ];

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const mainSlider = useRef(null);
  const thumbSlider = useRef(null);

  //  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const thumbnails = [
    "/mockup-1.png",
    "/mockup-1.png",
    "/mockup-3.png",
    "/mockup-3.png",
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

  //  if (loading) {
  //   return (
  //     <div className="animate-pulse p-4 max-w-7xl mx-auto">
  //       {/* Image slider skeleton */}
  //       <div className="flex gap-4">
  //         <div className="w-full max-w-[600px] aspect-square bg-gray-200 rounded-2xl" />

  //         {/* Text section */}
  //         <div className="flex-1 space-y-4">
  //           <div className="h-6 w-2/3 bg-gray-200 rounded" />
  //           <div className="h-4 w-1/3 bg-gray-200 rounded" />
  //           <div className="h-4 w-1/2 bg-gray-200 rounded" />
  //           <div className="h-4 w-1/4 bg-gray-200 rounded" />
  //           <div className="h-36 w-full bg-gray-200 rounded mt-4" />
  //         </div>
  //       </div>

  //       {/* Thumbnail skeleton */}
  //       <div className="flex gap-4 mt-6">
  //         {[...Array(4)].map((_, i) => (
  //           <div
  //             key={i}
  //             className="w-[130px] h-[100px] bg-gray-200 rounded-xl"
  //           />
  //         ))}
  //       </div>

  //       {/* Description section skeleton */}
  //       <div className="mt-10 space-y-3">
  //         <div className="h-5 w-1/3 bg-gray-200 rounded" />
  //         <div className="h-4 w-full bg-gray-200 rounded" />
  //         <div className="h-4 w-5/6 bg-gray-200 rounded" />
  //         <div className="h-4 w-2/3 bg-gray-200 rounded" />
  //       </div>
  //     </div>
  //   );
  // }

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

  if (!product)
    return <div className="text-center py-10">Product not found.</div>;
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
    createdAt,
  } = product;

  const handleShowMore = () => {
    setVisibleCount(reviews.length);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleCount(3); // Reset to initial count
    setShowAll(false);
  };

  const attributeOrder = ["Personal", "Commercial", "Extended Commercial"];

  

  return (
    <div>
      <Navbar />
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
                      src={item?.image || "/placeholder.png"} // fallback image
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
            <div className="text-center text-gray-400 py-8">
              No images available
            </div>
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
                    src={item?.image || "/placeholder.png"}
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
              <Image
                src="/calender.png"
                width={16}
                height={16}
                alt="Calendar"
              />
              <span>
                {new Date(createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
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
        <div className="space-y-4 p-4 border border-gray-300 rounded-xl mt-20 lg:mt-0 mr-4 max-h-[620px] ">
          <p className="text-[#C0C0C0] text-sm">
            ⭐⭐⭐⭐⭐ {product?.review?.length} Reviews
          </p>
          <h2 className="font-bold text-[#1C2836] text-xl">{name}</h2>
          <div className="space-y-4 text-[#1C2836]">
            {[...productAttributes]
              .sort(
                (a, b) =>
                  attributeOrder.indexOf(a.size) -
                  attributeOrder.indexOf(b.size)
              )
              .map((attr, idx) => (
                <label
                  key={idx}
                  className="flex justify-between items-center px-2 py-2 rounded cursor-pointer"
                >
                  <span>
                    <input
                      type="radio"
                      name="license"
                      className="mr-2"
                      value={attr.size}
                      onChange={() => setSelectedVariant(attr)}
                    />
                    {attr.size}
                  </span>
                  <span className="font-bold">${attr.costPrice}</span>
                </label>
              ))}
          </div>

          <p className="text-[#1C2836] text-xs">
            Which one is better for you?{" "}
            <Link href="/license-types" className="text-sky-500 underline">
              {" "}
              See License
            </Link>
          </p>
          <button
            className="h-[40px] border border-[#1C2836] text-[#1C2836] rounded-full w-full font-semibold"
            onClick={(e) => {
              e.preventDefault();
              if (selectedVariant) {
                addToCart(product, selectedVariant);
              } else {
                toast.error("Please select a license before adding to cart.");
              }
            }}
          >
            ADD TO CART
          </button>

          <button
            onClick={handleCheckout}
            className="bg-[#1C2836] h-[40px] rounded-full w-full font-semibold text-white"
          >
            CHECKOUT
          </button>

          {userCredits > 0 && (
            <button
              onClick={() => handleBuyNow(product.id)}
              className="h-[40px] border  bg-green-400 border-[#1C2836] text-[#1C2836] rounded-full w-full font-semibold"
            >
              Download using credits
            </button>
          )}

          <div className=" rounded text-[#939393] text-center">
            <p className="mt-3">
              Get our bundle pack and Unlock <br />
              <strong>Exclusive Discounts!</strong>
            </p>
            <Link href="/Bundle-Deals">
              <button className="bg-[#46D8F9] mt-3 h-[40px]  rounded-full w-full font-semibold text-[#1C2836]">
                GET NOW
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="mx-auto lg:p-2 p-4 max-w-[1130px] bg-white lg:mt-11 ">
        <h3 className="mb-2 font-bold text-[#1C2836] text-2xl">Description</h3>
        <p className="mb-4 text-[#939393]">{shortDescription}</p>
        <h4 className="mb-2 font-bold text-[#1C2836] text-2xl">
          Which License is Right for You?
        </h4>

        <div
          className="text-[#939393] prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(longDescription),
          }}
        />
      </section>
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-md shadow-cyan-200 p-6 space-y-6 border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 text-center">
          Write a Review
        </h3>

        {/* Stars */}
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`rounded-full p-2 transition ${
                rating >= star
                  ? "bg-yellow-400 text-white"
                  : "bg-gray-100 hover:bg-yellow-100"
              }`}
            >
              <Star
                className="w-5 h-5"
                fill={rating >= star ? "white" : "none"}
              />
            </button>
          ))}
        </div>

        {/* Textarea */}
        <div className="flex justify-center">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-[410px] p-4 rounded-md bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none resize-none"
            placeholder="Share your experience..."
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-xl shadow-md"
          >
            Submit Review
          </button>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-200" />

        <h4 className="text-xl font-semibold text-gray-700">
          Customer Reviews
        </h4>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet.</p>
          ) : (
            reviews.slice(0, visibleCount).map((r) => (
              <div
                key={r._id}
                className="bg-gray-50 rounded-xl p-4 shadow-sm flex justify-between items-start"
              >
                <div className="flex gap-3">
                  <img
                    src={
                      r?.user?.image ||
                      "https://cdn-icons-png.flaticon.com/512/9368/9368192.png"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">
                      {r?.user?.name || "Anonymous"}
                    </p>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{r.comment}</p>
                  </div>
                </div>

                {(r.userId === userId || roleId === ADMIN_ROLE_ID) && (
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete this comment"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))
          )}

          {/* Show More Button */}
          {reviews.length > 3 && (
            <div className="pt-2 text-center">
              {!showAll ? (
                <button
                  onClick={handleShowMore}
                  className="text-cyan-600 font-semibold hover:underline"
                >
                  Show more reviews
                </button>
              ) : (
                <button
                  onClick={handleShowLess}
                  className="text-cyan-600 font-semibold hover:underline"
                >
                  Show less reviews
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Recommended Products */}
      <RecommendedProduct />

      {/* Footer */}
      <Footer />

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default page;
