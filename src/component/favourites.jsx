
// // 'use client';

// // import { Box, Stack, Card, CardContent, Typography, IconButton } from '@mui/material';
// // import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// // import FavoriteIcon from '@mui/icons-material/Favorite';
// // import Image from 'next/image';
// // import useFavoritesQuery from '../lib/hooks/useFavouritesQuery';
// // import { useEffect, useState } from 'react';
// // import { FaArrowRight } from 'react-icons/fa';
// // import { FiHeart } from 'react-icons/fi';
// // import { Rating } from '@mui/material';




// // // const bull = (
// // //     <Box
// // //         component="span"
// // //         sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
// // //     >
// // //         •
// // //     </Box>
// // // );


// // export default function Favourites() {
// //     const [token, setToken] = useState(null);
// //     const [ratingValue, setRatingValue] = useState(3.5);

// //     useEffect(() => {
// //         const storedToken = sessionStorage.getItem('authToken'); // or localStorage
// //         if (storedToken) setToken(storedToken);
// //     }, []);

// //     const {
// //         data,
// //         isLoading,
// //         isError,
// //         error,
// //     } = useFavoritesQuery(token || '');
// //     //   const favorites = Array.isArray(data?.data) ? data.data.map(item => item.productId) : [];
// //     const favorites = Array.isArray(data?.data)
// //         ? data.data.filter(item => item && item.variations?.[0]?.images?.[0])
// //         : [];

// //     console.log('favorites from query:', favorites);

// //     const renderStars = (rating) => {
// //         const stars = [];
// //         const value = Number(rating) || 0;
// //         const fullStars = Math.floor(rating);
// //         const hasHalfStar = value % 1 !== 0;

// //         for (let i = 0; i < fullStars; i++) {
// //             stars.push(
// //                 <FaStar key={i} className="text-yellow-500 text-xs sm:text-sm" />
// //             );
// //         }

// //         if (hasHalfStar) {
// //             stars.push(
// //                 <FaStarHalfAlt key="half" className="text-yellow-500 text-xs sm:text-sm" />
// //             );
// //         }

// //         return stars;
// //     };

// //     return (
// //         <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //             <div className='flex justify-between items-center mb-4'>
// //                 <p className='text-[#061410] text-xl font-bold mb-2'>Favourites</p>
// //                 {/* <p className='text-sm font-semibold text-[#174F41]'>View more <FaArrowRight/></p> */}
// //                 <p className="flex items-center text-sm font-semibold text-[#174F41] mb-4">
// //                     View All <FaArrowRight className="ml-1" />
// //                 </p>
// //             </div>
// //             <div className='flex flex-wrap gap-4'>
// //                 {favorites.map((product, idx) => {
// //                     const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';
// //                     return (
// //                         <div className='w-[218px]'
// //                             sx={{
// //                                 // minWidth: 220,
// //                                 // maxWidth: 240, 
// //                                 position: 'relative',
// //                                 borderRadius: '8px',
// //                                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
// //                             }}
// //                             key={product._id || idx}>
// //                             {/* <Box sx={{ position: 'relative', width: '100%', height: 240 }}> */}
// //                             <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56">
// //                                 <Image
// //                                     // component="img"
// //                                     src={imageUrl}
// //                                     // src={product.variations?.[0]?.images?.[0] || '/fallback.png'} 
// //                                     alt={product.name}
// //                                     fill
// //                                     sx={{
// //                                         // width: '100%',
// //                                         // height: 240,
// //                                         objectFit: 'cover',
// //                                         borderTopLeftRadius: 8,
// //                                         borderTopRightRadius: 8,
// //                                     }}
// //                                 />
// //                                 {/* <button className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-50 transition-colors">
// //                                     {product.isFavorite ? (
// //                                         <FavoriteIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
// //                                     ) : (
// //                                         <FavoriteBorderIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
// //                                     )}
// //                                 </button> */}
// //                                 {/* <button
// //                                     className="absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105 bg-[#26735B]"
// //                                     aria-label="Remove from favorites"
// //                                     >
// //                                     <FiHeart className="text-[#26735B]" />
// //                                 </button> */}
// //                                 <button
// //                                     className="absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105 bg-white"
// //                                     aria-label="Remove from favorites"
// //                                 >
// //                                     <FavoriteIcon sx={{ color: '#26735B', fontSize: 20 }} />
// //                                 </button>


// //                             </div>
// //                             <div className="py-2">
// //                                 {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}> */}
// //                                 {/* <div className='mb-1 sm:mb-2'> */}
// //                                 <h3 className="text-sm md:text-sm font-normal text-[#061410] truncate">
// //                                     {product.name}
// //                                 </h3>
// //                                 {/* </div> */}
// //                                 {/* <Typography 
// //                                     variant="caption" 
// //                                     sx={{ 
// //                                         color: 'text.secondary',
// //                                         fontSize: '10px'
// //                                     }}
// //                                     >
// //                                     {truncateText(product.description, 30)}
// //                                     </Typography> */}
// //                             </div>

