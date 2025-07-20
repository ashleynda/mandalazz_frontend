'use client';

import React, { useEffect, useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useFavoritesQuery from '../../lib/hooks/useFavouritesQuery';
import useRemoveFavoriteMutation from '../../lib/hooks/useRemoveFavourites';
import { Divider } from '@mui/material';

const ITEMS_PER_PAGE = 6; // Adjusted to match the design

const FavouritesPage = () => {
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) setToken(storedToken);
  }, []);

  const { data, isLoading, isError, error } = useFavoritesQuery(token || '');
   const deleteFavorite = useRemoveFavoriteMutation();

  const favoritesList = Array.isArray(data?.data)
    ? data.data.filter((item) => item && item.variations?.[0]?.images?.[0])
    : [];

  // Pagination logic
  const totalPages = Math.ceil(favoritesList.length / ITEMS_PER_PAGE);
  const paginatedItems = favoritesList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRemoveFromFavorites = (productId) => {
    // Add your remove from favorites logic here
    console.log('Remove from favourites:', productId);
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
  };

   const handleOptions = (productId, color, size) => {
    const queryParams = new URLSearchParams();
    if (color) queryParams.append('color', color.toLowerCase());
    if (size) queryParams.append('size', size);

    const href = `/viewProductDetails/${productId}?${queryParams.toString()}`;
    console.log('Navigating to:', href);
    router.push(href);
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
  

  if (isLoading) return <p className="text-center py-10">Loading favourites...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;

  return (
    <div className="w-full min-h-screen bg-white flex flex-col rounded-lg mt-12">
      <div className="flex-1 px-6 py-6">
        <h1 className="text-xl font-semibold text-[#061410] mb-8 ">Favourites</h1>
        {/* <Divider className="mt-4 w-full" /> */}
         <div className="-mx-6 md:-mx-6 hidden md:block">
              <Divider className="border-gray-200" />
            </div>


        {favoritesList.length === 0 ? (
          <p className="text-gray-600 text-center py-10">You have no favourites yet.</p>
        ) : (
          <div className="max-w-full">
            <div className="space-y-6">
              {paginatedItems.map((product, idx) => {
              const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';
              const firstColor = getFirstAvailableColor(product);
              const firstSize = getFirstAvailableSize(product);
              return (
                <div
                  key={product._id || idx}
                  className="flex items-center gap-6 py-4 border-b border-gray-100 last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-[#061410] mb-2">
                      {product.name || "Crocs"}
                    </h3>
                    <div className="text-lg font-semibold text-[#061410]">
                      ₦{Number(product.price?.$numberDecimal || 15000).toLocaleString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col items-center gap-3">
                    {/* Choose Options Button */}
                        <button
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
                        className="px-4 py-2 bg-[#26735B] text-white text-sm font-medium rounded-md hover:bg-[#1e5a47] transition-colors cursor-pointer"
                        >
                        Choose Options
                        </button>
                        
                        {/* Action Icons */}
                        <div className="flex flex-row gap-1 ml-2">
                            <button
                                onClick={() => handleRemoveFromFavorites(product._id)}
                                className="p-2 text-gray-400 hover:text-[#26735B] transition-colors rounded-md cursor-pointer"
                                title="Add to Cart"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleRemoveFromFavorites(product._id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-md"
                                title="Remove from Favourites"
                                disabled
                            >
                                <Heart 
                                // className="w-4 h-4 fill-current" 
                                className={`w-4 h-4 ${product._id ? 'fill-[#4CAF50] text-[#4CAF50]' : 'text-gray-400'}`}
                                />
                            </button>
                        </div>
                  </div>
                </div>
              );
                          })}
            </div>
          </div>
        )}
      </div>

      {/* Pagination Controls - Always at bottom, only show if there are multiple pages */}
      {totalPages > 1 && (
        <div className="px-6 py-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-gray-500 mx-2">Previous</span>

            <div className="flex gap-1 mx-4">
              {/* Page Numbers */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded text-xs transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-xs"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <span className="text-xs text-gray-500 mx-2">Next</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;