"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts, useProductsByCategory } from "../../lib/hooks/useGetProductsByCategory"
import { FiHeart } from "react-icons/fi";
import { Breadcrumbs } from "@mui/material";
import SortDropdown from "../reusables/SortDropdown";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FaHeart } from "react-icons/fa";
import useAddToFavorites from "@/src/lib/hooks/useAddToFavourites";
import useFavoritesQuery from "@/src/lib/hooks/useFavouritesQuery";
import useRemoveFavoriteMutation from "@/src/lib/hooks/useRemoveFavourites";
import useSnackbarStore from "@/src/lib/store/useSnackbarStore";


export default function ViewProductsByCategory() {
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const router = useRouter();
  const [token, setToken] = useState('');
  const { showSnackbar } = useSnackbarStore();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('authToken');
      setToken(storedToken || '');
    }
  }, []);
  const { mutate: addToFavorites, isPending } = useAddToFavorites();
  const [favorites, setFavorites] = useState([]);
  const deleteFavorite = useRemoveFavoriteMutation();
  const { data: favoritesQuery } = useFavoritesQuery(token || undefined, {
    enabled: !!token,
  });
  const searchParams = useSearchParams();
  // const category = searchParams.get("category")?.toLowerCase().trim();  
  const category = encodeURIComponent(searchParams.get("category")?.toLowerCase().trim() || "");

  const { data: products = [], isLoading, isError } = useProductsByCategory(category);
  const [sortBy, setSortBy] = useState("newest");

  const sortProducts = (products, sortKey) => {
    if (!Array.isArray(products)) return [];

    switch (sortKey) {
      case "priceLow":
        return [...products].sort((a, b) => a.price?.$numberDecimal - b.price?.$numberDecimal);
      case "priceHigh":
        return [...products].sort((a, b) => b.price?.$numberDecimal - a.price?.$numberDecimal);
      case "popularity":
        return [...products].sort((a, b) => b.popularity - a.popularity);
      case "newest":
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products, sortBy);



  useEffect(() => {
    if (favoritesQuery?.data && Array.isArray(favoritesQuery.data)) {
      const favoriteIds = favoritesQuery.data.map((product) => product._id);
      setFavorites(favoriteIds);
    }
  }, [favoritesQuery]);


  useEffect(() => {
    if (category) {
      setBreadcrumbs([
        { label: "Home", path: "/", className: "text-[#8D8C8C] text-sm font-normal" },
        { label: category.charAt(0).toUpperCase() + category.slice(1), path: `/category?category=${category}`, className: "text-[#172314] text-sm font-normal" },
        // { label: "Products", path: `/category/product?category=${category}` }
      ]);
    }
  }, [category]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     try {
  //       const products = await getProducts(category);
  //       const sorted = sortProducts(products, sortBy);
  //       console.log("Fetched products:", products);
  //       // setProducts(Array.isArray(products) ? products : []);
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

  // const handleAddToFavorites = (id) => {
  //   setFavorites((prev) =>
  //     prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
  //   );
  // };
  const handleAddToFavorites = (productId) => {
    if (!token) {
      alert('User is not logged in.');
      return;
    }

    if (favorites.includes(productId)) {
      deleteFavorite.mutate(productId, {
        onSuccess: (response) => {
          setFavorites((prevFavorites) => prevFavorites.filter(id => id !== productId));
          console.log('Product removed from favorites:', response.data);
          showSnackbar({ message: 'Product removed from favorites', severity: 'info' });
        },
        onError: (error) => {
          console.error('Error removing product from favorites:', error);
          showSnackbar({ message: error.message, severity: 'error' });
        },
      });
    } else {
      addToFavorites(productId, {
        onSuccess: (response) => {
          setFavorites((prevFavorites) => [...prevFavorites, productId]);
          console.log('Product added to favorites:', response.data);
          showSnackbar({ message: 'Product added to favorites', severity: 'success' });
        },
        onError: (error) => {
          console.error('Error adding product to favorites:', error);
          showSnackbar({ message: error.message, severity: 'error' });
        },
      });
    }
  };

  // const handleOptions = (id) => {
  //   // navigation or modal here
  //   console.log("Choose options for", id);

  // };
  const handleOptions = (productId, color, size) => {
    const queryParams = new URLSearchParams();
    if (color) queryParams.append('color', color.toLowerCase());
    if (size) queryParams.append('size', size);

    const href = `/viewProductDetails/${productId}?${queryParams.toString()}`;
    console.log('Navigating to:', href);

    router.push(href);
  };

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:ml-8 cursor-pointer">
          {Array.isArray(products) ? sortedProducts.map((product) => (
            <div key={product._id} className="w-full"
              role='button'
              tabIndex={0}
              style={{ borderRadius: '8px', overflow: 'hidden' }}
              onClick={() => {
                const variation = product.variations?.[0];
                const color = variation?.color;
                const size = variation?.sizes?.[0]?.size;

                if (!color || !size) {
                  console.error("Missing color or size", { color, size });
                  return;
                }
                handleOptions(product._id, color, size);
              }}
            >
              <div className="card-header w-full relative h-[250px]">
                <img
                  alt={product.name}
                  src={product.variations?.[0]?.images?.[0] ?? "/fallback.png"}
                  className="w-full rounded-t-lg object-cover h-[250px]"
                />
                {/* <button
                    onClick={() => handleAddToFavorites(product._id)}
                    className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105
                      ${favorites.includes(product._id) ? "bg-[#26735B]" : "bg-white"}`}
                    aria-label="Save for later"
                  >
                    <FiHeart className={favorites.includes(product._id) ? "bg-[#26735B]" : "text-[#191818]"} />
                  </button> */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToFavorites(product._id);
                  }}
                  className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition bg-white hover:scale-105 cursor-pointer`}
                  aria-label="Save for later"
                >
                  {favorites.includes(product._id) ? (
                    <FaHeart className="text-[#26735B]" size={16} />
                  ) : (
                    <FiHeart className="text-[#26735B]" size={16} />
                  )}
                  {/* <FiHeart className="text-[#191818]" /> */}
                  {/* <FiHeart className={favorites.includes(product._id) ? "bg-[#26735B]" : "text-[#191818]"} /> */}
                </button>
              </div>

              <div className="card-title w-full mt-2">
                <p className="text-center sm:text-left text-base font-normal text-[#061410]">{product.name}</p>
              </div>

              <div className="card-subtitle w-full">
                <p className="text-center sm:text-left text-[#061410] text-lg font-bold">
                  {product.price?.$numberDecimal ?? "N/A"}
                </p>
              </div>

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
