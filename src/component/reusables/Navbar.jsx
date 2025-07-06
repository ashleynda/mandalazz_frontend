'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiShoppingCart, FiBell } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/EM.png'; // Adjust the path as necessary
import { Button, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from 'react';
import CategoriesMobile from '../../component/reusables/CategoriesMobile';
import { useCartStore } from '../../lib/store/useCart';
import UploadAvatars from '../../component/profile';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ProfileDropdown, { AccountDropdownMenu } from '../../component/reusables/AccountDropDownMenu';
import useProductSearch from '../../lib/hooks/useSearchMutation'; // Adjust path if needed


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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { data, isLoading, error, refetch } = useProductSearch(searchTerm, false);
  const [results, setResults] = useState([]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //   useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   const isUserLoggedIn = !!token;
  //   setIsLoggedIn(isUserLoggedIn);

  //   const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  //   // Sync localStorage cart with Zustand store for guests
  //   if (!isUserLoggedIn && localCartItems.length > 0) {
  //     useCartStore.getState().setCartItems(localCartItems);
  //   }

  //   if (isUserLoggedIn) {
  //     const fetchNotifications = async () => {
  //       try {
  //         const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/notifications/all", {
  //           headers: { Authorization: `Bearer ${token}` }
  //         });
  //         const result = await response.json();
  //         const unreadCount = result.filter((notif) => !notif.read).length;
  //         setNotificationCount(unreadCount);
  //       } catch (err) {
  //         console.error("Error fetching notifications:", err);
  //       }
  //     };

  //     fetchNotifications();
  //   }
  // }, []);





  // useEffect(() => {
  //   // Example check for auth token (customize for your project)
  //   const token = sessionStorage.getItem('authToken');
  //   setIsLoggedIn(!!token);
  //   console.log("Is user logged in:", token);

  //   // Example: fetch cart items from localStorage
  //   const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  //   setCartCount(cartItems.length);

  //   // Simulate notification API call
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3030/api/notifications/all", {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       const result = await response.json();
  //       const unreadCount = result.filter((notif) => !notif.read).length;
  //       setNotificationCount(unreadCount);
  //     } catch (err) {
  //       console.error("Error fetching notifications:", err);
  //     }
  //   };

  //   if (token) {
  //     fetchNotifications();
  //   }
  // }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('authToken');
      setIsLoggedIn(!!token);

      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartCount(cartItems.length);

      // const fetchNotifications = async () => {
      //   try {
      //     const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/notifications/all", {
      //       headers: { Authorization: `Bearer ${token}` }
      //     });
      //     const result = await response.json();
      //     const unreadCount = result.filter((notif) => !notif.read).length;
      //     setNotificationCount(unreadCount);
      //   } catch (err) {
      //     console.error("Error fetching notifications:", err);
      //   }
      // };

      // if (token) {
      //   fetchNotifications();
      // }
    }
  }, []);


  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    checkAuth(); // Run once
    window.addEventListener('logout', checkAuth);

    return () => {
      window.removeEventListener('logout', checkAuth);
    };
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch(searchTerm.trim());
      } else {
        setResults([]);
      }
    }, 400); // adjust the delay as needed

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);



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
    setSearchTerm(query);
    if (query) {
      try {
        const { data } = await refetch();
        // setResults(data);
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching search results", error);
        setResults([]);
      }
    } else {
      setResults([]);

    }
  };


  const renderCartIcon = () => {
    // User is not logged in & cart is empty
    if (!isLoggedIn) {
      return (
        <div className="flex gap-2 cursor-pointer" onClick={() => router.push('/viewProductDetails/checkout/cart')}>
          <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
          <p className='text-sm font-normal text-[#191818]'>Cart</p>
        </div>
      );
    }

    // User is logged in OR has items in cart
    return (
      <div className="relative cursor-pointer" onClick={() => router.push('/viewProductDetails/checkout/cart')}>
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
  if (isMobile) {
    return (
      <div className="bg-white fixed top-0 left-0 w-[100%] z-[9999] overflow-x-hidden">
        <div className="flex items-center justify-between px-4 h-[60px] min-w-0 w-full">
          {/* Left: Hamburger Menu and Logo */}
          <div className="flex items-center gap-1 flex-shrink-0 min-w-0">
            <div className='flex-shrink-0 '>
              <CategoriesMobile isMobile={isMobile} />
            </div>
            <div className='flex-shrink-0 '>
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={40}
                className="h-8 w-auto cursor-pointer "
                onClick={() => router.push('/products')}
              />
            </div>
          </div>

          {/* Right: Cart and Profile Icons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {renderCartIcon()}
            {/* <div className="relative cursor-pointer" onClick={() => router.push('/viewProductDetails/checkout/cart')}>
              <FiShoppingCart className="w-5 h-5 text-gray-700 hover:text-primary" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div> */}

            {isLoggedIn ? (
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <FaUserCircle className="w-6 h-6 text-gray-400" />
              </div>
            ) : (
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <FaUserCircle className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        <div className="px-3 pb-3 w-full">
          <div className='w-full max-w-full'>
            <TextField
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: '100%',
                maxWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '36px',
                  fontSize: '14px'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '18px' }} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {!isLoading && searchTerm && (
            results.length === 0 ? (
              <div className="text-center mt-4 text-gray-500 font-medium">
                No products found for "{searchTerm}"
              </div>
            ) : (
              <div>
                {results.map(product => (
                  <div key={product.id}>{product.name}</div>
                ))}
              </div>
            )
          )}


        </div>
      </div>
    );
  }
  return (
    <>
      <div className={`logo flex items-center justify-between ${isMobile ? 'p-2 px-8' : 'p-4 px-20'} bg-white divide-x divide-[#e5e7eb] fixed top-0 left-0 w-full z-1000 h-[60px]`}>
        {/* {isMobile && (
            <div className="ml-2 bg-none">
              <CategoriesMobile isMobile={isMobile} />
            </div>
          )} */}
        <div className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={isMobile ? 80 : 100}
            height={isMobile ? 32 : 40}
            className="h-10 w-auto border-t-2 border-b-1 border-gray-200 z-10"
            onClick={() => router.push('/products')}
          />
        </div>
        <div className="relative w-full max-w-[400px]">

          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // sx={{ width: '500px' }}
            sx={{ width: { xs: '100%', sm: '300px', md: '400px' } }}

            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {!isLoading && searchTerm && (
            <div className="absolute mt-1 w-full bg-white border border-gray-200 shadow-lg rounded-md max-h-[300px] overflow-y-auto z-[10000]">
              {results.length === 0 ? (
                <div className="p-3 text-sm text-gray-500 text-center">
                  No products found for "{searchTerm}"
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    {product.name}
                  </div>
                ))
              )}
            </div>
          )}
        </div>


        <div className="flex items-center gap-6">

          {renderCartIcon()}


          {/* </div> */}
          {!isLoggedIn && (
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
          )}
          {isLoggedIn && (
            // <div className="cursor-pointer hover:opacity-80 transition-opacity flex  items-center gap-2 border border-[#e5e7eb] rounded-md px-2 py-1"
            // //  onClick={() => router.push('/profile')}
            //  >
            //   {/* <FaUserCircle className="w-10 h-10 text-gray-400" /> */}
            //   <UploadAvatars />
            //   <p className='text-sm font-normal text-[#191818] '>My Account</p>
            //   <ArrowDropDownIcon style={{ color: '#191818' }} />
            // </div>
            // <AccountDropdownMenu />
            <ProfileDropdown />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;



