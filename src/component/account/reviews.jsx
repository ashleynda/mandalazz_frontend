"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useFetchReviews } from '../../lib/hooks/account/useFetchReviews';

const ReviewsPage = ({ productId}) => {
    const [activeTab, setActiveTab] = useState('pending');
    const router = useRouter();
    const pathname = usePathname();

    const isPending = pathname.includes('/pending');
    const isCompleted = pathname.includes('/completed');
      const { data, error, isLoading } = useFetchReviews(productId);
      console.log('fue', data)
    

    const handleReviews = (productId) => {
        router.push(`/dashboard/reviews/review-product${productId}`);
    }

    return (
        <div className="h-screen flex flex-col max-w-screen p-4 mt-14 rounded-lg bg-white border-2 border-[#F2F4F7]">
            <div className="flex-shrink-0">
                <h1 className="text-xl font-semibold mb-6">Reviews</h1>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab('pending')}
                        // onClick={() => router.push('/dashboard/reviews')}
                        className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors mr-8 ${activeTab === 'pending'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Pending Reviews
                    </button>
                    <button
                        // onClick={() => setActiveTab('completed')}
                        onClick={() => router.push('/dashboard/reviews/completed-reviews')}
                        className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'completed'
                                ? 'border-black text-black'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Completed Reviews
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
                {isLoading && (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-gray-500">Loading reviews...</div>
                    </div>
                )}

                {error && (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-red-500">Error loading reviews: {error.message}</div>
                    </div>
                )}

                {!isLoading && !error && (
                    <>
                        {!data?.comments || data.comments.length === 0 ? (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-gray-500 mb-2">No reviews available</div>
                                    <div className="text-sm text-gray-400">
                                        {activeTab === 'pending' ? 'No pending reviews at the moment.' : 'No completed reviews yet.'}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto">
                                <div className="space-y-4">
                                    {data.comments.map((comment, index) => (
                                        <div key={index} className="flex items-start gap-4 py-3 border-b border-gray-100">
                                            {/* Product Image */}
                                            <div className="w-16 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center relative">
                                                    <div className="absolute inset-0 bg-yellow-300 opacity-80"></div>
                                                    <div className="relative z-10 w-8 h-12 bg-yellow-500 rounded-sm"></div>
                                                </div>
                                            </div>

                                            {/* Review Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-gray-900 mb-1 text-sm">
                                                    {comment.author || "Anonymous"}
                                                </h3>
                                                <p className="text-xs text-gray-600 mb-1">
                                                    {comment.commentText}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {new Date(comment.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col items-end gap-2">
                                                {activeTab === 'pending' && (
                                                    <button
                                                        className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                                                        onClick={() => handleReviews(productId)}
                                                    >
                                                        Review Product
                                                    </button>
                                                )}
                                                {activeTab === 'completed' && (
                                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Pagination - Always at bottom */}
            <div className="flex-shrink-0 flex items-center justify-center gap-2 mt-8 pt-4 border-t border-gray-100">
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

export default ReviewsPage;