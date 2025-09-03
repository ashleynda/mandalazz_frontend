"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import useSnackbarStore from "@/src/lib/store/useSnackbarStore";
import { useFetchMyOrders } from "../../lib/hooks/account/useGetorder";
import { formatDate } from "@/src/lib/utils";

const OrderDetailsPage = () => {
  const [token, setToken] = useState(null);
  const { showSnackbar } = useSnackbarStore();
  const router = useRouter();
  const { id } = useParams(); // Get the order ID from URL

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const { data, error, isPending } = useFetchMyOrders(token);
  const orders = data?.message?.checkouts || [];

  // Find the order by ID
  const order = orders.find((o) => o._id === id);

  const getStatusColor = (status) => {
    switch (status) {
      case "under_process":
        return "text-orange-500";
      case "Delivered":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "under_process":
        return "bg-orange-50";
      case "Delivered":
        return "bg-green-50";
      case "Cancelled":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  const getAmount = (totalAmount) => {
    if (!totalAmount) return 0;
    if (typeof totalAmount === "number") return totalAmount;
    if (typeof totalAmount === "object" && totalAmount.$numberDecimal) {
      return Number(totalAmount.$numberDecimal);
    }
    return 0;
  };

  // Loading or Error states
  if (isPending) {
    return <div className="p-4">Loading Order Details...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading order details. Please try again.
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4 text-gray-600">
        Order not found. It may have been removed.
      </div>
    );
  }

  return (
    <div className="max-w-screen mt-8 rounded-lg p-4 bg-white border-2 border-[#F2F4F7]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-bold text-[#3E3C3C]">Order Details</h1>
      </div>

      {/* Product Section */}
      {order.products.map((item, index) => (
        <div className="flex items-start gap-4 mb-6" key={index}>
          {/* Product Image */}
          <div className="w-16 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
            <img
              src={
                item.product?.variations?.[0]?.images?.[0] ||
                "https://via.placeholder.com/150"
              }
              alt={item.product?.name || "Product"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-normal text-[#061410] text-sm">
                {item.product?.name || "Unknown Product"}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getStatusBg(
                  order.deliveryStatus
                )} ${getStatusColor(order.deliveryStatus)}`}
              >
                {order.deliveryStatus}
              </span>
            </div>
            <p className="text-[13px] font-normal text-[#667085] mb-1">
              Colour: <span className="font-medium">{item.color}</span> Size:{" "}
              <span className="font-normal text-[#061410] text-sm">{item.size}</span>
            </p>
            <p className="text-base font-bold text-[#000000]">
              ₦{item.product?.price?.$numberDecimal || 0}
            </p>
          </div>
        </div>
      ))}

      {/* Details Section */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-[#000000] mb-4 text-sm">Details</h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-[#667085] text-[13px] font-normal mb-1">Order Date</p>
            <p className="font-semibold text-[13px] text-[#061410]">
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-[#667085] text-[13px] font-normal mb-1">Delivery Date</p>
            <p className="font-semibold text-[13px] text-[#061410]">
              {order.estimatedDeliveryDate
                ? formatDate(order.estimatedDeliveryDate)
                : "Pending"}
            </p>
          </div>
          <div>
            <p className="text-[#667085] text-[13px] font-normal mb-1">Order Number</p>
            <p className="font-semibold text-[13px] text-[#061410]">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-[#667085] text-[13px] font-normal mb-1">Payment Method</p>
            <p className="font-semibold text-[13px] text-[#061410]">{order.paymentType}</p>
          </div>
          <div>
            <p className="text-[#667085] text-[13px] font-normal mb-1">Item Price</p>
            <p className="font-semibold text-[13px] text-[#061410]">
              ₦{order.totalAmount?.$numberDecimal.toLocaleString() || '0'}
              {/* ₦{getAmount(order.totalAmount).toLocaleString()} */}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-[#667085] text-[13px] font-normal mb-1">Total</p>
            <p className="font-semibold text-[13px] text-[#061410]">
              ₦{order.totalAmount?.$numberDecimal.toLocaleString() || '0'}
              {/* ₦{getAmount(order.totalAmount).toLocaleString()} */}
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Information Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold text-[#000000] mb-4 text-sm">
          Delivery Information
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-[#667085] text-[13px] font-normal mb-1">Name</p>
            <p className="font-semibold text-[13px] text-[#061410]">
              {order.userDetails.firstName} {order.userDetails.lastName}
            </p>
          </div>
          <div>
            <p className="text-[#667085] text-[13px] font-normal mb-1">Phone Number</p>
            <p className="font-semibold text-[13px] text-[#061410]">
              {order.userDetails.phoneNumber}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-[#667085] text-[13px] font-normal mb-1">Address</p>
            <p className="font-semibold text-[13px] text-[#061410]">
              {order.userDetails.address}, {order.userDetails.city},{" "}
              {order.userDetails.state}, {order.userDetails.country.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