// //                             <div className="flex items-center gap-2 md:gap-1 mb-1 sm:mb-2">
// //                                 <span className="text-sm font-bold text-[#061410]">
// //                                     ₦{Number(product.price?.$numberDecimal || 0).toLocaleString()}
// //                                 </span>
// //                                 <span className="text-[8px] sm:text-sm text-[#667085] line-through">
// //                                     ₦{Number(product.originalPrice?.$numberDecimal || 0).toLocaleString()}
// //                                 </span>
// //                             </div>

// //                             {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                                     <Box sx={{ display: 'flex', mr: 0.5 }}>
// //                                         {[...Array(Math.floor(product.rating))].map((_, i) => (
// //                                             <StarIcon key={i} sx={{ fontSize: 14, color: '#FFA000' }} />
// //                                         ))}
// //                                         {product.rating % 1 !== 0 && (
// //                                             <StarHalfIcon sx={{ fontSize: 14, color: '#FFA000' }} />
// //                                         )}
// //                                     </Box>
// //                                     <Typography
// //                                         variant="caption"
// //                                         sx={{
// //                                             color: 'text.secondary',
// //                                             fontSize: '12px'
// //                                         }}
// //                                     >
// //                                         {product.rating} ({product.reviewCount} Reviews)
// //                                     </Typography>
// //                                 </Box> */}
// //                                   <div className="card-content flex justify-center sm:justify-start w-full mt-2 text-nowrap">
// //                                         <Rating
// //                                             value={ratingValue}
// //                                             onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
// //                                             precision={0.5}
// //                                             size="small"
// //                                             className='w-[63px]'
// //                                         />
// //                                         <p className='text-[#061410] text-xs font-medium'>
// //                                         {ratingValue ? Math.round(ratingValue).toFixed(1) : 'N/A'}
// //                                         </p>
// //                                         <p className='text-[#061410] text-xs font-medium tracking-tighter'>
// //                                         (400 + Reviews)
// //                                         </p>
// //                                     </div>
// //                             {/* <div className="flex items-center flex-wrap gap-1">
// //                                 <div className="flex items-center">
// //                                     {renderStars(product.rating)}
// //                                 </div>
// //                                 <span className="text-[9px] font-medium text-[#061410]">
// //                                     {product.rating} ({product.reviewCount} Reviews)
// //                                 </span>
// //                             </div> */}
// //                         </div>
// //                         // </div>
// //                     );
// //                 })}
// //             </div>
// //         </div >

// //     )
// // }

// 'use client';

// import { Box, Stack, Card, CardContent, Typography, IconButton } from '@mui/material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import Image from 'next/image';
// import useFavoritesQuery from '../lib/hooks/useFavouritesQuery';
// import { useEffect, useState } from 'react';
// import { FaArrowRight } from 'react-icons/fa';


// export default function Favourites() {
//     const [token, setToken] = useState(null);
//     const [showAll, setShowAll] = useState(false);


//     useEffect(() => {
//         const storedToken = sessionStorage.getItem('authToken');
//         if (storedToken) setToken(storedToken);
//     }, []);

//     const {
//         data,
//         isLoading,
//         isError,
//         error,
//     } = useFavoritesQuery(token || '');
//     const favoritesIds = Array.isArray(data?.data)
//         ? data.data.filter(item => item && item.variations?.[0]?.images?.[0])
//         : [];

//     // const visibleFavorites = showAll ? favoritesIds : favoritesIds.slice(0, 4);


//     console.log('favorites from query:', favoritesIds);

//     const renderStars = (rating) => {
//         const stars = [];
//         const value = Number(rating) || 0;
//         const fullStars = Math.floor(rating);
//         const hasHalfStar = value % 1 !== 0;

//         for (let i = 0; i < fullStars; i++) {
//             stars.push(
//                 <FaStar key={i} className="text-yellow-500 text-xs sm:text-sm" />
//             );
//         }

//         if (hasHalfStar) {
//             stars.push(
//                 <FaStarHalfAlt key="half" className="text-yellow-500 text-xs sm:text-sm" />
//             );
//         }

//         return stars;
//     };
//     //     <p
//     //   onClick={() => setShowAll(prev => !prev)}
//     //   className="flex items-center text-sm font-semibold text-[#174F41] mb-4 cursor-pointer"
//     // >
//     //   {showAll ? 'Show Less' : 'View All'}
//     //   <FaArrowRight className="ml-1" />
//     // </p>

