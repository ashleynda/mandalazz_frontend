import React from 'react';
import { ChevronLeft } from 'lucide-react';

const OrderDetailsPage = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white border-2 border-blue-400">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold">Order Details</h1>
      </div>

      {/* Product Section */}
      <div className="flex items-start gap-4 mb-6">
        {/* Product Image */}
        <div className="w-16 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="w-8 h-12 bg-gray-600 rounded-sm"></div>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-gray-900 text-sm">Golden Yellow Butterfly Bodycon Dress</h3>
            <span className="px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-600 ml-2">
              Delivered
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-1">
            Colour: <span className="font-medium">Black</span> Size: <span className="font-medium">12</span>
          </p>
          <p className="text-lg font-semibold text-gray-900">₦40,000</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium text-gray-900 mb-4 text-sm">Details</h3>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-gray-600 mb-1">Order Date</p>
            <p className="font-medium text-gray-900">12 January 2025</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Delivery Date</p>
            <p className="font-medium text-gray-900">12 January 2025</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Order Number</p>
            <p className="font-medium text-gray-900">238438308</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Payment Method</p>
            <p className="font-medium text-gray-900">Paystack Card</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Item Price</p>
            <p className="font-medium text-gray-900">₦40,000</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Delivery Fee</p>
            <p className="font-medium text-gray-900">₦4,000</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600 mb-1">Total</p>
            <p className="font-medium text-gray-900">₦44,000</p>
          </div>
        </div>
      </div>

      {/* Delivery Information Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-4 text-sm">Delivery Information</h3>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-gray-600 mb-1">Name</p>
            <p className="font-medium text-gray-900">Martins Osenosae</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Phone Number</p>
            <p className="font-medium text-gray-900">+234 8012344567</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-600 mb-1">Address</p>
            <p className="font-medium text-gray-900">24 Lemonade street, Ikoyi, Lagos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;