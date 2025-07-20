// "use client";

// import React, { useEffect, useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useUpdateDelivery } from '../../lib/hooks/account/useOrder';
// import useSnackbarStore from '@/src/lib/store/useSnackbarStore';
// import { useFetchMyOrders } from '../../lib/hooks/account/useGetorder';

// const OrdersPage = () => {
//   const [activeTab, setActiveTab] = useState('ongoing');
//   const [token, setToken] = useState(null);
//   const { showSnackbar } = useSnackbarStore();

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     setToken(storedToken);
//   }, []);


//   const { data, error, isPending } = useFetchMyOrders();
//   const orders = data || [];

//   console.log('Orders:', data, 'Error:', error);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'In Progress':
//         return 'text-orange-500';
//       case 'Delivered':
//         return 'text-green-500';
//       case 'Cancelled':
//         return 'text-red-500';
//       default:
//         return 'text-gray-500';
//     }
//   };

//   const getStatusBg = (status) => {
//     switch (status) {
//       case 'In Progress':
//         return 'bg-orange-50';
//       case 'Delivered':
//         return 'bg-green-50';
//       case 'Cancelled':
//         return 'bg-red-50';
//       default:
//         return 'bg-gray-50';
//     }
//   };






//   const handleUpdateDelivery = () => {
//     console.log("Updating delivery...");
//   }


//   return (
//     <div className="max-w-4xl p-4 bg-white mt-14 rounded-lg">
//       <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           onClick={() => setActiveTab('ongoing')}
//           className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
//             activeTab === 'ongoing'
//               ? 'border-black text-black'
//               : 'border-transparent text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           Ongoing/Delivered
//         </button>
//         {/* <button
//           onClick={() => setActiveTab('cancelled')}
//           className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
//             activeTab === 'cancelled'
//               ? 'border-black text-black'
//               : 'border-transparent text-gray-500 hover:text-gray-700'
//           }`}
//         >
//           Cancelled/Returned
//         </button> */}
//       </div>

//       {/* Orders List */}
//       <div className="space-y-4">
//         {orders.map((order, index) => (
//           <div key={index} className="border border-gray-200 rounded-lg p-4">
//             <div className="grid grid-cols-12 gap-4 items-start">
//               {/* Product Image */}
//               <div className="w-16 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
//                 <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
//                   <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-50"></div>
//                 </div>
//               </div>

//               {/* Order Details */}
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-medium text-gray-900 mb-2">{order.name}</h3>
//                 <p className="text-sm text-gray-600 mb-1">Order No: {order.id}</p>
//                 {order.expectedDelivery && (
//                   <p className="text-sm text-gray-600 mb-2">
//                     Expected Delivery: {order.expectedDelivery}
//                   </p>
//                 )}
//                 {order.deliveredOn && (
//                   <p className="text-sm text-gray-600 mb-2">
//                     Delivered On: {order.deliveredOn}
//                   </p>
//                 )}
//                 <p className="text-lg font-semibold text-gray-900">{order.price}</p>
//               </div>

//               {/* Status and Actions */}
//               <div className="flex flex-col items-end gap-3">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(order.status)} ${getStatusColor(order.status)}`}>
//                   {order.status}
//                 </span>
//                 <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleUpdateDelivery(order.id)}>
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-center gap-2 mt-8">
//         <button className="p-2 text-gray-400 hover:text-gray-600">
//           <ChevronLeft size={20} />
//         </button>
//         <span className="text-sm text-gray-500">Previous</span>

//         <div className="flex gap-1 mx-4">
//           <button className="w-8 h-8 rounded bg-black text-white text-sm">1</button>
//           <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">2</button>
//           <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">3</button>
//           <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
//           <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">10</button>
//         </div>

//         <span className="text-sm text-gray-500">Next</span>
//         <button className="p-2 text-gray-600 hover:text-gray-800">
//           <ChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;

"use client";

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Package, ShoppingBag } from 'lucide-react';
import { useUpdateDelivery } from '../../lib/hooks/account/useOrder';
import useSnackbarStore from '@/src/lib/store/useSnackbarStore';
import { useFetchMyOrders } from '../../lib/hooks/account/useGetorder';
import { useRouter } from 'next/navigation';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [token, setToken] = useState(null);
  const { showSnackbar } = useSnackbarStore();
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');
    setToken(storedToken);
  }, []);

  const { data, error, isPending } = useFetchMyOrders(token);
  const orders = data?.message?.checkouts || [];
  console.log('Data from useFetchMyOrders:', data);
  useEffect(() => {
    console.log('Orders Hook Data:', data);
  }, [data]);



  console.log('Orders:', data, 'Error:', error);

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

  const handleUpdateDelivery = (orderId) => {
    console.log("Updating delivery...");
    console.log("Updating delivery for order:", orderId);
    router.push(`/dashboard/orders/order-details/${orderId}`)
  }

  // Empty State Component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Package className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        You haven't placed any orders yet. When you do, they'll appear here so you can track their progress.
      </p>
      <button className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
        <ShoppingBag className="w-5 h-5 mr-2" />
        Start Shopping
      </button>
    </div>
  );

  // Loading State Component
  const LoadingState = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
          <div className="grid grid-cols-12 gap-4 items-start">
            <div className="w-16 h-20 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded mb-1 w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded mb-2 w-2/3"></div>
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <Package className="w-12 h-12 text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to load orders</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We're having trouble loading your orders. Please try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl p-4 bg-white mt-14 rounded-lg">
      <h1 className="text-lg font-bold mb-6 text-[#3E3C3C]">My Orders</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'ongoing'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          Ongoing/Delivered
        </button>
      </div>

      {/* Content based on state */}
      {isPending ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : orders.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex gap-4 items-start">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={
                        order.products[0]?.product?.variations?.[0]?.images?.[0] ||
                        "https://via.placeholder.com/150"
                      }
                      alt={order.products[0]?.product?.name || "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex flex-col min-w-0">
                    <div className='flex gap-2'>
                      <h3 className="font-normal text-sm  text-[#061410] mb-2">{order.products[0]?.product?.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(
                          order.deliveryStatus
                        )} ${getStatusColor(order.deliveryStatus)}`}
                      >
                        {order.deliveryStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <p className='text-[#667085] text-[13px] font-normal'>Order No: <span className='text-[#061410] text-[13px] font-normal'>{order._id?.slice(-6) || 'N/A'}</span></p>
                      {order.estimatedDeliveryDate && order.deliveryStatus !== 'Delivered' && (
                        <p className='text-[#667085] text-sm font-normal'>
                          Expected Delivery:<span className='text-[#061410] text-sm font-normal'> {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</span>
                        </p>
                      )}
                      {order.deliveredOn && order.deliveryStatus === 'Delivered' && (
                        <span>
                          Delivered On: {new Date(order.deliveredOn).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="text-base font-bold text-[#000000]">
                      ₦{order.totalAmount?.toLocaleString() || '0'}
                    </p>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <button className="px-4 py-2 border border-[#26735B] rounded-lg text-xs font-bold text-[#26735B] hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleUpdateDelivery(order._id)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - Only show if there are orders */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-gray-500">Previous</span>

            <div className="flex gap-1 mx-4">
              <button className="w-8 h-8 rounded bg-black text-white text-sm">1</button>
              <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">2</button>
              <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">3</button>
              <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
              <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">10</button>
            </div>

            <span className="text-sm text-gray-500">Next</span>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;