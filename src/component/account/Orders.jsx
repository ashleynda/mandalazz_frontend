"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUpdateDelivery } from '../../lib/hooks/account/useOrder';
import useSnackbarStore from '@/src/lib/store/useSnackbarStore';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const { mutate, data, error, isPending } = useFetchMyOrders();
  const { showSnachbar } = useSnackbarStore();

  
  const orders = [
    {
      id: '238695',
      name: 'Golden Yellow Butterfly Bodycon Dress',
      price: '₦40,000',
      status: 'In Progress',
      expectedDelivery: '15 January 2025',
      deliveredOn: null,
      image: '/api/placeholder/60/80'
    },
    {
      id: '238692',
      name: 'Golden Yellow Butterfly Bodycon Dress',
      price: '₦40,000',
      status: 'Delivered',
      expectedDelivery: null,
      deliveredOn: '12 January 2025',
      image: '/api/placeholder/60/80'
    },
    {
      id: '238695',
      name: 'Golden Yellow Butterfly Bodycon Dress',
      price: '₦40,000',
      status: 'Delivered',
      expectedDelivery: null,
      deliveredOn: '12 January 2025',
      image: '/api/placeholder/60/80'
    },
    {
      id: '238695',
      name: 'Golden Yellow Butterfly Bodycon Dress',
      price: '₦40,000',
      status: 'Delivered',
      expectedDelivery: null,
      deliveredOn: '12 January 2025',
      image: '/api/placeholder/60/80'
    },
    {
      id: '238695',
      name: 'Golden Yellow Butterfly Bodycon Dress',
      price: '₦40,000',
      status: 'Delivered',
      expectedDelivery: null,
      deliveredOn: '12 January 2025',
      image: '/api/placeholder/60/80'
    },
    {
      id: '238695',
      name: 'Golden Yellow Butterfly Bodycon Dress',
      price: '₦40,000',
      status: 'Delivered',
      expectedDelivery: null,
      deliveredOn: '12 January 2025',
      image: '/api/placeholder/60/80'
    },
    {
      id: '238695',
      name: 'Golden Yellow Butterfly Bodycon Dress',
      price: '₦40,000',
      status: 'Delivered',
      expectedDelivery: null,
      deliveredOn: '12 January 2025',
      image: '/api/placeholder/60/80'
    }
  ];

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
  const token = localStorage.getItem('token'); // or however you're storing it

  if (!token) return alert("Not authenticated");

  updateDelivery(
    { token, orderId },
    {
      onSuccess: (data) => {
        console.log('Delivery status updated', data);
        showSnachbar({
          message: 'Delivery status updated successfully',
          type: 'success',
        });
        router.push('/dashboard/orders/order-details/id')
        // Optionally, refetch or update state here
      },
      onError: (err) => {
        console.error('Failed to update:', err.message);
        showSnachbar({
          message: 'Failed to update delivery status',
          type: 'error',
        });
      },
    }
  );
};


  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'ongoing'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Ongoing/Delivered
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'cancelled'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Cancelled/Returned
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-12 gap-4 items-start">
              {/* Product Image */}
              <div className="w-16 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-50"></div>
                </div>
              </div>
              
              {/* Order Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 mb-2">{order.name}</h3>
                <p className="text-sm text-gray-600 mb-1">Order No: {order.id}</p>
                {order.expectedDelivery && (
                  <p className="text-sm text-gray-600 mb-2">
                    Expected Delivery: {order.expectedDelivery}
                  </p>
                )}
                {order.deliveredOn && (
                  <p className="text-sm text-gray-600 mb-2">
                    Delivered On: {order.deliveredOn}
                  </p>
                )}
                <p className="text-lg font-semibold text-gray-900">{order.price}</p>
              </div>
              
              {/* Status and Actions */}
              <div className="flex flex-col items-end gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(order.status)} ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleUpdateDelivery(order.id)}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default OrdersPage;