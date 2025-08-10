'use client';

import Image from 'next/image';
import React from 'react';
import logo from '../../assets/logo.png'
import { useRouter } from 'next/navigation';

const RegNavbar= () => {
  const router = useRouter();
  return (
    <div onClick={() => router.push('/products')} className="logo flex items-center justify-between p-4 md:px-20 bg-white fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      <Image src={logo} alt="logo" width={100} height={40} className="h-10 w-auto" />
    </div>
  );
};

export default RegNavbar;
