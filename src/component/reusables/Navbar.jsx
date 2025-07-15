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

const Navbar = ({ onSearch }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const pathname = usePathname();
  const isOnlyProductsPage = pathname === '/products';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Get cart methods and state
  const cartItemCount = useCartStore(state => state.getCartCount());
  const loadGuestCart = useCartStore(state => state.loadGuestCart);

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

  // Main initialization effect
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('authToken');
      setIsLoggedIn(!!token);

      // Load guest cart if not logged in
      if (!token) {
        loadGuestCart();
      }
    }
  }, [loadGuestCart]);

  // Listen for auth state changes
  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('authToken');
      setIsLoggedIn(!!token);

      // Load guest cart if not logged in
      if (!token) {
        loadGuestCart();
      }
    };

    checkAuth(); // Run once
    window.addEventListener('logout', checkAuth);
    window.addEventListener('storage', checkAuth); // Listen for storage changes

    return () => {
      window.removeEventListener('logout', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, [loadGuestCart]);

  // Search debounce effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        handleSearch(searchTerm.trim());
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (query) {
      try {
        const { data } = await refetch();
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
    if (isMobile) {
      return (
          <div className="relative cursor-pointer" onClick={() => router.push('/viewProductDetails/checkout/cart')}>
            <FiShoppingCart className="w-5 h-5 text-gray-700 hover:text-primary" />
            {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartItemCount}
            </span>
            )}
          </div>
      );
    }

    // Desktop version
    if (!isLoggedIn) {
      return (
          <div className="flex gap-2 cursor-pointer" onClick={() => router.push('/viewProductDetails/checkout/cart')}>
            <div className="relative">
              <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
              {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
              )}
            </div>
            <p className='text-sm font-normal text-[#191818]'>Cart</p>
          </div>
      );
    }

    // User is logged in
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
                <ProfileDropdown />
            )}
          </div>
        </div>
      </>
  );
};

export default Navbar;