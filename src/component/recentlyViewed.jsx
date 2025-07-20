import React, { useEffect, useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import useFavoritesQuery from '../lib/hooks/useFavouritesQuery';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { useRecentlyViewedQuery } from '../lib/hooks/useRecentlyViewedQuery'; 

const RecentlyViewed = () => {
   const [token, setToken] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const { data: products=[] } = useRecentlyViewedQuery();
  console.log('uif', products)

      useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) setToken(storedToken);
    }, []);

    const { data: favData } = useFavoritesQuery(token || '');

 const favoritesList = Array.isArray(favData?.data)
    ? favData.data
    : [];

  const visibleProducts = isDesktop
    ? products.slice(0, 3)
    : products.slice(0, 4);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      );
    }

    return stars;
  };

  const handleViewAll = () => {
    router.push('/favourites'); 
  };

  const isProductFavorited = (productId) => {
    return favoritesList.some(fav => fav._id === productId);
  };

  console.log("Products length:", products.length);

  return (
    <div className="w-full bg-white rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-[#061410]">Recently Viewed</h2>
        {/* {products.length > 0 && ( */}
        <button className="flex items-center gap-1 text-sm text-[#26735B] font-medium hover:underline"
          onClick={handleViewAll}
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
        {/* )} */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {visibleProducts.map((product, idx) => {
          const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';
          const isFav = isProductFavorited(product._id);
          return (
          <div key={product._id || idx} className="relative bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="relative aspect-square rounded-t-lg overflow-hidden bg-gray-100">
              <img 
                src={imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover rounded-sm"
              />
              <button className="absolute bottom-2 right-2 p-1.5 text-[#4CAF50] bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToFavorites(product._id);
              }}
              >
                <Heart 
                  className={`w-4 h-4 ${isFav ? 'fill-[#4CAF50] text-[#4CAF50]' : 'text-gray-400'}`}
                />
              </button>
            </div>

            <div className="p-3">
              <h3 className="text-sm font-medium text-[#061410] mb-2 line-clamp-2 leading-tight">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-base md:text-lg font-bold text-[#061410]">
                   ₦{Number(product.price?.$numberDecimal || 0).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs md:text-sm text-gray-500 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-xs text-gray-600 ml-1">
                  {product.rating} ({product.reviews}+ Reviews)
                </span>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default RecentlyViewed;
