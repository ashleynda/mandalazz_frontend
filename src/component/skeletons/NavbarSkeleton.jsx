'use client';

import React from 'react';
import { Skeleton } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';

const NavbarSkeleton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <div className="bg-white fixed top-0 left-0 w-full z-[9999]">
        {/* Top Navbar Skeleton */}
        <div className="flex items-center justify-between px-4 h-[60px]">
          {/* Left Section (Menu + Logo) */}
          <div className="flex items-center gap-3">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="rectangular" width={80} height={32} />
          </div>

          {/* Cart Icon */}
          <Skeleton variant="circular" width={32} height={32} />
        </div>

        {/* Search Bar Skeleton */}
        <div className="px-3 pb-3 w-full">
          <Skeleton variant="rectangular" height={36} sx={{ borderRadius: 1 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 px-20 bg-white fixed top-0 left-0 w-full z-[1000] h-[60px]">
      {/* Logo */}
      <Skeleton variant="rectangular" width={100} height={40} />

      {/* Search Box */}
      <Skeleton variant="rectangular" width={400} height={40} sx={{ borderRadius: 1 }} />

      {/* Right Section (Cart + Auth Buttons) */}
      <div className="flex items-center gap-6">
        <Skeleton variant="circular" width={36} height={36} />
        <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 2 }} />
      </div>
    </div>
  );
};

export default NavbarSkeleton;
