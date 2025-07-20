// "use client";

// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { usePathname, useRouter } from 'next/navigation';
// import { useFetchReviews } from '../../lib/hooks/account/useFetchReviews';

// const ReviewsPage = ({ productId}) => {
//     const [activeTab, setActiveTab] = useState('pending');
//     const router = useRouter();
//     const pathname = usePathname();

//     const isPending = pathname.includes('/pending');
//     const isCompleted = pathname.includes('/completed');
//       const { data, error, isLoading } = useFetchReviews(productId);
//       console.log('fue', data)
    

//     const handleReviews = (productId) => {
//         router.push(`/dashboard/reviews/review-product${productId}`);
//     }

//     return (
//         <div className="h-screen flex flex-col max-w-screen p-4 mt-14 rounded-lg bg-white border-2 border-[#F2F4F7]">
//             <div className="flex-shrink-0">
//                 <h1 className="text-lg font-bold mb-6 text-[#3E3C3C]">My Orders</h1>

//                 {/* Tabs */}
//                 <div className="flex border-b border-gray-200 mb-6">
//                     <button
//                         onClick={() => setActiveTab('pending')}
//                         // onClick={() => router.push('/dashboard/reviews')}
//                         className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors mr-8 ${activeTab === 'pending'
//                                 ? 'border-[#319B79] text-#191818'
//                                 : 'border-transparent text-[#8D8C8C] hover:text-gray-700'
//                             }`}
//                     >
//                         Pending Reviews
//                     </button>
//                     <button
//                         // onClick={() => setActiveTab('completed')}
//                         onClick={() => router.push('/dashboard/reviews/completed-reviews')}
//                         className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'completed'
//                                 ? 'border-[#319B79] text-black'
//                                 : 'border-transparent text-[#8D8C8C] hover:text-gray-700'
//                             }`}
//                     >
//                         Completed Reviews
//                     </button>
//                 </div>
//             </div>

//             <div className="flex-1 flex flex-col min-h-0">
//                 {isLoading && (
//                     <div className="flex-1 flex items-center justify-center">
//                         <div className="text-gray-500">Loading reviews...</div>
//                     </div>
//                 )}

//                 {error && (
//                     <div className="flex-1 flex items-center justify-center">
//                         <div className="text-red-500">Error loading reviews: {error.message}</div>
//                     </div>
//                 )}

//                 {!isLoading && !error && (
//                     <>
//                         {!data?.comments || data.comments.length === 0 ? (
//                             <div className="flex-1 flex items-center justify-center">
//                                 <div className="text-center">
//                                     <div className="text-gray-500 mb-2">No reviews available</div>
//                                     <div className="text-sm text-gray-400">
//                                         {activeTab === 'pending' ? 'No pending reviews at the moment.' : 'No completed reviews yet.'}
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="flex-1 overflow-y-auto">
//                                 <div className="space-y-4">
//                                     {data.comments.map((comment, index) => (
//                                         <div key={index} className="flex items-start gap-4 py-3 border-b border-gray-100">
//                                             {/* Product Image */}
//                                             <div className="w-16 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
//                                                 <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center relative">
//                                                     <div className="absolute inset-0 bg-yellow-300 opacity-80"></div>
//                                                     <div className="relative z-10 w-8 h-12 bg-yellow-500 rounded-sm"></div>
//                                                 </div>
//                                             </div>

//                                             {/* Review Details */}
//                                             <div className="flex-1 min-w-0">
//                                                 <h3 className="font-normal text-[#061410] mb-1 text-sm">
//                                                     {comment.author || "Anonymous"}
//                                                 </h3>
//                                                 <p className="text-xs text-gray-600 mb-1">
//                                                     {comment.commentText}
//                                                 </p>
//                                                 <p className="text-xs text-gray-600">
//                                                     {new Date(comment.createdAt).toLocaleDateString()}
//                                                 </p>
//                                             </div>

//                                             {/* Actions */}
//                                             <div className="flex flex-col items-end gap-2">
//                                                 {activeTab === 'pending' && (
//                                                     <button
//                                                         className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
//                                                         onClick={() => handleReviews(productId)}
//                                                     >
//                                                         Review Product
//                                                     </button>
//                                                 )}
//                                                 {activeTab === 'completed' && (
//                                                     <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
//                                                         Completed
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>

//             {/* Pagination - Always at bottom */}
//             <div className="flex-shrink-0 flex items-center justify-center gap-2 mt-8 pt-4 border-t border-gray-100">
//                 <button className="p-2 text-gray-400 hover:text-gray-600">
//                     <ChevronLeft size={16} />
//                 </button>
//                 <span className="text-xs text-gray-500">Previous</span>

