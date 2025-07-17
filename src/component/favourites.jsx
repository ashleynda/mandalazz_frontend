
'use client';

import { Box, Stack, Card, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import useFavoritesQuery from '../lib/hooks/useFavouritesQuery';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Rating } from '@mui/material';




// const bull = (
//     <Box
//         component="span"
//         sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//         •
//     </Box>
// );


export default function Favourites() {
    const [token, setToken] = useState(null);
    const [ratingValue, setRatingValue] = useState(3.5);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken'); // or localStorage
        if (storedToken) setToken(storedToken);
    }, []);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useFavoritesQuery(token || '');
    //   const favorites = Array.isArray(data?.data) ? data.data.map(item => item.productId) : [];
    const favorites = Array.isArray(data?.data)
        ? data.data.filter(item => item && item.variations?.[0]?.images?.[0])
        : [];

    console.log('favorites from query:', favorites);

    const renderStars = (rating) => {
        const stars = [];
        const value = Number(rating) || 0;
        const fullStars = Math.floor(rating);
        const hasHalfStar = value % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FaStar key={i} className="text-yellow-500 text-xs sm:text-sm" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <FaStarHalfAlt key="half" className="text-yellow-500 text-xs sm:text-sm" />
            );
        }

        return stars;
    };

    return (
        <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className='flex justify-between items-center mb-4'>
                <p className='text-[#061410] text-xl font-bold mb-2'>Favourites</p>
                {/* <p className='text-sm font-semibold text-[#174F41]'>View more <FaArrowRight/></p> */}
                <p className="flex items-center text-sm font-semibold text-[#174F41] mb-4">
                    View All <FaArrowRight className="ml-1" />
                </p>
            </div>
            <div className='flex flex-wrap gap-4'>
                {favorites.map((product, idx) => {
                    const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';
                    return (
                        <div className='w-[218px]'
                            sx={{
                                // minWidth: 220,
                                // maxWidth: 240, 
                                position: 'relative',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                            key={product._id || idx}>
                            {/* <Box sx={{ position: 'relative', width: '100%', height: 240 }}> */}
                            <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56">
                                <Image
                                    // component="img"
                                    src={imageUrl}
                                    // src={product.variations?.[0]?.images?.[0] || '/fallback.png'} 
                                    alt={product.name}
                                    fill
                                    sx={{
                                        // width: '100%',
                                        // height: 240,
                                        objectFit: 'cover',
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8,
                                    }}
                                />
                                {/* <button className="absolute bottom-2 right-2 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-50 transition-colors">
                                    {product.isFavorite ? (
                                        <FavoriteIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                                    )}
                                </button> */}
                                {/* <button
                                    className="absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105 bg-[#26735B]"
                                    aria-label="Remove from favorites"
                                    >
                                    <FiHeart className="text-[#26735B]" />
                                </button> */}
                                <button
                                    className="absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105 bg-white"
                                    aria-label="Remove from favorites"
                                >
                                    <FavoriteIcon sx={{ color: '#26735B', fontSize: 20 }} />
                                </button>


                            </div>
                            <div className="py-2">
                                {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}> */}
                                {/* <div className='mb-1 sm:mb-2'> */}
                                <h3 className="text-sm md:text-sm font-normal text-[#061410] truncate">
                                    {product.name}
                                </h3>
                                {/* </div> */}
                                {/* <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '10px'
                                    }}
                                    >
                                    {truncateText(product.description, 30)}
                                    </Typography> */}
                            </div>

                            <div className="flex items-center gap-2 md:gap-1 mb-1 sm:mb-2">
                                <span className="text-sm font-bold text-[#061410]">
                                    ₦{Number(product.price?.$numberDecimal || 0).toLocaleString()}
                                </span>
                                <span className="text-[8px] sm:text-sm text-[#667085] line-through">
                                    ₦{Number(product.originalPrice?.$numberDecimal || 0).toLocaleString()}
                                </span>
                            </div>

                            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', mr: 0.5 }}>
                                        {[...Array(Math.floor(product.rating))].map((_, i) => (
                                            <StarIcon key={i} sx={{ fontSize: 14, color: '#FFA000' }} />
                                        ))}
                                        {product.rating % 1 !== 0 && (
                                            <StarHalfIcon sx={{ fontSize: 14, color: '#FFA000' }} />
                                        )}
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: '12px'
                                        }}
                                    >
                                        {product.rating} ({product.reviewCount} Reviews)
                                    </Typography>
                                </Box> */}
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
                            {/* <div className="flex items-center flex-wrap gap-1">
                                <div className="flex items-center">
                                    {renderStars(product.rating)}
                                </div>
                                <span className="text-[9px] font-medium text-[#061410]">
                                    {product.rating} ({product.reviewCount} Reviews)
                                </span>
                            </div> */}
                        </div>
                        // </div>
                    );
                })}
            </div>
        </div >

    )
}