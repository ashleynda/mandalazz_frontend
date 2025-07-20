"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../../lib/hooks/useGetProductsByCategory"
import { FiHeart } from "react-icons/fi";
import { Breadcrumbs, Rating } from "@mui/material";
import SortDropdown from "../reusables/SortDropdown";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { fetchProducts } from "../../lib/hooks/useFetchProducts";
import { FaHeart } from "react-icons/fa";
import useSnackbarStore from '../../lib/store/useSnackbarStore';

export default function ViewProductsByCategory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [ratingValue, setRatingValue] = useState(3.5);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const router = useRouter();
  const [sortBy, setSortBy] = useState("newest");
  const searchParams = useSearchParams();
  const category = searchParams.get("category")?.toLowerCase().trim();
  const brand = searchParams.get("brand")?.trim();
  const { showSnackbar } = useSnackbarStore();
 
  // useEffect(() => {
  //   if (category) {
  //     setBreadcrumbs([
  //       { label: "Home", path: "/", className: "text-[#8D8C8C] text-sm font-normal" },
  //       { label: category.charAt(0).toUpperCase() + category.slice(1), path: `/category?category=${category}`, className: "text-[#172314] text-sm font-normal" },
  //       // { label: "Products", path: `/category/product?category=${category}` }
  //     ]);
  //   }
  // }, [category]);

  useEffect(() => {
    if (brand || category) {
      setBreadcrumbs([
        { label: "Home", path: "/products", className: "text-[#8D8C8C] text-sm font-normal" },
        {
          label: brand || (category.charAt(0).toUpperCase() + category.slice(1)),
          path: brand ? `/viewProductByCategory?brand=${brand}`
            : `/viewProductByCategory?category=${category}`,
          className: "text-[#172314] text-sm font-normal"
        }
      ]);
    }
  }, [brand, category]);


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     try {
  //       const products = await getProducts(category);
  //       const sorted = sortProducts(products, sortBy);
  //       console.log("Fetched products:", products);
  //       setProducts(sorted);
  //     } catch (err) {
  //       console.error("Failed to fetch products:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (category) {
  //     fetchProducts();
  //   }
  // }, [category, sortBy]);
  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const productsData = await fetchProducts({ brand, category });
        const sorted = sortProducts(productsData, sortBy);
        setProducts(sorted || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (brand || category) {
      fetchProductsData();
    }
  }, [brand, category, sortBy]);



  const handleAddToFavorites = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleOptions = (productId, color, size) => {
    const queryParams = new URLSearchParams();
    if (color) queryParams.append('color', color.toLowerCase());
    if (size) queryParams.append('size', size);

    const href = `/viewProductDetails/${productId}?${queryParams.toString()}`;
    console.log('Navigating to:', href);
    router.push(href);
  };

  const sortProducts = (products, sortKey) => {
    if (!Array.isArray(products)) return [];

    switch (sortKey) {
      case "priceLow":
        return [...products].sort((a, b) => parseFloat(a.price?.$numberDecimal || 0) - parseFloat(b.price?.$numberDecimal || 0))
          //  a.price?.$numberDecimal - b.price?.$numberDecimal);
      case "priceHigh":
        return [...products].sort((a, b) => parseFloat(b.price?.$numberDecimal || 0) - parseFloat(a.price?.$numberDecimal || 0))
          // b.price?.$numberDecimal - a.price?.$numberDecimal);
      case "popularity":
        return [...products].sort((a, b) => b.popularity - a.popularity); // adjust based on backend
      case "newest":
      default:
        return products;
    }
  };

    const getFirstAvailableSize = (product) => {
    if (!product.variations || product.variations.length === 0) return null;

    const firstVariation = product.variations[0];
    if (!firstVariation.sizes || firstVariation.sizes.length === 0) return null;

    // Find first size with stock > 0
    const availableSize = firstVariation.sizes.find(size => size.stock > 0);
    return availableSize ? availableSize.size : firstVariation.sizes[0].size;
  };

  // Helper function to get first available color
  const getFirstAvailableColor = (product) => {
    if (!product.variations || product.variations.length === 0) return null;
    return product.variations[0].color;
  };


  // Add your JSX from your message here
  return (
    <div className="p-4 md:p-10 ">
      <div className="mt-8 md:mt-4 md:ml-12 md:py-6">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          {breadcrumbs.map((crumb, index) => (
            <a key={index} href={crumb.path} className="text-gray-500 hover:text-gray-900 text-left">
              {crumb.label}
            </a>
          ))}
        </Breadcrumbs>
      </div>
      {/* <div className="flex flex-row items-center justify-between mr-12 md:flex-row "> */}
      <div className="flex flex-col mb-4 md:flex-row items-start md:items-center justify-between gap-1 md:gap-0 mr-0 md:mr-12">
        <p className="text-2xl md:text-[32px] font-bold text-[#061410] mb-6 text-left md:text-left md:ml-12 capitalize md:mt-6">
          {brand ? `${brand} Products` : `${category} Products`}
        </p>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:ml-8 cursor-pointer">
          {Array.isArray(products) ? products.map((product) => {
            const firstColor = getFirstAvailableColor(product);
            const firstSize = getFirstAvailableSize(product);
            return ( 
            <div key={product._id} className="w-full">
              <div
                role="button" 
                className="card-container"
                onClick={() => {
                  if (!firstColor || !firstSize) {
                    console.error("Missing color or size", {
                      color: firstColor,
                      size: firstSize,
                      variations: product.variations
                    });
                    showSnackbar({
                      message: 'Product configuration error',
                      severity: 'error'
                    });
                    return;
                  }
                  handleOptions(product._id, firstColor, firstSize);
                }}
              >
                {/* Header */}
                <div className="card-header w-full relative h-[250px]">
                  <img
                    alt={product.name}
                    src={product.variations?.[0]?.images?.[0] ?? "/fallback.png"}
                    className="w-full rounded-t-lg object-cover h-[250px]"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToFavorites(product._id);
                    }}
                    className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105
                      // ${favorites.includes(product._id) ? "bg-[#26735B]" : "bg-white"}
                      `}
                    aria-label="Save for later"
                  >
                    {favorites.includes(product._id) ? (
                      <FaHeart className="text-[#26735B]" size={16} />
                    ) : (
                      <FiHeart className="text-[#26735B]" size={16} />
                    )}
                    {/* <FiHeart className={favorites.includes(product._id) ? "bg-[#26735B]" : "text-[#191818]"} /> */}
                  </button>
                </div>

                {/* Title */}
                <div className="card-title w-full mt-2">
                  <p className="text-left text-base font-normal text-[#061410]">{product.name}</p>
                </div>

                {/* Subtitle (Price) */}
                {/* <div className="card-subtitle w-full">
                  <p className="text-center sm:text-left text-[#061410] text-lg font-bold">
                    {product.price?.$numberDecimal ?? "N/A"}
                  </p>
                </div> */}
                <div className="card-subtitle w-full flex gap-2 ">
                  <p className="text-left text-[#061410] text-base font-bold">
                    ₦{product.price?.$numberDecimal ?? "N/A"}
                  </p>
                  <span className="text-[11px] font-normal text-[#667085] line-through mt-1">
                    ₦150,000
                  </span>
                </div>
                <div className="card-content flex justify-center sm:justify-start w-full mt-2 text-nowrap">
                  <Rating
                    value={ratingValue}
                    onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
                    precision={0.5}
                    size="small"
                    className='w-[63px]'
                  />
                  <p className='text-[#061410] text-xs font-medium'>
                    {ratingValue ? Math.round(ratingValue).toFixed(1) : 'N/A'}
                  </p>
                  <p className='text-[#061410] text-xs font-medium tracking-tighter'>
                    (400 + Reviews)
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
            );
          }) : (
            <p className="text-center text-gray-500 text-lg mt-10">
              No products available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
