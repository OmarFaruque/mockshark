"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "@/CartContext";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import useUser from "../hooks/user";

const Page = () => {
  const { cart, setCart } = useContext(CartContext);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("digital");
  const user = useUser();
  const hasInitialized = useRef(false);

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

  const [isPrefilled, setIsPrefilled] = useState(false);

  // Load cart from localStorage if empty
  useEffect(() => {
    if (cart.length === 0) {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    }
  }, []);

  // Prefill form with user data
  useEffect(() => {
    if (user && !isPrefilled) {
      setFormData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          billingFirstName: prev.profile.billingFirstName || user.name || "",
          billingLastName: prev.profile.billingLastName || user.fullname || "",
          billingEmail: prev.profile.billingEmail || user.email || "",
        },
      }));
      setIsPrefilled(true);
    }
  }, [user, isPrefilled]);

  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/auth/users/${userId}`,
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

  // Initialize selected variants
  useEffect(() => {
    const initialVariants = {};
    cart.forEach((item) => {
      initialVariants[item.id] = item.productAttributes?.[0]?.size || "";
    });
    setSelectedVariants(initialVariants);
  }, [cart]);

  // Load checkout product from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("checkoutItem");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCheckoutProduct(parsed);
    }
  }, []);

  const handleVariantChange = (itemId, size) => {
    setSelectedVariants((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("✅ Product Removed From Cart!", {
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  // Calculate subtotal
  let subtotal = 0;

  if (checkoutProduct) {
    // Only calculate checkout product price if it exists
    subtotal = checkoutProduct.price * checkoutProduct.quantity;
  } else {
    // Calculate cart items subtotal if no checkout product
    subtotal = cart.reduce((acc, item) => {
      const selectedSize = item.selectedSize || item.productAttributes?.[0]?.size;
      const selectedVariant = item.productAttributes.find(
        (v) => v.size === selectedSize
      );
      const price = selectedVariant?.costPrice ?? 0;
      return acc + price * item.quantity;
    }, 0);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isBundle =
      checkoutProduct &&
      !checkoutProduct.productId &&
      !checkoutProduct.productAttributeId;

    // Handle bundle order
    if (isBundle) {
      const payload = {
        userId,
        bundleId: "bundle-" + checkoutProduct.variant.split(" ")[0],
        credits: parseInt(checkoutProduct.variant),
        price: checkoutProduct.price,
        invoiceNumber: "INV-" + Date.now(),
        billingFirstName: formData.profile.billingFirstName || user?.name || "",
        billingLastName:
          formData.profile.billingLastName || user?.fullname || "",
        billingCompany: formData.profile.billingCompany,
        billingCountry: formData.profile.billingCountry,
        billingEmail: formData.profile.billingEmail || user?.email || "",
        billingPhone: formData.profile.billingPhone,
        address: formData.profile.address,
        apartment: formData.profile.apartment,
        city: formData.profile.city,
        state: formData.profile.state,
        postalCode: formData.profile.postalCode,
        subtotalCost: checkoutProduct.price,
      };

      try {
        const res = await fetch("${process.env.NEXT_PUBLIC_API_BASE_URL}/bundles/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Bundle order failed");

        toast.success("✅ Bundle order placed!");
        localStorage.removeItem("checkoutItem");
        setCheckoutProduct(null);
        return;
      } catch (err) {
        toast.error(" Failed to place bundle order");
        console.error(err);
        return;
      }
    }

    const orderItems = [];

    if (checkoutProduct) {
      // Only process checkout product if it exists (not a bundle)
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
        licenseType: checkoutProduct.variant,
      });
    } else {
      // Process cart items if no checkout product
      cart.forEach((item) => {
        const selectedSize =
          item.selectedSize ||
          selectedVariants[item.id] ||
          item.productAttributes?.[0]?.size;

        const selectedVariant = item.productAttributes?.find(
          (v) => v.size === selectedSize
        );

        if (!selectedVariant) {
          console.error(`❌ selectedVariant not found for item:`, {
            id: item.id,
            selectedSize,
            productAttributes: item.productAttributes,
          });
          return; // skip this item
        }

        orderItems.push({
          productId: item.id,
          productAttributeId: selectedVariant.id,
          name: item.name,
          size: selectedVariant.size,
          costPrice: selectedVariant.costPrice,
          retailPrice: selectedVariant.retailPrice,
          discountedRetailPrice:
            selectedVariant.discountedRetailPrice || selectedVariant.retailPrice,
          quantity: item.quantity,
          totalCostPrice: selectedVariant.costPrice * item.quantity,
          totalPrice: selectedVariant.retailPrice * item.quantity,
          licenseType: selectedVariant.size.toLowerCase(),
        });
      });
    }

    const payload = {
      userId,
      billingFirstName: formData.profile.billingFirstName || user?.name || "",
      billingLastName: formData.profile.billingLastName || user?.fullname || "",
      billingCompany: formData.profile.billingCompany,
      billingCountry: formData.profile.billingCountry,
      billingEmail: formData.profile.billingEmail || user?.email || "",
      billingPhone: formData.profile.billingPhone,
      address: formData.profile.address,
      apartment: formData.profile.apartment,
      city: formData.profile.city,
      state: formData.profile.state,
      postalCode: formData.profile.postalCode,
      orderItems,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("✅ Order API result:", result);

      if (!res.ok) {
        toast.error(result.message || "Order submission failed");
        return;
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "✅ Order placed successfully!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      // Clear cart and checkout product after successful order
      setCart([]);
      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutItem");
      setCheckoutProduct(null);
    } catch (error) {
      console.error("❌ Order error:", error);
      toast.error(error.message || "❌ Order failed");
    }
  };

  const updateBillingInfo = async () => {
    const id = Cookies.get("userId");
    const formDataToSend = new FormData();
    formDataToSend.append(
      "billingFirstName",
      formData?.profile?.billingFirstName || ""
    );
    formDataToSend.append(
      "billingLastName",
      formData?.profile?.billingLastName || ""
    );
    formDataToSend.append(
      "billingCompany",
      formData?.profile?.billingCompany || ""
    );
    formDataToSend.append(
      "billingEmail",
      formData?.profile?.billingEmail || ""
    );
    formDataToSend.append(
      "billingPhone",
      formData?.profile?.billingPhone || ""
    );
    formDataToSend.append(
      "billingCountry",
      formData?.profile?.billingCountry || ""
    );
    formDataToSend.append("address", formData?.profile?.address || "");
    formDataToSend.append("apartment", formData?.profile?.apartment || "");
    formDataToSend.append("city", formData?.profile?.city || "");
    formDataToSend.append("state", formData?.profile?.state || "");
    formDataToSend.append("postalCode", formData?.profile?.postalCode || "");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/auth/users/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        profile: data.user,
      }));

      toast.success("Information updated successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Billing Info */}
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1C2836]">
            Billing Information
          </h2>
          <form className="space-y-4 w-full text-black" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.profile?.billingFirstName || user?.name || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profile: {
                      ...prev.profile,
                      billingFirstName: e.target.value,
                    },
                  }))
                }
                className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
                placeholder="First Name"
              />

              <input
                type="text"
                value={
                  formData.profile?.billingLastName || user?.fullname || ""
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profile: {
                      ...prev.profile,
                      billingLastName: e.target.value,
                    },
                  }))
                }
                className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
                placeholder="Last Name"
              />
            </div>

            <input
              type="text"
              value={formData.profile?.billingCompany ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, billingCompany: e.target.value },
                }))
              }
              className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
              placeholder="Company Name"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="email"
                value={formData.profile?.billingEmail || user?.email || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profile: { ...prev.profile, billingEmail: e.target.value },
                  }))
                }
                className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
                placeholder="Email"
              />

              <input
                type="tel"
                value={formData.profile?.billingPhone ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profile: { ...prev.profile, billingPhone: e.target.value },
                  }))
                }
                className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
                placeholder="Phone"
              />
            </div>

            <input
              type="text"
              value={formData.profile?.billingCountry ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, billingCountry: e.target.value },
                }))
              }
              className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
              placeholder="Country"
            />

            <input
              type="text"
              value={formData.profile?.address ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, address: e.target.value },
                }))
              }
              className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
              placeholder="Address"
            />

            <input
              type="text"
              value={formData.profile?.apartment ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, apartment: e.target.value },
                }))
              }
              className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
              placeholder="Apartment"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.profile?.city ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profile: { ...prev.profile, city: e.target.value },
                  }))
                }
                className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
                placeholder="City"
              />
              <input
                type="text"
                value={formData.profile?.postalCode ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profile: { ...prev.profile, postalCode: e.target.value },
                  }))
                }
                className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
                placeholder="Postal Code"
              />
            </div>

            <input
              type="text"
              value={formData.profile?.state ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  profile: { ...prev.profile, state: e.target.value },
                }))
              }
              className="border border-[#b7b7b7] px-4 py-2 rounded w-full"
              placeholder="State"
            />
          </form>

          <button
            type="button"
            onClick={updateBillingInfo}
            className="bg-[#7CB84D] font-bold text-[#1C2836] py-2 px-16 rounded-lg hover:bg-green-700 w-full sm:w-auto mt-3"
          >
            SAVE
          </button>
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

              {/* Show either checkout product or cart items */}
              {checkoutProduct ? (
                <div className="mt-4">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#1C2836] font-medium">
                        {checkoutProduct.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({checkoutProduct.variant})
                      </span>

                      {/* <button
                        onClick={() => {
                          localStorage.removeItem("checkoutItem");
                          setCheckoutProduct(null);
                          toast.success("✅ Checkout item removed!");
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button> */}
                    </div>
                    <div className="text-[#1C2836] font-medium">
                      $
                      {(
                        checkoutProduct.price * checkoutProduct.quantity
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              ) : (
                cart.map((item, index) => {
                  const selectedSize = item.selectedSize;
                  const selectedVariant = item.productAttributes.find(
                    (v) => v.size === selectedSize
                  );
                  const price = selectedVariant?.costPrice ?? 0;
                  const itemTotal = price * item.quantity;
                  const uniqueKey = `${item.id}-${selectedSize}-${index}`;

                  return (
                    <div
                      key={uniqueKey}
                      className="flex justify-between items-center py-2 border-t border-[#b7b7b7]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[#1C2836] font-medium">
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          ({selectedSize})
                        </span>
                        {/* <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button> */}
                      </div>
                      <span className="text-[#1C2836] font-medium">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>
                  );
                })
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
              YOUR TOTAL:{" "}
              <span className="text-[#1C2836]">${subtotal.toFixed(2)}</span>
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
    </div>
  );
};

export default Page;