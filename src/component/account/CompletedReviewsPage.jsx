"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const CompletedReviewsPage = () => {
  const [activeTab, setActiveTab] = useState('completed');
  
  const reviews = [
    {
      id: 1,
      productName: 'Golden Yellow Butterfly Bodycon Dress',
      reviewerName: 'Martins',
      rating: 4,
      date: 'May 18, 2025',
      status: 'Delivered',
      reviewText: 'Lorem ipsum dolor sit amet consectetur. Neque quis commodo risque justo id scelerisque ultrices varius ornare. Aliquam dignissim amet fames sollicitudin hac metus fusce ultrices. Dignissim aliquam erat ipsum dolor. Nascetur id nulla porttitor vel enim tristique viverra nibh imperdiet.'
    },
    {
      id: 2,
      productName: 'Golden Yellow Butterfly Bodycon Dress',
      reviewerName: 'Martins',
      rating: 4,
      date: 'May 18, 2025',
      status: 'Delivered',
      reviewText: 'Lorem ipsum dolor sit amet consectetur. Neque quis commodo risque justo id scelerisque ultrices varius ornare. Aliquam dignissim amet fames sollicitudin hac metus fusce ultrices. Dignissim aliquam erat ipsum dolor. Nascetur id nulla porttitor vel enim tristique viverra nibh imperdiet.'
    },
    {
      id: 3,
      productName: 'Golden Yellow Butterfly Bodycon Dress',
      reviewerName: 'Martins',
      rating: 4,
      date: 'May 18, 2025',
      status: 'Delivered',
      reviewText: 'Lorem ipsum dolor sit amet consectetur. Neque quis commodo risque justo id scelerisque ultrices varius ornare. Aliquam dignissim amet fames sollicitudin hac metus fusce ultrices. Dignissim aliquam erat ipsum dolor. Nascetur id nulla porttitor vel enim tristique viverra nibh imperdiet.'
    },
    {
      id: 4,
      productName: 'Golden Yellow Butterfly Bodycon Dress',
      reviewerName: 'Martins',
      rating: 4,
      date: 'May 18, 2025',
      status: 'Delivered',
      reviewText: 'Lorem ipsum dolor sit amet consectetur. Neque quis commodo risque justo id scelerisque ultrices varius ornare. Aliquam dignissim amet fames sollicitudin hac metus fusce ultrices. Dignissim aliquam erat ipsum dolor. Nascetur id nulla porttitor vel enim tristique viverra nibh imperdiet.'
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white border-2 border-blue-400">
      <h1 className="text-xl font-semibold mb-6">My Orders</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors mr-8 ${
            activeTab === 'pending'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Pending Reviews
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'completed'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Completed Reviews
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex items-start gap-4">
            {/* Product Image */}
            <div className="w-16 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-yellow-300 opacity-80"></div>
                <div className="relative z-10 w-8 h-12 bg-yellow-500 rounded-sm"></div>
              </div>
            </div>
            
            {/* Review Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900 text-sm">{review.productName}</h3>
                <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-600 ml-2">
                  {review.status}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-900">{review.reviewerName}</span>
                {renderStars(review.rating)}
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              
              <p className="text-xs text-gray-600 leading-relaxed">{review.reviewText}</p>
            </div>
          </div>
        ))}
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