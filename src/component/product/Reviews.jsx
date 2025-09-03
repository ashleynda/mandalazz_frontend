"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, Divider, CircularProgress, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useComments } from "../../lib/hooks/useGetReviews";
import ReviewModal from "../../component/reusables/reviewModal";
import { useFetchReviews } from "@/src/lib/hooks/account/useFetchReviews";
import { formatName } from "../../lib/utils/index"
import { useFetchRateQuery } from "@/src/lib/hooks/useFetchRating";
import { useParams } from "next/navigation";


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
    const [open, setOpen] = useState(false);
    const [storedProductId, setStoredProductId] = useState(null);
    const [token, setToken] = useState('');
    const params = useParams();
    const id = params?.id;
    const { data: rateData, isLoading: rateLoading, isError: rateError } = useFetchRateQuery(token, id);
    // const productRating = rateData?.rating ?? 0;
    const productRating = rateData?.data?.[0]?.rating
    ? Number(rateData.data[0].rating)
    : 0;
    console.log('Product Rating:', productRating);
    useEffect(() => {
        const idFromStorage = sessionStorage.getItem('selectedProductId');
        if (idFromStorage) {
            setStoredProductId(idFromStorage);
        }
    }, []);
    const { data, error, isLoading } = useFetchReviews(storedProductId, {
        enabled: !!storedProductId, // Only fetch if productId is available
        // refetchOnWindowFocus: false, // Prevent refetching on window focus
    });
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
    // normalize reviews list
    // normalize reviews list
    const reviews = Array.isArray(data?.data) ? data.data : [];


    return (
        <>
            <div className="w-full max-w-lg p-4" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <div className="space-y-4 min-h-[250px] flex flex-col justify-center">
                    {isLoading && (
                        <div className="flex justify-center items-center w-full">
                            <CircularProgress />
                        </div>
                    )}
                    {!isLoading && reviews.length === 0 && (
                        <p
                            variant="body1"
                            color="textSecondary"
                            align="center"
                            sx={{ width: '100%' }}
                        >
                            No reviews found.
                        </p>
                    )}
                    {!isLoading && reviews.length > 0 && (
                        <>
                            {reviews.map((review, index) => (
                                <div key={index} className="space-y-2">
                                    <p className="font-bold text-[#000000] text-base">
                                        {formatName(review.user?.firstName)} {formatName(review.user?.lastName)}
                                    </p>
                                    <div className="flex items-center space-x-2 text-sm text-[#8D8C8C]">
                                        <Rating value={productRating} onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
                                        precision={0.5} size="small" className="w-[63px]" readOnly />
                                        <span className="text-[#8D8C8C] text-xs font-medium">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-[#000000] text-sm font-normal">
                                        {review.comment}
                                    </p>
                                    {index < reviews.length - 1 && <Divider />}
                                </div>
                            ))}
                            <div className="flex justify-center pt-2">
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
                            </div>
                        </>
                    )}
                </div>
            </div>
            <ReviewModal open={open} onClose={() => setOpen(false)} reviews={reviews} />
        </>
    );
}
