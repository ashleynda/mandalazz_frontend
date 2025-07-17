
// 'use client';

// import { Box, Stack, Card, CardContent, Typography, IconButton } from '@mui/material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import StarIcon from '@mui/icons-material/Star';
// import StarHalfIcon from '@mui/icons-material/StarHalf';
// import shirt from '../assets/shirt.png';
// import brown from '../assets/brown.png';
// import denim from '../assets/denim.png';
// import Image from 'next/image';




// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// ); 

// const products = [
//   {
//     id: 1,
//     name: "Golden",
//     description: "File (218.89) × 222.68 dycon...",
//     price: 120000,
//     originalPrice: 150000,
//     rating: 3.5,
//     reviewCount: "400+",
//     image: shirt, // Replace with your actual image path
//     isFavorite: true,
//   },
//    {
//     id: 2,
//     name: "Golden",
//     description: "File (218.89) × 222.68 dycon...",
//     price: 120000,
//     originalPrice: 150000,
//     rating: 3.5,
//     reviewCount: "400+",
//     image: brown, // Replace with your actual image path
//     isFavorite: true,
//   },
//    {
//     id: 3,
//     name: "Golden",
//     description: "File (218.89) × 222.68 dycon...",
//     price: 120000,
//     originalPrice: 150000,
//     rating: 3.5,
//     reviewCount: "400+",
//     image: denim, // Replace with your actual image path
//     isFavorite: true,
//   },
// //    {
// //     id: 4,
// //     name: "Golden",
// //     description: "File (218.89) × 222.68 dycon...",
// //     price: 120000,
// //     originalPrice: 150000,
// //     rating: 3.5,
// //     reviewCount: "400+",
// //     image: denim, // Replace with your actual image path
// //     isFavorite: true,
// //   },
// //    {
// //     id: 5,
// //     name: "Golden",
// //     description: "File (218.89) × 222.68 dycon...",
// //     price: 120000,
// //     originalPrice: 150000,
// //     rating: 3.5,
// //     reviewCount: "400+",
// //     image: denim, // Replace with your actual image path
// //     isFavorite: true,
// //   },
 
//   // Add more products as needed
// ];

// export default function RecentlyViewed() {
//     return (
//         <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <p className='text-[#061410] text-xl font-bold'>Recently Viewed</p>
//             <Stack direction="row" spacing={2}>
//                 {products.map((product, idx) => (
//                     <Card sx={{ minWidth: 220, 
//                         maxWidth: 240, position: 'relative', 
//                         borderRadius: '8px', 
//                         boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} 
//                         key={product.id}>
//                         <Box sx={{ position: 'relative' }}>
//                             <Image
//                                 component="img"
//                                 src={product.image}
//                                 alt={product.name}
//                                 sx={{
//                                     width: '100%',
//                                     height: 240,
//                                     objectFit: 'cover',
//                                     borderTopLeftRadius: 8,
//                                     borderTopRightRadius: 8,
//                                 }}
//                             />
//                                 <IconButton
//                                     sx={{
//                                     position: 'absolute',
//                                     bottom: 8,
//                                     right: 8,
//                                     background: 'white',
//                                     width: 32,
//                                     height: 32,
//                                     borderRadius: '50%',
//                                     boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
//                                     '&:hover': {
//                                         background: 'white',
//                                     },
//                                     padding: 0,
//                                     }}
//                                     size="small"
//                                 >
//                                     {product.isFavorite ? (
//                                     <FavoriteIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
//                                     ) : (
//                                     <FavoriteBorderIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
//                                     )}
//                                 </IconButton>
//                             </Box>
//                         <CardContent sx={{ p: 1.5 }}>
//                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
//                                 <Typography 
//                                 variant="subtitle2" 
//                                 sx={{ 
//                                     fontWeight: '600',
//                                     fontSize: '14px',
//                                     color: '#1976d2'
//                                 }}
//                                 >
//                                 {product.name}
//                                 </Typography>
//                                 <Typography 
//                                 variant="caption" 
//                                 sx={{ 
//                                     color: 'text.secondary',
//                                     fontSize: '10px'
//                                 }}
//                                 >
//                                 {product.description}
//                                 </Typography>
//                             </Box>
                            
