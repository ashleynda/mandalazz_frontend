'use client'

import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import SideNavItem from './SideNavItem';
// import { sidebarItems } from '../reusables/Sidenav'; 

import { User, BookOpen, ShoppingBag, FileText, Heart, Settings } from "lucide-react";

export const sidebarItems = [
  { name: "Account", icon: User, route: "/dashboard/accountDetails" },
  { name: "Address Book", icon: BookOpen, route: "/dashboard/address-book" },
  { name: "My Orders", icon: ShoppingBag, route: "/dashboard/orders" },
  { name: "Reviews", icon: FileText, route: "/dashboard/reviews" },
  { name: "Favourites", icon: Heart, route: "/dashboard/favourites" },
  { name: "Settings", icon: Settings, route: "/dashboard/settings" },
];
const SideBar = ({ menuItems }) => {
  return (
    <div className="w-64 bg-white text-[#3E3C3C] flex flex-col h-[300px] right-50 ml-20 mt-20">
      {/* Logo/Brand */}
      {/* <div className="p-6 border-b border-emerald-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-emerald-900 font-bold text-sm">E</span>
          </div>
          <span className="font-semibold">Everything Marketplace</span>
        </div>
      </div> */}

      <nav className="flex-1 p-2 h-[60px] ">
        <SideNavItem menuItems={sidebarItems} />
      </nav>

      {/* <div className="p-4">
        <Link 
          to="/logout" 
          className="w-full flex items-center gap-3 px-3 py-2 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer hover:bg-white hover:text-[#26735B]"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </Link>
      </div> */}
    </div>
  );
};

export default SideBar;
