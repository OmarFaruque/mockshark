"use client";

import { useContext, useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "@/CartContext";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Page = () => {
 const { cart, setCart } = useContext(CartContext);

useEffect(() => {
  if (cart.length === 0) {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }
}, []);

  const [selectedVariants, setSelectedVariants] = useState({});
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  const [formData, setFormData] = useState({
    profile: {
      name: "",
      fullname: "",
      email: "",
      about: "",
      image: "",
      phone: "",
      language: "",
      country: "",
      billingFirstName: "",
      billingLastName: "",
      billingCompany: "",
      billingEmail: "",
      billingPhone: "",
      billingCountry: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    },
    personal: {},
    billing: {
      company: "mockshark",
      streetAddress: "",
      apartment: "",
      city: "",
      zipCode: "",
      state: "",
    },
  });

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://mockshark-backend.vercel.app/api/v1/customer/auth/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setFormData({ profile: data.data });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  useEffect(() => {
    const initialVariants = {};
    cart.forEach((item) => {
      initialVariants[item.id] = item.productAttributes?.[0]?.size || "";
    });
    setSelectedVariants(initialVariants);
  }, [cart]);

  const handleVariantChange = (itemId, size) => {
    setSelectedVariants((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("✅ Product removed from cart!");
  };

  // const subtotal = cart.reduce((acc, item) => {
  //   const selectedSize = selectedVariants[item.id] || item.productAttributes?.[0]?.size;
  //   const selectedVariant = item.productAttributes.find(v => v.size === selectedSize);
  //   const price = selectedVariant?.retailPrice ?? 0;
  //   return acc + price * item.quantity;
  // }, 0);
const checkoutProductPrice = checkoutProduct?.productAttributes?.[0]?.retailPrice || 0;

let subtotal = cart.reduce((acc, item) => {
  const selectedSize = selectedVariants[item.id] || item.productAttributes?.[0]?.size;
  const selectedVariant = item.productAttributes.find(v => v.size === selectedSize);
  const price = selectedVariant?.retailPrice ?? 0;
  return acc + price * item.quantity;
}, 0);

if (checkoutProduct) {
  subtotal += checkoutProduct.price * checkoutProduct.quantity;
}

 const handleSubmit = async (e) => {
  e.preventDefault();

  const orderItems = [];

  // Handle cart items
  cart.forEach((item) => {
    const selectedSize = selectedVariants[item.id] || item.productAttributes?.[0]?.size;
    const selectedVariant = item.productAttributes?.find(v => v.size === selectedSize);

    orderItems.push({
      productId: item.id,
      productAttributeId: selectedVariant?.id,
      name: item.name,
      size: selectedVariant?.size,
      costPrice: selectedVariant?.costPrice,
      retailPrice: selectedVariant?.retailPrice,
      discountedRetailPrice: selectedVariant?.discountedRetailPrice || selectedVariant?.retailPrice,
      quantity: item.quantity,
      totalCostPrice: selectedVariant?.costPrice * item.quantity,
      totalPrice: selectedVariant?.retailPrice * item.quantity,
       licenseType:"personal"
    });
  });

  // Handle single checkoutProduct
  if (checkoutProduct) {
    orderItems.push({
      productId: checkoutProduct.productId,
      productAttributeId: checkoutProduct.productAttributeId,
      name: checkoutProduct.name,
      size: checkoutProduct.variant,
      costPrice: checkoutProduct.price,
      retailPrice: checkoutProduct.price,
      discountedRetailPrice: checkoutProduct.price,
      quantity: checkoutProduct.quantity,
      totalCostPrice: checkoutProduct.price * checkoutProduct.quantity,
      totalPrice: checkoutProduct.price * checkoutProduct.quantity,
       licenseType: checkoutProduct.variant
    });
  }

  const payload = {
    userId,
    billingFirstName: formData.profile.billingFirstName,
    billingLastName: formData.profile.billingLastName,
    billingCompany: formData.profile.billingCompany,
    billingCountry: formData.profile.billingCountry,
    billingEmail: formData.profile.billingEmail,
    billingPhone: formData.profile.billingPhone,
    address: formData.profile.address,
    apartment: formData.profile.apartment,
    city: formData.profile.city,
    state: formData.profile.state,
    postalCode: formData.profile.postalCode,
    orderItems,
  };

  try {
    const res = await fetch("https://mockshark-backend.vercel.app/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Order submission failed");

    toast.success("✅ Order placed successfully!");

    // Cleanup
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("checkoutItem");
    setCheckoutProduct(null);
  } catch (error) {
    console.error(error);
    toast.error("❌ Failed to place order");
  }
};


useEffect(() => {
  const stored = localStorage.getItem("checkoutItem");
  if (stored) {
    const parsed = JSON.parse(stored);
    setCheckoutProduct(parsed);
  }
}, []);



  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Billing Info */}
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1C2836]">
            Billing Information
          </h2>
          {/* Form omitted for brevity */}
          <form className="space-y-4 w-full text-black" onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <input
      type="text"
      value={formData.profile.billingFirstName}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, billingFirstName: e.target.value },
        })
      }
      className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
    />
    <input
      type="text"
      value={formData.profile.billingLastName}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, billingLastName: e.target.value },
        })
      }
      className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
    />
  </div>

  <input
    type="text"
    value={formData.profile.billingCompany}
    onChange={(e) =>
      setFormData({
        ...formData,
        profile: { ...formData.profile, billingCompany: e.target.value },
      })
    }
    className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
  />

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <input
      type="email"
      value={formData.profile.billingEmail}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, billingEmail: e.target.value },
        })
      }
      className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
    />
    <input
      type="tel"
      value={formData.profile.billingPhone}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, billingPhone: e.target.value },
        })
      }
      className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
    />
  </div>

  <input
    type="text"
    value={formData.profile.billingCountry}
    onChange={(e) =>
      setFormData({
        ...formData,
        profile: { ...formData.profile, billingCountry: e.target.value },
      })
    }
    className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
  />

  <input
    type="text"
    value={formData.profile.address}
    onChange={(e) =>
      setFormData({
        ...formData,
        profile: { ...formData.profile, address: e.target.value },
      })
    }
    className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
  />

  <input
    type="text"
    value={formData.profile.apartment}
    onChange={(e) =>
      setFormData({
        ...formData,
        profile: { ...formData.profile, apartment: e.target.value },
      })
    }
    className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
  />

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <input
      type="text"
      value={formData.profile.city}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, city: e.target.value },
        })
      }
      className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
    />
    <input
      type="text"
      value={formData.profile.postalCode}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, postalCode: e.target.value },
        })
      }
      className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
    />
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <input
      type="text"
      value={formData.profile.state}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, state: e.target.value },
        })
      }
      className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
    />
    <input
      type="text"
      value={formData.profile.postalCode}
      onChange={(e) =>
        setFormData({
          ...formData,
          profile: { ...formData.profile, postalCode: e.target.value },
        })
      }
      className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
    />
  </div>

  <button
    type="submit"
    className="bg-[#7CB84D] font-bold text-[#1C2836] py-2 px-16 rounded-lg hover:bg-green-700 w-full sm:w-auto"
  >
    SAVE
  </button>
