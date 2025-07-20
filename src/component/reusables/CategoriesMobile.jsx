"use client";

import React from 'react';
import {
  User,
  MapPin,
  ShoppingBag,
  MessageSquare,
  Heart,
  Settings,
  ChevronRight,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserProfile } from "../../lib/hooks/account/useAccountDetails";
import { Skeleton } from '@mui/material';
import useProductsQuery from '@/src/lib/hooks/favourites/useProductMutation';



export default function MobileAccountPage({ onClose }) {
  const router = useRouter();
  const { data, isLoading, error } = useUserProfile();
  const user = data?.message?.user;
  const [openCategories, setOpenCategories] = React.useState({
    foreign: false,
    local: false,
    accessories: false,
  });

  const [isNavigating, setIsNavigating] = React.useState(false);

  const { data: allProductsData, isLoading: loadingProducts } = useProductsQuery();
  const productsList = allProductsData?.data?.products || [];

  const foreignBrands = Array.from(
    new Set(productsList.filter((p) => p.brandType === "foreign").map((p) => p.brand))
  ).map((brand, index) => ({ id: index, name: brand }));

  const localBrands = Array.from(
    new Set(productsList.filter((p) => p.brandType === "local").map((p) => p.brand))
  ).map((brand, index) => ({ id: index, name: brand }));

  const accountOptions = [
    { icon: User, label: 'Account', route: "/dashboard/accountDetails" },
    { icon: MapPin, label: 'Delivery Addresses', route: "/dashboard/address-book" },
    { icon: ShoppingBag, label: 'My Orders', route: "/dashboard/orders" },
    { icon: MessageSquare, label: 'Reviews', route: "/dashboard/reviews" },
    { icon: Heart, label: 'Favourites', route: "/dashboard/favourites" },
    { icon: Settings, label: 'Settings', route: "/dashboard/settings" }
  ];

  const categories = [
    { label: 'Foreign Brands', hasArrow: true },
    { label: 'Local Brands', hasArrow: true },
    { label: 'Men', hasArrow: false },
    { label: 'Women', hasArrow: false },
    { label: 'Unisex', hasArrow: false },
    { label: 'Accessories', hasArrow: true }
  ];



  const handleNavigation = (route) => {
    console.log("Navigating to:", route);
    if (typeof onClose === "function") onClose();
    router.push(route);
  };


  const handleCategoryToggle = (categoryKey) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }));
  };

  const handleCategoryClick = (value, type = "category") => {
    const param = type === "brand" ? "brand" : "category";
    setIsNavigating(true);
    if (typeof onClose === "function") onClose();
    router.push(`/viewProductByCategory?${param}=${encodeURIComponent(value)}`);
  };

  const toggleCategory = (key) => {
    setOpenCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

   if (isNavigating) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="rectangular" width="100%" height={50} />
        <Skeleton variant="rectangular" width="100%" height={50} />
        <Skeleton variant="rectangular" width="100%" height={50} />
      </div>
    );
  }



  return (
    <div className="bg-white min-h-screen w-full pb-38">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        {isLoading ? (
          <div className="flex items-center space-x-3">
            <Skeleton variant="circular" width={40} height={40} /> {/* Profile Image */}
            <div className="flex flex-col space-y-1">
              <Skeleton variant="text" width={100} height={20} /> {/* First & Last Name */}
              <Skeleton variant="text" width={150} height={16} /> {/* Email */}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{user?.firstName} {user?.lastName}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* My Account Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Account</h3>

        <div className="grid grid-cols-2 gap-4">
          {accountOptions.map((option, index) => (
            <Link
              key={index}
              href={option.route}
              onClick={onClose}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <option.icon className="w-6 h-6 text-gray-600 mb-2" />
              <span className="text-sm text-gray-900 text-center">{option.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>

        {loadingProducts ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton variant="text" width={100} height={20} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {/* {categories.map((category, index) => ( */}
            <button
              onClick={() => toggleCategory("foreign")}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900">Foreign Brands</span>
              {openCategories.foreign ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openCategories.foreign && (
              <div className="pl-4 space-y-2">
                {foreignBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleCategoryClick(brand.name, "brand")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 text-sm text-gray-700"
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => toggleCategory("local")}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-gray-900">Local Brands</span>
              {openCategories.local ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openCategories.local && (
              <div className="pl-4 space-y-2">
                {localBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleCategoryClick(brand.name, "brand")}
                    className="block w-full text-left p-2 rounded hover:bg-gray-100 text-sm text-gray-700"
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            )}
            {["men", "women", "unisex", "accessories"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 capitalize">{cat}</span>
                {cat === "accessories" && <ChevronRight className="w-5 h-5 text-gray-400" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Log Out Button */}
      {/* <div className="p-4 pt-8">
        <button className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg border border-green-300 text-green-600 hover:bg-green-50 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div> */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t sm:hidden">
        <button
          className="w-full bg-[#26735B] flex items-center justify-center gap-2 hover:bg-emerald-700 text-white font-bold text-base px-8 py-3 rounded-lg cursor-pointer transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </div>
  );
}