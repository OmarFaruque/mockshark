"use client";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CartContext } from "@/CartContext";

export default function SubcategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/subcategory/${slug}/products`
        );
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setProducts(json.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  const { addToCart, cartCount } = useContext(CartContext);
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 text-white">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          Products under: {slug}
        </h1>

        {loading ? (
          <p className="text-white p-4">Loading products...</p>
        ) : !products.length ? (
          <p className="text-white p-4">
            No products found in this subcategory.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const personalAttr = product.productAttributes?.find(
                (v) => v.size === "Personal"
              );
              return (
                <Link
                  key={product.id}
                  href={`/product-details/${product.id}`}
                  className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition lg:h-[530px]"
                >
                  <div className="pb-4">
                    <img
                      src={
                        product?.images?.[0]?.image ||
                        "https://via.placeholder.com/262"
                      }
                      alt={product?.title}
                      className="rounded-t-2xl  object-contain mb-4 bg-[#E6E6E6]"
                    />

                   
                      <h3 className="text-[18px] text-center lg:text-[15px] font-bold text-gray-800 leading-tight line-clamp-2 px-4 h-[40px]">
                        {product.name}
                      </h3>

                      <div className="mt-4 mb-4">
                        <div className="text-[24px] font-extrabold text-gray-900 text-center">
                          ${personalAttr?.costPrice ?? "N/A"}
                        </div>
                        <div className="text-[14px] text-gray-400 line-through text-center">
                          Regular Price: ${personalAttr?.retailPrice ?? "N/A"}
                        </div>
                      </div>
                      <div className="p-4">
                        <button
                          className="py-2 px-4 font-medium text-sm hover:bg-gray-100 transition bg-[#E8E8E8] w-full rounded-full text-black"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                          }}
                        >
                          + Add to Cart
                        </button>
                      </div>
                  
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