</form>
        </div>

        {/* Payment Details */}
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1C2836]">
            Payment Details
          </h2>
          <div className="border border-[#b7b7b7] rounded p-6 w-full">
            <div className="mb-4">
              <div className="flex justify-between font-bold">
                <span className="text-[#6f6f6f] text-[17px]">PRODUCT</span>
                <span className="text-[#6f6f6f] text-[17px]">SUB TOTAL</span>
              </div>

              {cart.map((item) => {
                const selectedSize = selectedVariants[item.id] || item.productAttributes?.[0]?.size;
                const selectedVariant = item.productAttributes.find(v => v.size === selectedSize);
                const price = selectedVariant?.costPrice ?? 0;
                const itemTotal = price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-t border-[#b7b7b7]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#1C2836] font-medium">{item.name}</span>
                      {/* <select
                        value={selectedSize}
                        onChange={(e) => handleVariantChange(item.id, e.target.value)}
                        className="ml-2 border rounded px-1 py-0.5 text-sm"
                      >
                       {item.productAttributes
  ?.sort((a, b) => {
    if (a.size === "Personal") return -1;
    if (b.size === "Personal") return 1;
    return 0;
  })
  .map((variant) => (
    <option key={variant.id} value={variant.size}>
      {variant.size}
    </option>
))}

                      </select> */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <span className="text-[#1C2836] font-medium">
                      ${itemTotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
{checkoutProduct && (
  <div className="mt-4 border-t pt-4 border-[#b7b7b7]">
   
   <div className="flex justify-between items-center py-2">
  <div className="flex items-center gap-2">
    <span className="text-[#1C2836] font-medium">{checkoutProduct.name}</span>
    <button
      onClick={() => {
        localStorage.removeItem("checkoutItem");
        setCheckoutProduct(null);
        toast.success("✅ Checkout item removed!");
      }}
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 size={18} />
    </button>
  </div>
  <div className="text-[#1C2836] font-medium">
    ${(checkoutProduct.price * checkoutProduct.quantity).toFixed(2)}
  </div>
</div>

  </div>
)}


              <div className="flex justify-between items-center font-bold text-[#1C2836] border-t border-[#b7b7b7] pt-2">
                <span className="text-[#6f6f6f] text-[17px]">SUBTOTAL</span>
                <span className="text-[25px]">${subtotal.toFixed(2)}</span>
              </div>
            </div>
 <div className="flex items-center flex-col lg:flex-row lg:justify-between gap-4 lg:gap-1 mb-4">
              <input
                type="text"
                placeholder="Coupon code"
                className="border border-[#b7b7b7] px-3 py-2 rounded w-64 "
              />
              <button className="bg-[#7CB84D] text-white px-12 py-2 rounded-lg hover:bg-green-700">
                APPLY COUPON
              </button>
            </div>
            <div className="text-center text-[#c1c1c1] mt-20 font-bold text-lg">
              YOUR TOTAL: <span className="text-[#1C2836]">${subtotal.toFixed(2)}</span>
            </div>

            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="w-full mt-4 bg-[#006a4e] text-white py-2 rounded-lg hover:bg-green-700 font-bold"
              >
                PLACE ORDER
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Page;
