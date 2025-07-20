'use client';

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useFavoritesQuery from '../../lib/hooks/useFavouritesQuery';

const ITEMS_PER_PAGE = 9; // 9 products per page (3 per row on desktop)

const FavouritesPage = () => {
  const [token, setToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    if (storedToken) setToken(storedToken);
  }, []);

  const { data, isLoading, isError, error } = useFavoritesQuery(token || '');

  const favoritesList = Array.isArray(data?.data)
    ? data.data.filter((item) => item && item.variations?.[0]?.images?.[0])
    : [];

  // Pagination logic
  const totalPages = Math.ceil(favoritesList.length / ITEMS_PER_PAGE);
  const paginatedItems = favoritesList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) stars.push(<span key={i} className="text-yellow-400">★</span>);
    if (hasHalfStar) stars.push(<span key="half" className="text-yellow-400">☆</span>);
    for (let i = 0; i < 5 - Math.ceil(rating); i++) stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    return stars;
  };

  if (isLoading) return <p className="text-center py-10">Loading favourites...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#061410] mb-6">My Favourites</h1>

      {favoritesList.length === 0 ? (
        <p className="text-gray-600">You have no favourites yet.</p>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {paginatedItems.map((product, idx) => {
              const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';
              return (
                <div
                  key={product._id || idx}
                  className="relative bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square rounded-t-lg overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-sm"
                    />
                    {/* Heart Icon */}
                    <button
                      className="absolute bottom-2 right-2 p-1.5 text-[#4CAF50] bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Add to favourites:', product._id);
                      }}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          product.isLiked ? 'fill-[#4CAF50] text-[#4CAF50]' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-[#061410] mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base md:text-lg font-bold text-[#061410]">
                        ₦{Number(product.price?.$numberDecimal || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">{renderStars(product.rating)}</div>
                      <span className="text-xs text-gray-600 ml-1">
                        {product.rating} ({product.reviews}+ Reviews)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded border ${
                  currentPage === 1
                    ? 'text-gray-400 border-gray-200'
                    : 'text-[#26735B] border-[#26735B] hover:bg-[#26735B] hover:text-white'
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded border ${
                  currentPage === totalPages
                    ? 'text-gray-400 border-gray-200'
                    : 'text-[#26735B] border-[#26735B] hover:bg-[#26735B] hover:text-white'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavouritesPage;
