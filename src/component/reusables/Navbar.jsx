'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiShoppingCart, FiBell } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png'; // Adjust the path as necessary
import { Button, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from 'react';
import CategoriesMobile from '../../component/reusables/CategoriesMobile';
import { useCartStore } from '../../lib/store/useCart'; 



// interface NavbarProps {
//   onSearch: (searchTerm: string) => void;
// }

const Navbar = ({ onSearch }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const pathname = usePathname();
  const isOnlyProductsPage = pathname === '/products';
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const cartItemCount = useCartStore(state => state.getCartItemCount());

  useEffect(() => {
  const token = localStorage.getItem('authToken');
  const isUserLoggedIn = !!token;
  setIsLoggedIn(isUserLoggedIn);

  const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Sync localStorage cart with Zustand store for guests
  if (!isUserLoggedIn && localCartItems.length > 0) {
    useCartStore.getState().setCartItems(localCartItems);
  }

  if (isUserLoggedIn) {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/notifications/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await response.json();
        const unreadCount = result.filter((notif) => !notif.read).length;
        setNotificationCount(unreadCount);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }
}, []);





  useEffect(() => {
    // Example check for auth token (customize for your project)
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    // Example: fetch cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartCount(cartItems.length);

    // Simulate notification API call
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/notifications/all", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await response.json();
        const unreadCount = result.filter((notif) => !notif.read).length;
        setNotificationCount(unreadCount);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    if (token) {
      fetchNotifications();
    }
  }, []);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     const myHeaders = new Headers();
  //     myHeaders.append("Authorization", "Bearer YOUR_TOKEN_HERE");

  //     const requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow"
  //     };

  //     try {
  //       const response = await fetch("http://localhost:3030/api/notifications/all", requestOptions);
  //       const result = await response.json();
  //       setNotifications(result);
  //       setNotificationCount(result.filter((notif) => !notif.read).length); // Count unread notifications
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };

  //   fetchNotifications();
  // }, []);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:3030/api/product/search?query=${query}`, {
        method: "GET",
        redirect: "follow"
      });
      const result = await response.json(); // <-- assuming your API returns JSON
      console.log(result);

      onSearch(query); // <-- you can call the parent function too if you want
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const renderCartIcon = () => {
    // User is not logged in & cart is empty
    if (!isLoggedIn ) {
      return (
        <div className="flex gap-2 cursor-pointer" onClick={() => router.push('/products/checkout/cart')}>
          <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
          <p className='text-sm font-normal text-[#191818]'>Cart</p>
        </div>
      );
    }

    // User is logged in OR has items in cart
    return (
      <div className="relative cursor-pointer" onClick={() => router.push('/products/checkout/cart')}>
        <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
        
      </div>
    );
  };

  //   const logout = () => {
  //   localStorage.removeItem('authToken');
  //   useCartStore.getState().clearCart(); // clear Zustand cart
  //   router.push('/login');
  // };

  return (

    // <div className="logo flex items-center justify-between p-4 px-20 bg-white divide-x divide-[#e5e7eb] fixed top-0 left-0 w-full z-50">
    <>
      <div className={`logo flex items-center justify-between ${isMobile ? 'p-2 px-8' : 'p-4 px-20'} bg-white divide-x divide-[#e5e7eb] fixed top-0 left-0 w-full z-50`}>
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={isMobile ? 80 : 100}
            height={isMobile ? 32 : 40}
            className="h-10 w-auto border-t-2 border-b-1 border-gray-200 z-10"
          />
         
        </div>

        {/* <Searchbar onSearch={onSearch} /> */}
        {!isMobile && (
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            // sx={{ width: '500px' }}
            sx={{ width: { xs: '100%', sm: '300px', md: '400px' } }}

            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}


        <div className="flex items-center gap-6">
          {/* Shopping cart icon with notification badge */}
          {/* <div className="relative cursor-pointer" onClick={() => router.push('/products/checkout/cart')}>
          <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </div> */}
          {/* <div className="flex gap-2 cursor-pointer" onClick={() => router.push('/products/checkout/cart')}>
          <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
         <p className='text-sm font-normal text-[#191818]'>Cart</p>
        </div> */}
          {renderCartIcon()}
           {isMobile && (
            <div className="ml-2 bg-none">
              <CategoriesMobile isMobile={isMobile} />
            </div>
          )}

          {isOnlyProductsPage && !isMobile && (
            <div className='flex gap-4'>

              <Button
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  color: '#26735B',
                  borderColor: '#26735B',
                  borderRadius: '8px',
                  padding: '8px 40px',
                  fontWeight: '700',
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderColor: 'black',
                  }
                }}
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button>

              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#26735B',
                  color: 'white',
                  borderRadius: '8px',
                  padding: '8px 40px',
                  fontWeight: '700',
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: '#333',
                  }
                }}
                onClick={() => router.push('/login')}
              >
                Log In
              </Button>
            </div>
            // ) : (
          )}
          {/* Notification icon */}
          {!isMobile && !isOnlyProductsPage && (
            <>

              <div className="relative cursor-pointer" onClick={() => router.push('/notifications')}>
                <FiBell className="w-6 h-6 text-gray-700 hover:text-primary" />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </div>

              {/* User icon */}
              <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push('/profile')}>
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              </div>
            </>
          )}
        </div>
      </div>
      {/* <div className='mt-16'>
        <Categories />
      </div> */}
    </>
  );
};

export default Navbar;