//                 <div className="flex gap-1 mx-4">
//                     <button className="w-7 h-7 rounded bg-black text-white text-xs">1</button>
//                     <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs">2</button>
//                     <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs">3</button>
//                     <span className="w-7 h-7 flex items-center justify-center text-gray-400 text-xs">...</span>
//                     <button className="w-7 h-7 rounded text-gray-600 hover:bg-gray-100 text-xs">10</button>
//                 </div>

//                 <span className="text-xs text-gray-500">Next</span>
//                 <button className="p-2 text-gray-600 hover:text-gray-800">
//                     <ChevronRight size={16} />
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ReviewsPage;

"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useFetchReviews } from '../../lib/hooks/account/useFetchReviews';

const ReviewsPage = ({ productId }) => {
    const [activeTab, setActiveTab] = useState('pending');
    const router = useRouter();
    const pathname = usePathname();

    const isPending = pathname.includes('/pending');
    const isCompleted = pathname.includes('/completed');
    const { data, error, isLoading } = useFetchReviews(productId);
    console.log('fue', data);

    const handleReviews = (productId) => {
        router.push(`/dashboard/reviews/review-product${productId}`);
    }

    // Mock data structure to match the design - replace with actual data mapping
    const mockOrders = [
        {
            id: '238895',
            productName: 'Golden Yellow Butterfly Bodycon Dress',
            image: '/api/placeholder/100/120',
            status: 'Delivered',
            deliveredOn: '12 January 2025',
            orderNumber: '238895'
        },
        {
            id: '238896',
            productName: 'Golden Yellow Butterfly Bodycon Dress',
            image: '/api/placeholder/100/120',
            status: 'Delivered',
            deliveredOn: '12 January 2025',
            orderNumber: '238896'
        }
    ];

    return (
        <div className="h-screen flex flex-col max-w-screen p-4 mt-14 rounded-lg bg-white border-2 border-[#F2F4F7]">
            <div className="flex-shrink-0">
                <h1 className="text-xl font-semibold mb-6 text-[#3E3C3C]">My Orders</h1>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors mr-8 ${
                            activeTab === 'pending'
                                ? 'border-[#319B79] text-[#191818]'
                                : 'border-transparent text-[#8D8C8C] hover:text-gray-700'
                        }`}
                    >
                        Pending Reviews
                    </button>
                    <button
                        onClick={() => router.push('/dashboard/reviews/completed-reviews')}
                        className={`px-0 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'completed'
                                ? 'border-[#319B79] text-black'
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
                        {(!data?.comments || data.comments.length === 0) && (!mockOrders || mockOrders.length === 0) ? (
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
                                    {/* Use mockOrders for now - replace with actual data mapping */}
                                    {mockOrders.map((order, index) => (
                                        <div key={order.id || index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white">
                                            {/* Product Image */}
                                            <div className="w-20 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                {order.image ? (
                                                    <img 
                                                        src={order.image} 
                                                        alt={order.productName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center relative">
                                                        <div className="absolute inset-0 bg-yellow-300 opacity-80"></div>
                                                        <div className="relative z-10 w-8 h-12 bg-yellow-500 rounded-sm"></div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-[#061410] mb-2 text-base">
                                                    {order.productName}
                                                </h3>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-gray-600">
                                                        Order No: <span className="font-medium">{order.orderNumber}</span>
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Delivered On: <span className="font-medium">{order.deliveredOn}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status and Action */}
                                            <div className="flex flex-col items-end gap-3">
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    {order.status}
                                                </span>
                                                {activeTab === 'pending' && (
                                                    <button
                                                        className="px-4 py-2 border border-[#319B79] text-[#319B79] rounded-lg text-sm font-medium hover:bg-[#319B79] hover:text-white transition-colors cursor-pointer"
                                                        onClick={() => handleReviews(order.id)}
                                                    >
                                                        Review Product
                                                    </button>
                                                )}
                                                {activeTab === 'completed' && (
                                                    <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                                                        Review Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* If you want to also show the comment data, uncomment and modify this section */}
                                    {/*
                                    {data?.comments?.map((comment, index) => (
                                        <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white">
                                            <div className="w-20 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center relative">
                                                    <div className="absolute inset-0 bg-yellow-300 opacity-80"></div>
                                                    <div className="relative z-10 w-8 h-12 bg-yellow-500 rounded-sm"></div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium text-[#061410] mb-2 text-base">
                                                    {comment.author || "Product Name"}
                                                </h3>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-gray-600">
                                                        {comment.commentText}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(comment.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col items-end gap-3">
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    Delivered
                                                </span>
                                                {activeTab === 'pending' && (
                                                    <button
                                                        className="px-4 py-2 border border-[#319B79] text-[#319B79] rounded-lg text-sm font-medium hover:bg-[#319B79] hover:text-white transition-colors cursor-pointer"
                                                        onClick={() => handleReviews(productId)}
                                                    >
                                                        Review Product
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    */}
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