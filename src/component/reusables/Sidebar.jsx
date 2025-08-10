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
    <div className="w-64 bg-white text-[#3E3C3C] flex flex-col h-[300px] right-50 ml-20 mt-14">
      <nav className="flex-1 p-2 h-[60px] ">
        <SideNavItem menuItems={sidebarItems} />
      </nav>
    </div>
  );
};

export default SideBar;
