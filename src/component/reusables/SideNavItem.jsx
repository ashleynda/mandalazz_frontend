'use client';

import React from 'react';
// import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SideNavItem({ menuItems = [] }) {
  const pathname = usePathname();

  return (
    <>
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.route;

          return (
            <li key={item.name}>
              <Link
                href={item.route}
                className={`w-full flex items-center gap-3 px-3 py-2 transition-colors ${
                  isActive
                    ? 'text-[#26735B] font-semibold text-sm bg-[#E0F5EF4D] border-r-4 border-[#26735B] w-full px-2'
                    : 'text-[#26735B] hover:bg-[#E0F5EF4D] hover:text-[#26735B] text-sm'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-[#26735B]' : 'text-[#3E3C3C]'} />
                <span className={`capitalize text-sm font-semibold ${isActive ? 'text-[#26735B]' : 'text-[#3E3C3C]'}`}>{item.name}</span>
                {/* {isActive && <div className="absolute right-0 top-0 h-full w-6 bg-emerald-600" />} */}
            </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
