
'use client';

import { Box, Stack, Card, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import shirt from '../assets/shirt.png';
import brown from '../assets/brown.png';
import denim from '../assets/denim.png';
import Image from 'next/image';
import useFavoritesQuery from '../lib/hooks/useFavouritesQuery';
import { useEffect, useState } from 'react';
import { truncateText } from '../lib/utils';
import { FaArrowRight } from 'react-icons/fa';




const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


export default function Favourites() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken'); // or localStorage
        if (storedToken) setToken(storedToken);
    }, []);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useFavoritesQuery(token);
    //   const favorites = Array.isArray(data?.data) ? data.data.map(item => item.productId) : [];
    const favorites = Array.isArray(data?.data)
        ? data.data.filter(item => item && item.variations?.[0]?.images?.[0])
        : [];

    console.log('favorites from query:', favorites);

    return (
        <div className="bg-white mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className='flex justify-between items-center mb-4'>
                <p className='text-[#061410] text-xl font-bold mb-2'>Favourites</p>
                {/* <p className='text-sm font-semibold text-[#174F41]'>View more <FaArrowRight/></p> */}
                <p className="flex items-center text-sm font-semibold text-[#174F41] mb-4">
                    View All <FaArrowRight className="ml-1" />
                </p>
            </div>
            <Stack direction="row" spacing={2}>
                {favorites.map((product, idx) => {
                    const imageUrl = product?.variations?.[0]?.images?.[0] || '/fallback.png';
                    return (
                        <Card sx={{
                            minWidth: 220,
                            maxWidth: 240, position: 'relative',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                            key={product._id || idx}>
                            <Box sx={{ position: 'relative', width: '100%', height: 240 }}>
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
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: 8,
                                        right: 8,
                                        background: 'white',
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                                        '&:hover': {
                                            background: 'white',
                                        },
                                        padding: 0,
                                    }}
                                    size="small"
                                >
                                    {product.isFavorite ? (
                                        <FavoriteIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                                    )}
                                </IconButton>
                            </Box>
                            <CardContent sx={{ p: 1.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: '600',
                                            fontSize: '14px',
                                            color: '#1976d2'
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                    {/* <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '10px'
                                    }}
                                    >
                                    {truncateText(product.description, 30)}
                                    </Typography> */}
                                </Box>

                                <Box sx={{ mb: 0.5 }} className="flex items-center gap-2">
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '16px'
                                        }}
                                    >
                                        ₦{Number(product.price?.$numberDecimal || 0).toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            textDecoration: 'line-through',
                                            color: 'text.secondary',
                                            fontSize: '12px'
                                        }}
                                    >
                                        ₦{Number(product.originalPrice?.$numberDecimal || 0).toLocaleString()}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </div>

    )
}