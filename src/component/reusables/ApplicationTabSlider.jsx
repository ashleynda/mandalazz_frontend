import { useState } from "react";
import Specifications from "../product/Specifications";
import Reviews from "../product/Reviews";
import ProductDetails from "../product/ProductDetails";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 ">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "details" ? "border-b-2 border-[#319B79] text-primary text-[#191818]" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Product Details
        </button>
     
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "reviews" ? "border-b-2 border-[#319B79] text-primary text-[#191818]" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Content */}
      <div className="mt-4 text-sm text-gray-700">
        {activeTab === "details" && <ProductDetails />}
        {activeTab === "reviews" && <Reviews />}
      </div>
    </div>
  );
}