//     return (
//         <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className='flex justify-between items-center mb-4'>
//                 <p className='text-[#061410] text-xl font-bold mb-2'>Favourites</p>
//                 {/* <p className='text-sm font-semibold text-[#174F41]'>View more <FaArrowRight/></p> */}
//                 <p className="flex items-center text-sm font-semibold text-[#174F41] mb-4"
//                     onClick={() => setShowAll(true)}>
//                     View All <FaArrowRight className="ml-1" />
//                 </p>
//             </div>
//             {/* <div className='flex flex-col gap-4'> */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

//                 {favoritesIds.map((product, idx) => {
//                     const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';
//                     return (
//                         <div className="flex flex-col gap-4">
//                             {favoritesIds.map((product, idx) => {
//                                 const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';

//                                 return (
//                                     <div
//                                         key={product._id || idx}
//                                         className="w-full flex gap-4 border rounded-lg p-3 bg-white shadow-sm"
//                                     >
//                                         {/* Image */}
//                                         <div className="w-[74px] h-[76px] shrink-0">
//                                             <Image
//                                                 src={imageUrl}
//                                                 alt={product.name}
//                                                 width={74}
//                                                 height={76}
//                                                 className="object-cover rounded-sm w-full h-full"
//                                             />
//                                         </div>

//                                         {/* Details */}
//                                         <div className="flex flex-col justify-between w-full">
//                                             <div className="flex flex-col">
//                                                 <h3 className="text-sm font-normal text-[#061410] truncate">
//                                                     {product.name}
//                                                 </h3>
//                                                 <div className="flex gap-2 mt-1">
//                                                     <p className="text-sm text-[#667085]">
//                                                         Colour: <span className="text-[13px] text-[#061410]">Not specified</span>
//                                                     </p>
//                                                     <p className="text-sm text-[#667085]">
//                                                         Size: <span className="text-[13px] text-[#061410]">-</span>
//                                                     </p>
//                                                 </div>
//                                                 <p className="text-base font-bold text-black mt-1">
//                                                     ₦{Number(product.price?.$numberDecimal || 0).toLocaleString()}
//                                                 </p>
//                                             </div>

//                                             <div className="my-2">
//                                                 <hr className="border-t border-[#F2F4F7] w-full" />
//                                             </div>

//                                             <div className="flex items-center justify-between mt-2">
//                                                 <div className="text-sm text-[#191818]">Saved</div>
//                                                 <button
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         e.stopPropagation();
//                                                         handleAddToFavorites(product._id);
//                                                     }}
//                                                     className="text-[#4CAF50] flex items-center gap-1"
//                                                 >
//                                                     {favoritesIds.includes(product._id) ? (
//                                                         <FavoriteIcon fontSize="small" />
//                                                     ) : (
//                                                         <FavoriteBorderIcon fontSize="small" />
//                                                     )}
//                                                     Favourite
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>

//                     );
//                 })}
//             </div>
//         </div >

//     )
// }

import React, { useEffect, useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import useFavoritesQuery from '../lib/hooks/useFavouritesQuery';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

const Favourites = () => {
   const [token, setToken] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

      useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) setToken(storedToken);
    }, []);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useFavoritesQuery(token || '');

    const favoritesList = Array.isArray(data?.data)
        ? data.data.filter(item => item && item.variations?.[0]?.images?.[0])
        : [];

    // const visibleFavorites = showAll ? favoritesIds : favoritesIds.slice(0, 4);
    const visibleFavorites = isDesktop
    ? favoritesList.slice(0, 3)
    : favoritesList;

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
    router.push('/favourites'); // Navigate to full favourites page
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-[#061410]">Favourites</h2>
        {favoritesList.length > 0 && (
        <button className="flex items-center gap-1 text-sm text-[#26735B] font-medium hover:underline"
          onClick={handleViewAll}
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </button>
        )}
      </div>

      {/* Products Grid */}
      {/* Mobile: 2 columns (2 items per row) | Desktop: 3 columns (3 items per row) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {visibleFavorites.map((product, idx) => {
          const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';
          return (
          <div key={product._id || idx} className="relative bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-200">
            {/* Product Image */}
            <div className="relative aspect-square rounded-t-lg overflow-hidden bg-gray-100">
              <img 
                src={imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover rounded-sm"
              />
              {/* Heart Icon */}
              <button className="absolute bottom-2 right-2 p-1.5 text-[#4CAF50] bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddToFavorites(product._id);
              }}
              >
                <Heart 
                  className={`w-4 h-4 ${product._id ? 'fill-[#4CAF50] text-[#4CAF50]' : 'text-gray-400'}`}
                />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-3">
              {/* Product Name */}
              <h3 className="text-sm font-medium text-[#061410] mb-2 line-clamp-2 leading-tight">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base md:text-lg font-bold text-[#061410]">
                  {/* ₦{item.price.toLocaleString()} */}
                   ₦{Number(product.price?.$numberDecimal || 0).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs md:text-sm text-gray-500 line-through">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Rating and Reviews */}
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

export default Favourites;