//                             <Box sx={{ mb: 0.5 }}>
//                                 <Typography 
//                                 variant="body1" 
//                                 sx={{ 
//                                     fontWeight: 700,
//                                     fontSize: '16px'
//                                 }}
//                                 >
//                                 ₦{product.price.toLocaleString()}
//                                 </Typography>
//                                 <Typography 
//                                 variant="caption" 
//                                 sx={{ 
//                                     textDecoration: 'line-through',
//                                     color: 'text.secondary',
//                                     fontSize: '12px'
//                                 }}
//                                 >
//                                 ₦{product.originalPrice.toLocaleString()}
//                                 </Typography>
//                             </Box>
                            
//                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                 <Box sx={{ display: 'flex', mr: 0.5 }}>
//                                 {[...Array(Math.floor(product.rating))].map((_, i) => (
//                                     <StarIcon key={i} sx={{ fontSize: 14, color: '#FFA000' }} />
//                                 ))}
//                                 {product.rating % 1 !== 0 && (
//                                     <StarHalfIcon sx={{ fontSize: 14, color: '#FFA000' }} />
//                                 )}
//                                 </Box>
//                                 <Typography 
//                                 variant="caption" 
//                                 sx={{ 
//                                     color: 'text.secondary',
//                                     fontSize: '12px'
//                                 }}
//                                 >
//                                 {product.rating} ({product.reviewCount} Reviews)
//                                 </Typography>
//                             </Box>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </Stack>            
//         </div>

//     )
// }

'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Image from 'next/image';

import shirt from '../assets/shirt.png';
import brown from '../assets/brown.png';
import denim from '../assets/denim.png';
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { useRecentlyViewedQuery } from '../lib/hooks/useRecentlyViewedQuery'; 
// const products = [
//   {
//     id: 1,
//     name: "Golden",
//     description: "File (218.89) × 222.68 dycon...",
//     price: 120000,
//     originalPrice: 150000,
//     rating: 3.5,
//     reviewCount: "400+",
//     image: shirt,
//     isFavorite: true,
//   },
//   {
//     id: 2,
//     name: "Golden",
//     description: "File (218.89) × 222.68 dycon...",
//     price: 120000,
//     originalPrice: 150000,
//     rating: 3.5,
//     reviewCount: "400+",
//     image: brown,
//     isFavorite: true,
//   },
//   {
//     id: 3,
//     name: "Golden",
//     description: "File (218.89) × 222.68 dycon...",
//     price: 120000,
//     originalPrice: 150000,
//     rating: 3.5,
//     reviewCount: "400+",
//     image: denim,
//     isFavorite: true,
//   },
// ];

export default function RecentlyViewed() {
    const { data: products=[], isLoading, isError } = useRecentlyViewedQuery();
    console.log('Fetched products:', products);

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
       <div className="flex justify-between items-start">
            <p className='text-[#061410] text-xl font-bold'>Recently Viewed</p>
            <p className='flex items-center text-sm font-semibold text-[#174F41] mb-4'>View All<FaArrowRight className="ml-1" /></p>
        </div>

      {/* Responsive Grid: 2 cols on mobile, 4 on medium and above */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product._id}
            sx={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-t-lg object-cover w-full h-[180px]"
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
                  '&:hover': { background: 'white' },
                  padding: 0,
                }}
              >
                {product.isFavorite ? (
                  <FavoriteIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                )}
              </IconButton>
            </Box>

            <CardContent sx={{ p: 1.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: '600',
                  fontSize: '14px',
                  color: '#1976d2',
                }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', fontSize: '11px' }}
              >
                {product.description}
              </Typography>

              <Box sx={{ my: 0.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>
                  ₦{product.price.toLocaleString()}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                    fontSize: '12px',
                  }}
                >
                  ₦{product.originalPrice.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
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
                  sx={{ color: 'text.secondary', fontSize: '12px' }}
                >
                  {product.rating} ({product.reviewCount} Reviews)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
