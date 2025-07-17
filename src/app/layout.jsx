'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import './globals.css';
import { Figtree } from 'next/font/google';
import Navbar from '../component/reusables/Navbar';
import Categories from '../component/reusables/Categories';
import HeroSection from '../component/reusables/Hero';
import Footer from '../component/reusables/Footer';
import { usePathname } from 'next/navigation';
import GlobalSnackbar from '../lib/store/Snackbar/reducer';
import { useMediaQuery, useTheme } from '@mui/material';

const figtree = Figtree({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    fallback: ['Arial', 'sans-serif'],
});

export default function RootLayout({ children }) {
    const [queryClient] = useState(() => new QueryClient());
    const pathname = usePathname();
    const isDetailPage = pathname.startsWith('/viewProductDetails');
    const isDashboardPage = pathname.startsWith('/dashboard');
    const isViewProductByCategoryPage = pathname.startsWith('/viewProductByCategory');
    const isProductPage = pathname.startsWith('/products');
    const isAuthPage =
        pathname.startsWith('/signup') ||
        pathname.startsWith('/login') ||
        pathname.startsWith('/checkEmail') ||
        pathname.startsWith('/forgotPassword') ||
        pathname.startsWith('/resetPassword') ||
        pathname.startsWith('/verify') ||
        pathname.startsWith('/validation') ||
        pathname.startsWith('/newPassword');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // return (
    //   <html lang="en" className={figtree.className}>
    //     <body>
    //       <QueryClientProvider client={queryClient}>
    //         <Navbar />
    //         <div className='pt-18'>
    //         <Categories />
    //         {!isDetailPage && <HeroSection />}
    //         {children}
    //         {!isDetailPage && <Footer />}
    //         </div>
    //       </QueryClientProvider>
    //     </body>
    //   </html>
    // );
    return (
        <html lang="en" className={figtree.className}>
        <body>
        <QueryClientProvider client={queryClient}>
            {!isAuthPage ? (
                <>
                    <Navbar />
                    <div className="pt-18">
                        <Categories />
                        {!isDetailPage && !isDashboardPage && !isViewProductByCategoryPage && <HeroSection />}
                        {children}
                        <GlobalSnackbar />
                        {!isDetailPage && !isDashboardPage && <Footer />}
                    </div>
                </>
            ) : (
                // If auth page, render only children
                children
            )}
        </QueryClientProvider>
        </body>
        </html>
    );
}