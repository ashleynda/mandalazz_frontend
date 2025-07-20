'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiShoppingCart, FiBell, FiMenu } from 'react-icons/fi';
import logo from '../../assets/EM.png';
import { Button, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from 'react';
import { useCartStore } from '../../lib/store/useCart';
import ProfileDropdown from '../../component/reusables/AccountDropDownMenu';
import useProductSearch from '../../lib/hooks/useSearchMutation';
import MobileAccountPage from '../../component/reusables/CategoriesMobile';
import NavbarSkeleton from '../skeletons/NavbarSkeleton';
import SearchResultsSkeleton from '../skeletons/SearchResultsSkeleton';
import SearchDropdown from '../../component/reusables/SearchDropdown';

const Navbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const pathname = usePathname();
  const isOnlyProductsPage = pathname === '/products';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = useCartStore(state => state.getCartCount());
  const loadGuestCart = useCartStore(state => state.loadGuestCart);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { data, isLoading, error, refetch } = useProductSearch(searchTerm, false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <NavbarSkeleton />;
  }

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest('.search-container')) {
      setResults([]);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, []);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('authToken');
      setIsLoggedIn(!!token);

      if (!token) {
        loadGuestCart();
      }
    }
  }, [loadGuestCart]);

  useEffect(() => {
    const checkAuth = () => {
      const token = sessionStorage.getItem('authToken');
      setIsLoggedIn(!!token);

      if (!token) {
        loadGuestCart();
      }
    };

    checkAuth();
    window.addEventListener('logout', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('logout', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, [loadGuestCart]);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (query) {
      try {
        // const { data } = await refetch();
        const response = await refetch();
        const fetchedProducts = response?.data?.data?.products;
        // setResults(data);
        // setResults(Array.isArray(data) ? data : []);
        console.log("Search reasults:", fetchedProducts);
        setResults(Array.isArray(fetchedProducts) ? fetchedProducts : []);
      } catch (error) {
        console.error("Error fetching search results", error);
        setResults([]);
      }
    } else {
      setResults([]);

    }
  };

  const handleOptions = (productId, color, size) => {
    const queryParams = new URLSearchParams();
    if (color) queryParams.append('color', color.toLowerCase());
    if (size) queryParams.append('size', size);

    const href = `/viewProductDetails/${productId}?${queryParams.toString()}`;
    console.log('Navigating to:', href);
    router.push(href);
  };

  const getFirstAvailableSize = (product) => {
    if (!product.variations || product.variations.length === 0) return null;

    const firstVariation = product.variations[0];
    if (!firstVariation.sizes || firstVariation.sizes.length === 0) return null;

    // Find first size with stock > 0
    const availableSize = firstVariation.sizes.find(size => size.stock > 0);
    return availableSize ? availableSize.size : firstVariation.sizes[0].size;
  };

  // Helper function to get first available color
  const getFirstAvailableColor = (product) => {
    if (!product.variations || product.variations.length === 0) return null;
    return product.variations[0].color;
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
      <>
        <div className="bg-white fixed top-0 left-0 w-[100%] z-[9999] overflow-x-hidden">
          <div className="flex items-center justify-between px-4 h-[60px] min-w-0 w-full">
            <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
              <div className='flex-shrink-0 cursor-pointer' onClick={handleMobileMenuToggle}>
                <FiMenu className="w-6 h-6 text-gray-700 hover:text-primary" />
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

            <div className="flex items-center gap-3 flex-shrink-0">
              {renderCartIcon()}

              {/* {isLoggedIn ? (
                <div className="cursor-pointer hover:opacity-80 transition-opacity">
                  <FaUserCircle className="w-6 h-6 text-gray-400" />
                </div>
              ) : (
                <div className="cursor-pointer hover:opacity-80 transition-opacity">
                  <FaUserCircle className="w-6 h-6 text-gray-400" />
                </div>
              )} */}
            </div>
          </div>
          <div className="px-3 pb-3 w-full">
            <div className='relative w-full max-w-[400px] search-container'>
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
                  },
                    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // default border color
      },
      '&:hover fieldset': {
        borderColor: '#26735B', // border color on hover (greenish tone)
      },
      '&.Mui-focused fieldset': {
        borderColor: '#26735B', // border color on focus
        borderWidth: '2px', // optional: make the border thicker when focused
      },
    },
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
   <SearchDropdown
  searchTerm={searchTerm}
  isLoading={isLoading}
  results={results}
  getFirstAvailableColor={getFirstAvailableColor}
  getFirstAvailableSize={getFirstAvailableSize}
  handleOptions={handleOptions}
  setSearchTerm={setSearchTerm}
  setResults={setResults}
  variant="mobile"
/>


          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[10000] bg-white" style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}>
            <div className="mobile-menu-container fixed left-0 top-0 h-full w-full bg-white transform transition-transform duration-300 ease-in-out" style={{ width: '100vw', height: '100vh' }}>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between" style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}>
                <button
                  onClick={handleMobileMenuToggle}
                  className="p-2 rounded-lg hover:bg-gray-100 text-[#343330]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="relative cursor-pointer" onClick={() => router.push('/viewProductDetails/checkout/cart')}>
                  <FiShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </div>
              <div className="overflow-y-auto h-full" style={{ paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
                <MobileAccountPage onClose={handleMobileMenuToggle} />
              </div>
            </div>
          </div>
        )}
      </>
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
        <div className="relative w-full max-w-[400px] search-container">
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', sm: '300px', md: '500px' }, borderRadius: '6px',
                '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // default border color
      },
      '&:hover fieldset': {
        borderColor: '#26735B', // border color on hover (greenish tone)
      },
      '&.Mui-focused fieldset': {
        borderColor: '#26735B', // border color on focus
        borderWidth: '2px', // optional: make the border thicker when focused
      },
    }, }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <SearchDropdown
            searchTerm={searchTerm}
            isLoading={isLoading}
            results={results}
            getFirstAvailableColor={getFirstAvailableColor}
            getFirstAvailableSize={getFirstAvailableSize}
            handleOptions={handleOptions}
            setSearchTerm={setSearchTerm}
            setResults={setResults}
            variant="desktop"
          />

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