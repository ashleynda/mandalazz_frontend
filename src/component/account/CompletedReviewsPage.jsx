"use client";

import React, { use, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { usePathname, useRouter } from 'next/navigation';

const CompletedReviewsPage = ({ completedReviews }) => {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('completed');
  const pathname = usePathname();
  const router = useRouter();

  
  useEffect(() => {
    if (completedReviews && completedReviews.length > 0) {
      const mappedReviews = completedReviews.map((review) => ({
        id: review.comment_id,
        productName: review.productName, // should come from backend
        productImage: review.productImage, // should come from backend
        firstName: review.firstName,
        rating: review.rating || 0,
        createdAt: review.createdAt,
        status: review.status || "Delivered",
        comment: review.comment,
      }));

      setReviews(mappedReviews);
    }
  }, [completedReviews]);


  useEffect(() => {
    if (pathname.includes('/completed-reviews')) {
      setActiveTab('completed');
    } else {
      setActiveTab('pending');
    }
  }, [pathname]);

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-screen mx-auto p-4 mt-8 bg-white border-2 border-blue-400">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => {
            setActiveTab('pending')
            router.push('/dashboard/reviews')
          }}
          className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors mr-8 ${activeTab === 'pending'
            ? 'border-[#319B79] text-[#191818]'
            : 'border-transparent text-[#8D8C8C] hover:text-gray-700'
            }`}
        >
          Pending Reviews
        </button>
        <button
          onClick={() => {
            setActiveTab("completed")
            router.push('/dashboard/reviews/completed-reviews')
          }}
          className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'completed'
            ? 'border-[#319B79] text-[#191818]'
            : 'border-transparent text-[#8D8C8C] hover:text-gray-700'
            }`}
        >
          Completed Reviews
        </button>
      </div>
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex items-start gap-4">
              <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                {review.productImage ? (
                  <img
                    src={review.productImage}
                    alt={review.productName}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{review.productName}</h3>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-600 ml-2">
                    {review.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900">{review.firstName}</span>
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-500">{formatDate(review.createdAt)}</span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No completed reviews yet.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <ChevronLeft size={16} />
        </button>
        <span className="text-xs text-gray-500">Previous</span>

        <div className="flex gap-1 mx-4">
          <button className="w-7 h-7 rounded bg-black text-white text-xs">1</button>
          <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs">2</button>
          <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs">3</button>
          <span className="w-7 h-7 flex items-center justify-center text-gray-400 text-xs">...</span>
          <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs">10</button>
        </div>

        <span className="text-xs text-gray-500">Next</span>
        <button className="p-2 text-gray-600 hover:text-gray-800">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CompletedReviewsPage;