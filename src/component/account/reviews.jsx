"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const ReviewsPage = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const router = useRouter();
    const pathname = usePathname();

    const isPending = pathname.includes('/pending');
    const isCompleted = pathname.includes('/completed');
    const orders = [
        {
            id: '238695',
            name: 'Golden Yellow Butterfly Bodycon Dress',
            deliveredOn: '12 January 2025',
            status: 'Delivered',
            image: '/api/placeholder/60/80',
            isFirstItem: true
        },
        {
            id: '238695',
            name: 'Golden Yellow Butterfly Bodycon Dress',
            deliveredOn: '12 January 2025',
            status: 'Delivered',
            image: '/api/placeholder/60/80'
        },
        {
            id: '238695',
            name: 'Golden Yellow Butterfly Bodycon Dress',
            deliveredOn: '12 January 2025',
            status: 'Delivered',
            image: '/api/placeholder/60/80'
        },
        {
            id: '238695',
            name: 'Golden Yellow Butterfly Bodycon Dress',
            deliveredOn: '12 January 2025',
            status: 'Delivered',
            image: '/api/placeholder/60/80'
        },
        {
            id: '238695',
            name: 'Golden Yellow Butterfly Bodycon Dress',
            deliveredOn: '12 January 2025',
            status: 'Delivered',
            image: '/api/placeholder/60/80'
        },
        {
            id: '238695',
            name: 'Golden Yellow Butterfly Bodycon Dress',
            deliveredOn: '12 January 2025',
            status: 'Delivered',
            image: '/api/placeholder/60/80'
        },
        {
            id: '238695',
            name: 'Golden Yellow Butterfly Bodycon Dress',
            deliveredOn: '12 January 2025',
            status: 'Delivered',
            image: '/api/placeholder/60/80'
        }
    ];

    const handleReviews = () => {
        router.push('/dashboard/reviews/review-product');
    }

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white border-2 border-blue-400">
            <h1 className="text-xl font-semibold mb-6">My Orders</h1>

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

            {/* Orders List */}
            <div className="space-y-4">
                {orders.map((order, index) => (
                    <div key={index} className="flex items-start gap-4 py-3">
                        {/* Product Image */}
                        <div className="w-16 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                            {order.isFirstItem ? (
                                <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-yellow-300 opacity-80"></div>
                                    <div className="relative z-10 w-8 h-12 bg-yellow-500 rounded-sm"></div>
                                </div>
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                    <div className="w-8 h-12 bg-gray-600 rounded-sm"></div>
                                </div>
                            )}
                        </div>

                        {/* Order Details */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 mb-1 text-sm">{order.name}</h3>
                            <p className="text-xs text-gray-600 mb-1">Order No: {order.id}</p>
                            <p className="text-xs text-gray-600">
                                Delivered On: {order.deliveredOn}
                            </p>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex flex-col items-end gap-2">
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-600">
                                {order.status}
                            </span>
                            <button className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleReviews}>
                                Review Product
                            </button>
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

export default ReviewsPage;