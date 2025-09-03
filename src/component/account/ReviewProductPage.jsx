"use client";

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSnackbarStore from "@/src/lib/store/useSnackbarStore";
import { usePostReview } from '../../lib/hooks/account/useComment';
import { useParams } from 'next/navigation';
import useDeliveredOrders from '../../lib/hooks/account/useGetReviews';
import Divider from '@mui/material/Divider';
import { formatName, truncateText } from '../../lib/utils';
import { useQueryClient } from '@tanstack/react-query';

const ReviewProductPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
  const { data: orders = [] } = useDeliveredOrders();
  const { id: productId } = useParams();
  const searchParams = useSearchParams();
  const productImage = searchParams.get("image");
  const firstNameFromQuery = searchParams.get("firstName");

  const { mutate, isPending, isSuccess, isError } = usePostReview();
  const products = orders.flatMap(order => order.products ?? []);

  const product = products.find(p => p.product === productId);
  const queryClient = useQueryClient();

  useEffect(() => {
  if (firstNameFromQuery) {
    setName(firstNameFromQuery);
  }
}, [firstNameFromQuery]);

  const handleSubmit = () => {
    mutate(
      { productId, commentText: review },

      {
        onSuccess: () => {
          showSnackbar({ message: "Review submitted successfully!", severity: "success" });
          queryClient.invalidateQueries(["reviews"]);
          router.push('/dashboard/reviews/completed-reviews');
        },
        onError: () => {
          showSnackbar({ message: "Failed to submit review.", severity: "error" });
        },
      }
    );
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="max-w-4xl p-4 mt-8 bg-white">
      <div className="flex items-center gap-3 mb-4 ">
        <button className="p-1 hover:bg-gray-100 rounded">
          <ArrowLeft size={20} className="text-gray-600" onClick={() => router.push('/dashboard/reviews')} />
        </button>
        <h1 className="text-lg font-bold text-[#3E3C3C]">Review Product</h1>
      </div>
      <div className="-mx-6 md:-mx-4 hidden md:block">
        <Divider className="border-gray-200" />
      </div>

      <div className="flex items-center gap-4 mb-8 w-full max-w-2xl">
        <div className="w-18 h-22 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden mt-6">
          {productImage ? (
            <img
              src={productImage}
              alt={product?.name || "Product"}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#061410]">{product?.name}</h2>
          {/* <p className="text-xs text-gray-500 line-clamp-3">{product?.description || "No description available."}</p> */}
        </div>
      </div>
      <div className="-mx-6 md:-mx-4 hidden md:block mb-6">
        <Divider className="border-gray-200" />
      </div>

      <div className="mb-6">
        <p className="text-sm font-normal text-[#061410] mb-3">How would you rate this product?</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <button
              key={starIndex}
              onClick={() => handleStarClick(starIndex)}
              onMouseEnter={() => handleStarHover(starIndex)}
              onMouseLeave={handleStarLeave}
              className="p-1 transition-colors"
            >
              <Star
                size={24}
                className={`transition-colors ${starIndex <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                  }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-[#101828] mb-2">Your Name</label>
        <div className="relative">
          <input
            type="text"
            value={formatName(name)}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Enter your name"
            disabled
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-[#26735B] rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xs font-medium text-[#101828] mb-2">Detailed Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          placeholder="Tell us about the product..."
        />
      </div>

      {/* Submit Button */}
      {/* <button className="w-full bg-[#26735B] hover:bg-green-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-colors">
        Submit Review
      </button> */}
      <div className="-mx-6 md:-mx-4 hidden md:block mb-6">
        <Divider className="border-gray-200" />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className={` ${isPending ? 'bg-gray-400' : 'bg-[#26735B] hover:bg-[#26735B] cursor-pointer'
          } text-white text-sm font-bold py-3 px-4 rounded-lg transition-colors`}
      >
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>

    </div>
  );
};

export default ReviewProductPage;