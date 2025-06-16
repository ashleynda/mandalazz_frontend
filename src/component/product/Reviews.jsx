"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, Divider, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useComments } from "../../lib/hooks/useGetReviews";
import ReviewModal from "../../component/reusables/reviewModal";


const Stars = ({ rating }) => {
    return (
        <Box className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) =>
                i < rating ? (
                    <StarIcon key={i} className="text-yellow-500 w-4 h-4" />
                ) : (
                    <StarBorderIcon key={i} className="text-yellow-500 w-4 h-4" />
                )
            )}
        </Box>
    );
};

export default function ReviewList() {
    const { data, isLoading } = useComments();
    const [open, setOpen] = useState(false);
//     if (isLoading) {
//     return (
//       <Box className="flex justify-center items-center h-32">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!data || data.length === 0) {
//     return (
//       <Box className="flex justify-center items-center h-32">
//         <Typography variant="body1" color="textSecondary">
//           No reviews found.
//         </Typography>
//       </Box>
//     );
//   }
    return (
        <>
        <Card className="w-full max-w-lg mx-auto p-4" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <CardContent className="space-y-6 min-h-[250px] flex flex-col justify-center">
                 {isLoading && (
            <Box className="flex justify-center items-center w-full">
              <CircularProgress />
            </Box>
          )}

          {/* No reviews */}
          {!isLoading && (!data || data.length === 0) && (
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              sx={{ width: '100%' }}
            >
              No reviews found.
            </Typography>
          )}
           {!isLoading && data && data.length > 0 && (
            <>
                {data?.map((review, index) => (
                    <Box key={index} className="space-y-2 pb-4">
                        <p variant="subtitle1" className="font-semibold text-gray-900">
                            {review.name}
                        </p>
                        <Box className="flex items-center space-x-2 text-sm text-gray-500">
                            <Stars rating={review.rating} />
                            <span>{review.date}</span>
                        </Box>
                        <p variant="body2" className="text-gray-700">
                            {review.content}
                        </p>
                        {index < reviews.length - 1 && <Divider />}
                    </Box>
                ))}
                <Box className="flex justify-center pt-2">
                    <Button
                        variant="outlined"
                        sx={{
                            color: '#26735B',
                            borderColor: '#26735B',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            paddingX: 3,
                            fontSize: '0.875rem',
                            borderRadius: '0.5rem',
                            '&:hover': {
                                borderColor: '#26735B',
                                backgroundColor: 'transparent',
                            },
                        }}
                        onClick={() => setOpen(true)}
                    // className="rounded-lg px-6 text-sm text-[#26735B] font-bold capitalize border border-[#26735B]"
                    >
                        See All Reviews
                    </Button>
                </Box>
            </>
            )}
            </CardContent>
        </Card>
         <ReviewModal open={open} onClose={() => setOpen(false)} reviews={data} />
         </>
    );
}
