"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts } from "../../lib/hooks/useGetProductsByCategory"
import { FiHeart } from "react-icons/fi";
import { Breadcrumbs } from "@mui/material";
import SortDropdown from "../reusables/SortDropdown";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


export default function ViewProductsByCategory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  // const category = searchParams.get("category");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  //   const [breadcrumbs] = useState([
  //   { label: 'Home', path: '/' },
  //   { label: 'Category', path: '/category' },
  //   { label: 'Product', path: '/category/product' }
  // ]);
  const [sortBy, setSortBy] = useState("newest");
  const searchParams = useSearchParams();
  const category = searchParams.get("category")?.toLowerCase().trim();
  console.log("🚀 Category param:", category);
  console.log(`➡️ Fetching: https://mandelazz-webapp.azurewebsites.net/api/product?category=${category}`);

  useEffect(() => {
    if (category) {
      setBreadcrumbs([
        { label: "Home", path: "/", className: "text-[#8D8C8C] text-sm font-normal" },
        { label: category.charAt(0).toUpperCase() + category.slice(1), path: `/category?category=${category}`, className: "text-[#172314] text-sm font-normal" },
        // { label: "Products", path: `/category/product?category=${category}` }
      ]);
    }
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getProducts(category);
        const sorted = sortProducts(products, sortBy);
        console.log("Fetched products:", products);
        // setProducts(Array.isArray(products) ? products : []);
        setProducts(sorted);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category, sortBy]);

  const handleAddToFavorites = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleOptions = (id) => {
    // navigation or modal here
    console.log("Choose options for", id);
  };

  const sortProducts = (products, sortKey) => {
    if (!Array.isArray(products)) return [];

    switch (sortKey) {
      case "priceLow":
        return [...products].sort((a, b) => a.price?.$numberDecimal - b.price?.$numberDecimal);
      case "priceHigh":
        return [...products].sort((a, b) => b.price?.$numberDecimal - a.price?.$numberDecimal);
      case "popularity":
        return [...products].sort((a, b) => b.popularity - a.popularity); // adjust based on backend
      case "newest":
      default:
        return products; // assume API returns newest first
    }
  };

  // Add your JSX from your message here
  return (
    <div className="p-4 md:p-10 ">
      <div className="mb-6 md:ml-12 md:py-6">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          {breadcrumbs.map((crumb, index) => (
            <a key={index} href={crumb.path} className="text-gray-500 hover:text-gray-900 text-left">
              {crumb.label}
            </a>
          ))}
        </Breadcrumbs>
      </div>
      {/* <div className="flex flex-row items-center justify-between mr-12 md:flex-row "> */}
      <div className="flex flex-col mb-4 md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 mr-0 md:mr-12">
        <p className="text-2xl md:text-[32px] font-bold text-[#061410] mb-6 text-left md:text-left md:ml-12 capitalize md:mt-6">
          {category} Products
        </p>
        {/* <SortDropdown onSortChange={(sortedProducts) => setProducts(sortedProducts)} /> */}
        <SortDropdown onSortChange={(value) => setSortBy(value)} />

      </div>

      {/* {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products available.
        </p>
      ) : ( */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#26735B]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-6 sm:ml-6 md:grid-cols-3 lg:grid-cols-4 gap-6 md:ml-8 cursor-pointer min-h-[400px] ">
          {Array.isArray(products) ? products.map((product) => (
            <div key={product._id} className="w-full max-w-[300px]">
              <div style={{ width: '400px', borderRadius: '8px', overflow: 'hidden' }} className="card-container">
                {/* Header */}
                <div className="card-header w-full relative h-[250px]">
                  <img
                    alt={product.name}
                    src={product.variations?.[0]?.images?.[0] ?? "/fallback.png"}
                    className="w-full rounded-t-lg object-cover h-[250px]"
                  />
                  <button
                    onClick={() => handleAddToFavorites(product._id)}
                    className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105
                      ${favorites.includes(product._id) ? "bg-[#26735B]" : "bg-white"}`}
                    aria-label="Save for later"
                  >
                    <FiHeart className={favorites.includes(product._id) ? "bg-[#26735B]" : "text-[#191818]"} />
                  </button>
                </div>

                {/* Title */}
                <div className="card-title w-full mt-2">
                  <p className="text-center sm:text-left text-base font-normal text-[#061410]">{product.name}</p>
                </div>

                {/* Subtitle (Price) */}
                <div className="card-subtitle w-full">
                  <p className="text-center sm:text-left text-[#061410] text-lg font-bold">
                    {product.price?.$numberDecimal ?? "N/A"}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex gap-4 border border-[#26735B] rounded-lg text-[#26735B] mt-4 w-full">
                  <button
                    type="button"
                    onClick={() => handleOptions(product._id)}
                    className="w-full h-[48px] text-base font-bold font-manrope cursor-pointer"
                  >
                    Choose Options
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500 text-lg mt-10">
              No products available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
