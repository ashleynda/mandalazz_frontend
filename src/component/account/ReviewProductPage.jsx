"use client";

import React, { useState } from 'react';
import { ChevronLeft, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useSnackbarStore from "@/src/lib/store/useSnackbarStore";
import { usePostReview } from '../../lib/hooks/account/useComment';
import { useParams } from 'react-router-dom';

const ReviewProductPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('Martins');
  const [review, setReview] = useState('');
  const router = useRouter();
  const { showSnackbar } = useSnackbarStore();
   const params = useParams();
  const productId = params?.productId;

    // Hook for posting review
  const { mutate, isPending, isSuccess, isError } = usePostReview();

  const handleSubmit = () => {
    // const productId = "684776e12715270ce228fa53"; // Replace with actual product ID (could come from route params)
    mutate(
      { productId, review, rating, name },
      {
        onSuccess: () => {
          alert("Review submitted successfully!");
          router.push('/dashboard/reviews');
        },
        onError: () => {
          alert("Failed to submit review.");
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
    <div className="max-w-md mx-auto p-4 bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft size={20} className="text-gray-600" onClick={() => router.push('/dashboard/reviews')}/>
        </button>
        <h1 className="text-lg font-semibold">Review Product</h1>
      </div>

      {/* Product Section */}
      <div className="flex items-center gap-4 mb-8 w-full max-w-2xl">
        {/* Product Image */}
        <div className="w-12 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-yellow-300 opacity-80"></div>
            <div className="relative z-10 w-6 h-10 bg-yellow-500 rounded-sm"></div>
          </div>
        </div>
        
        {/* Product Name */}
        <div>
          <h3 className="font-bold text-[#061410] text-sm">Golden Yellow Butterfly Bodycon Dress</h3>
        </div>
      </div>

      {/* Rating Section */}
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
                className={`transition-colors ${
                  starIndex <= (hoverRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name Field */}
      <div className="mb-6">
        <label className="block text-xs font-medium text-[#101828] mb-2">Your Name</label>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Enter your name"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Review Field */}
      <div className="mb-8">
        <label className="block text-xs font-medium text-[#101828] mb-2">Detailed Review</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
          placeholder="Tell us about the product..."
        />
      </div>

      {/* Submit Button */}
      {/* <button className="w-full bg-[#26735B] hover:bg-green-700 text-white text-sm font-bold py-3 px-4 rounded-lg transition-colors">
        Submit Review
      </button> */}
            <button
        onClick={handleSubmit}
        disabled={isPending}
        className={`w-full ${
          isPending ? 'bg-gray-400' : 'bg-[#26735B] hover:bg-green-700'
        } text-white text-sm font-bold py-3 px-4 rounded-lg transition-colors`}
      >
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>

    </div>
  );
};

export default ReviewProductPage;