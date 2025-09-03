"use client";

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import useDeliveredOrders from '../../lib/hooks/account/useGetReviews';
import { formatDate } from '../../lib/utils';
import CompletedReviewsPage from './CompletedReviewsPage';

const ReviewsPage = ({ productId }) => {
    const [activeTab, setActiveTab] = useState('pending');
    const router = useRouter();
    const pathname = usePathname();
    const [storedProductId, setStoredProductId] = useState(null);
    useEffect(() => {
        const idFromStorage = sessionStorage.getItem('selectedProductId');
        if (idFromStorage) {
            setStoredProductId(idFromStorage);
        }
    }, []);

    useEffect(() => {
        if (pathname.includes('/completed-reviews')) {
            setActiveTab('completed');
        } else {
            setActiveTab('pending');
        }
    }, [pathname]);


    const { data: orders = [], isLoading, error } = useDeliveredOrders();

    const handleReviews = (product, order) => {
        if (!product?._id) {
            return;
        }
        // const imageUrl = product.images?.[0] || "";
        // router.push(
        //     `/dashboard/reviews/review-product/${product._id}?image=${encodeURIComponent(
        //     product.images?.[0] || ""
        //     )}&firstName=${encodeURIComponent(order.user?.firstName || "")}`
        // );
          const params = new URLSearchParams({
    image: product.images?.[0] || "",
    firstName: order.userDetails?.firstName || ""
  });

  router.push(`/dashboard/reviews/review-product/${product._id}?${params.toString()}`);

    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress':
                return 'text-orange-500';
            case 'Delivered':
                return 'text-green-500';
            case 'Cancelled':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case 'In Progress':
                return 'bg-orange-50';
            case 'Delivered':
                return 'bg-green-50';
            case 'Cancelled':
                return 'bg-red-50';
            default:
                return 'bg-gray-50';
        }
    };

    return (
        <div className="h-screen flex flex-col max-w-screen p-4 mt-8 rounded-lg bg-white">
            <div className="flex-shrink-0">
                <h1 className="text-xl font-semibold mb-6 text-[#3E3C3C]">My Orders</h1>

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
                            setActiveTab('completed')
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
                        {!orders?.length ? (
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
                                    {orders?.map((order, index) => (
                                        <div key={order._id || index}>
                                            {order.products?.map((product, pIndex) => {
                                                if (!product.product) {
                                                    return null;
                                                }
                                                return (
                                                    <div
                                                        key={pIndex}
                                                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white mb-2"
                                                    >
                                                        <div className="w-20 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                            {product.images?.length ? (
                                                                <img
                                                                    src={product.images[0]}
                                                                    alt={product.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                    <span className="text-gray-500 text-xs">No Image</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-medium text-[#061410] mb-2 text-base">
                                                                {product.name}
                                                            </h3>
                                                            <div className="space-y-1">
                                                                <p className="text-sm text-gray-600">
                                                                    Order No: <span className="font-medium">{order.orderNumber}</span>
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    Delivered On: <span className="font-medium">{formatDate(order.deliveryDate)}</span>
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-end gap-3">
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(
                                                                    order.deliveryStatus
                                                                )} ${getStatusColor(order.deliveryStatus)}`}
                                                            >
                                                                {order.deliveryStatus || "Delivered"}
                                                            </span>
                                                            {activeTab === "pending" && (
                                                                <button
                                                                    className="px-4 py-2 border border-[#319B79] text-[#319B79] rounded-lg text-sm font-medium hover:bg-[#26735B] hover:text-white transition-colors cursor-pointer"
                                                                    onClick={() =>
                                                                        handleReviews({
                                                                            _id: product.product,
                                                                            images: product.images,

                                                                        },
                                                                        order
                                                                    )
                                                                    }
                                                                >
                                                                    Review Product
                                                                </button>

                                                            )}
                                                            {activeTab === "completed" && (
                                                                <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                                                                    {/* Review Completed */}
                                                                    <CompletedReviewsPage completedReviews={reviews} />
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );

                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

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
