"use client";

import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import yellowWoman from '../../assets/yellowWoman.png';
import { StaticImageData } from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import useProductsQuery from '../../lib/hooks/favourites/useProductMutation';
import { FiHeart } from 'react-icons/fi';
import useAddToFavorites from '../../lib/hooks/favourites/useAddToFavourites';
import useRemoveFavoriteMutation from '../../lib/hooks/useRemoveFavourites';
import useFavoritesQuery from '@/src/lib/hooks/useFavouritesQuery';
import useSnackbarStore from '@/src/lib/store/useSnackbarStore';

const ViewProducts = () => {
  const [ratingValue, setRatingValue] = useState(3.5);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [token, setToken] = useState('');
  const { data, isLoading, isError, error } = useProductsQuery();

  // Enhanced product data extraction
  let products = [];

  if (data) {
    if (Array.isArray(data)) {
      products = data;
    } else if (Array.isArray(data.data)) {
      products = data.data;
    } else if (Array.isArray(data.products)) {
      products = data.products;
    } else if (data.data && Array.isArray(data.data.products)) {
      products = data.data.products;
    } else {
      console.log('Could not find products array in data structure');
      console.log('Available keys in data:', Object.keys(data));
    }
  }

  const { mutate: addToFavorites, isPending } = useAddToFavorites();
  const [favorites, setFavorites] = useState([]);
  const deleteFavorite = useRemoveFavoriteMutation();
  const { data: favoritesQuery } = useFavoritesQuery(token || null);
  const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('authToken');
      setToken(storedToken || '');
    }
  }, []);

  // useEffect(() => {
  //   if (favoritesQuery && Array.isArray(favoritesQuery.favorites)) {
  //     setFavorites(favoritesQuery.favorites);
  //   }
  // }, [favoritesQuery]);
//   useEffect(() => {
//   if (favoritesQuery?.data && Array.isArray(favoritesQuery.data)) {
//     const productIds = favoritesQuery.data.map((fav) => fav.productId);
//     setFavorites(productIds);
//   }
// }, [favoritesQuery]);
useEffect(() => {
  if (favoritesQuery?.data && Array.isArray(favoritesQuery.data)) {
    const validFavorites = favoritesQuery.data.filter(
      (fav) => fav && fav.productId // ensures fav is not null and has a productId
    );
    const productIds = validFavorites.map((fav) => fav.productId);
    setFavorites(productIds);
  }
}, [favoritesQuery]);



  const handleAddToFavorites = (productId) => {
    if (favorites.includes(productId)) {
      deleteFavorite.mutate(productId, {
        onSuccess: (response) => {
          setFavorites((prevFavorites) => prevFavorites.filter(id => id !== productId));
          showSnackbar({ message: 'Product removed from favorites', severity: 'success' });
        },
        onError: (error) => {
          console.error('Error removing product from favorites:', error);
          showSnackbar({ message: 'Error removing from favorites', severity: 'error' });
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
          if (!token) {
            showSnackbar({ message: 'Please log in to add favorites', severity: 'warning' });
          } else {
            console.error('Error adding product to favorites:', error);
            showSnackbar({ message: 'Error adding to favorites', severity: 'error' });
          }
        },
      });
    }
  };

  // Fixed navigation function using actual product data
  const handleOptions = (productId, color, size) => {
    const queryParams = new URLSearchParams();
    if (color) queryParams.append('color', color.toLowerCase());
    if (size) queryParams.append('size', size);

    const href = `/viewProductDetails/${productId}?${queryParams.toString()}`;
    console.log('Navigating to:', href);
    router.push(href);
  };

  // Helper function to get first available size from variations
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

  return (
      <div className="p-4 md:p-10 ">
        <p className="text-2xl md:text-3xl font-bold text-[#061410] mb-6 text-center md:text-left md:ml-12 hidden md:block">
          Best Sellers
        </p>

        {isLoading && (
            <div className="text-center py-8">
              <p>Loading products...</p>
            </div>
        )}

        {isError && (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading products: {error?.message}</p>
            </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:ml-8 cursor-pointer">
          {products.map((product) => {
            const firstColor = getFirstAvailableColor(product);
            const firstSize = getFirstAvailableSize(product);

            return (
                <div key={product._id} className="w-full">
                  <div
                      role='button'
                      tabIndex={0}
                      style={{ borderRadius: '8px', overflow: 'hidden' }}
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
                    <div className="card-header w-full relative h:[200px] md:h-[250px]">
                      <img
                          alt={product.name}
                          src={
                              product.variations?.[0]?.images?.[0] ?? yellowWoman.src
                          }
                          className="w-full rounded-t-lg object-cover h-[166px] md:h-full"
                      />
                      <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToFavorites(product._id);
                          }}
                          className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105
                    ${favorites.includes(product._id) ? "bg-[#26735B]" : "bg-white"}`}
                          aria-label="Save for later"
                      >
                        <FiHeart className={
                          favorites.includes(product._id) ? "text-white" : "text-[#191818]"
                        } />
                      </button>
                    </div>

                    {/* Title */}
                    <div className="card-title w-full mt-2">
                      <p className="text-left text-sm font-normal font-figtree text-[#061410]">
                        {product.name}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="card-subtitle w-full flex gap-2 ">
                      <p className="text-left text-[#061410] text-base font-bold">
                        ₦{product.price?.$numberDecimal ?? "N/A"}
                      </p>
                      <span className="text-[11px] font-normal text-[#667085] line-through mt-1">
                    ₦150,000
                  </span>
                    </div>

                    {/* Rating */}
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
                          className="w-full h-[48px] text-base font-bold font-manrope cursor-pointer hover:bg-[#26735B] hover:text-white transition-colors duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            if (!firstColor || !firstSize) {
                              console.error("Missing color or size for options", {
                                color: firstColor,
                                size: firstSize
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
                        Choose Options
                      </button>
                    </div>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default ViewProducts;