"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import yellowWoman from '../../assets/yellowWoman.png';
import { FaHeart } from 'react-icons/fa';
import SpecsAndReviews from './SpecsAndReviews';
import { FiShoppingCart } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { useCartStore } from '@/src/lib/store/useCart';
import { Rating } from '@mui/material';
import useProductsQuery from '@/src/lib/hooks/favourites/useProductMutation';
import useAddToCartMutation from "../../lib/hooks/cart/useAddToCartMutation";
import useUpdateCartMutation from "../../lib/hooks/cart/useUpdateToCartMutation";
import useFetchCartQuery from "../../lib/hooks/cart/useFetchCartMutation";
import useFavoritesQuery from '@/src/lib/hooks/useFavouritesQuery';
import useSnackbarStore from '@/src/lib/store/useSnackbarStore';
import ProductTabs from '../reusables/ApplicationTabSlider';
import RecentlyViewed from '../../component/recentlyViewed';

const ViewProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [breadcrumbs] = useState([
    { label: 'Home', path: '/' },
    { label: 'Category', path: '/category' },
    { label: 'Product', path: '/category/product' }
  ]);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [ratingValue, setRatingValue] = useState(3.5);

  const { addToCart, findCartItem } = useCartStore();
  const { data, isLoading } = useProductsQuery();
  const { mutate: addToCartMutation, isPending: isAddingToCart } = useAddToCartMutation();
  const { mutate: updateCartMutation, isPending: isUpdatingCart } = useUpdateCartMutation();
  const { data: cartData, refetch: refetchCart } = useFetchCartQuery();
  const products = data?.data?.products ?? [];


  const product = products.find(p => p._id === id);
  const [token, setToken] = useState('');
  const { showSnackbar } = useSnackbarStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get current images based on selected variation
  const getCurrentImages = () => {
    if (!product?.variations) return [yellowWoman.src];

    if (selectedVariation) {
      const images = selectedVariation.images || [];
      const validImages = images.filter(img => img && typeof img === 'string' && img.trim() !== '');
      return validImages.length > 0 ? validImages : [yellowWoman.src];
    }

    const firstVariationImages = product.variations[0]?.images || [];
    const validImages = firstVariationImages.filter(img => img && typeof img === 'string' && img.trim() !== '');
    return validImages.length > 0 ? validImages : [yellowWoman.src];
  };

  // Get available sizes for selected color
  const getAvailableSizes = () => {
    if (!selectedVariation) return [];
    return selectedVariation.sizes || [];
  };

  // Get unique sizes
  const getUniqueSizes = (sizes) => {
    const seen = new Set();
    return sizes.filter(sizeObj => {
      const normalizedSize = sizeObj.size.toUpperCase();
      if (seen.has(normalizedSize)) {
        return false;
      }
      seen.add(normalizedSize);
      return true;
    });
  };

  // Handle image load errors
  const handleImageError = (e) => {
    e.target.src = yellowWoman.src;
  };

  // Navigation functions for images
  const nextImage = () => {
    const images = getCurrentImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getCurrentImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('authToken');
      setToken(storedToken || '');
    }
  }, []);

  // Initialize selected color and variation
  useEffect(() => {
    if (product?.variations?.length > 0) {
      const queryColor = searchParams.get('color');

      if (queryColor) {
        const variation = product.variations.find(v =>
          v.color.toLowerCase() === queryColor.toLowerCase()
        );
        if (variation) {
          setSelectedColor(queryColor.toLowerCase());
          setSelectedVariation(variation);
        }
      } else {
        // Default to first variation
        const firstVariation = product.variations[0];
        setSelectedColor(firstVariation.color.toLowerCase());
        setSelectedVariation(firstVariation);
      }
    }
  }, [product, searchParams]);

  // Handle color selection
  const handleColorSelect = (color, variation) => {
    setSelectedColor(color.toLowerCase());
    setSelectedVariation(variation);
    setSelectedSize(null); // Reset size when color changes
    setCurrentImageIndex(0); // Reset to first image
  };

  const { data: favoritesData, isLoading: favoritesLoading } = useFavoritesQuery(token, {
    enabled: !!token
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }

  // const isFavorite = product && favoritesData?.data?.some(fav => fav._id === product._id);
  const isFavorite = !!(product?._id && favoritesData?.data?.some(fav => fav?._id === product._id));

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      showSnackbar({ message: "Please select a size", severity: "error" });
      return;
    }

    if (!selectedColor) {
      showSnackbar({ message: "Please select a color", severity: "error" });
      return;
    }

    const finalQuantity = Math.max(quantity, 1);

    if (!selectedVariation) {
      showSnackbar({ message: "Selected variation not found", severity: "error" });
      return;
    }

    if (!product._id) {
      showSnackbar({
        message: "Product ID is missing",
        severity: "error",
      });
      return;
    }

    // Check if item already exists in cart
    const existingCartItem = findCartItem(product._id, selectedSize, selectedColor);

    const apiPayload = {
      productId: product._id,
      quantity: finalQuantity,
      size: selectedSize,
      color: selectedVariation.color,
    };

    // Local state item for immediate UI feedback
    const newItem = {
      id: product._id,
      productId: product._id,
      quantity: finalQuantity,
      size: selectedSize,
      color: selectedColor,
      name: product.name,
      image: getCurrentImages()[0],
      price: product.price?.$numberDecimal ?? "0.00",
      description: product.description || "No description",
    };

    if (existingCartItem) {
      // Update existing item
      const newQuantity = existingCartItem.quantity + finalQuantity;
      updateCartMutation(
        { productId: product._id, quantity: newQuantity },
        {
          onSuccess: (data) => {
            // Update local state
            addToCart(newItem);

            // Refetch cart to sync with server
            refetchCart();

            const safeMessage = typeof data?.message === 'string'
              ? data.message
              : 'Item updated in cart';

            showSnackbar({
              message: safeMessage,
              severity: "success",
            });

            router.push('/viewProductDetails/checkout/cart');
          },
          onError: (err) => {
            const errorMessage = typeof err?.response?.data?.message === 'string'
              ? err.response.data.message
              : 'Something went wrong';

            showSnackbar({
              message: errorMessage,
              severity: "error",
            });
          },
        }
      );
    } else {
      // Add new item
      addToCartMutation(apiPayload, {
        onSuccess: (data) => {
          // Update local state
          addToCart(newItem);

          // Refetch cart to sync with server
          refetchCart();

          const safeMessage = typeof data?.message === 'string'
            ? data.message
            : 'Item added to cart';

          showSnackbar({
            message: safeMessage,
            severity: "success",
          });

          router.push('/viewProductDetails/checkout/cart');
        },
        onError: (err) => {
          const errorMessage = typeof err?.response?.data?.message === 'string'
            ? err.response.data.message
            : 'Something went wrong';

          showSnackbar({
            message: errorMessage,
            severity: "error",
          });
        },
      });
    }
  };
  console.log("Adding to cart")

  const ProductInfoPanel = () => (
    <div className="px-4 md:px-0">
      <h1 className="text-2xl md:text-3xl font-bold text-[#061410] text-left">{product.name}</h1>
      <p className="text-left text-[#061410] text-lg font-bold">{product.price?.$numberDecimal ?? "N/A"}</p>

      <div className="card-content flex justify-left gap-2">
        <Rating
          value={ratingValue}
          onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
          precision={0.5}
          size="small"
        />
        <p className='text-[#061410] text-xs font-medium'>{ratingValue ? Math.round(ratingValue).toFixed(1) : 'N/A'}</p>
        <p className='text-[#061410] text-xs font-medium'>(400 + Reviews)</p>
      </div>

      <div className='hidden md:block'>
        <p className='text-[#061410] text-sm font-bold font-figtree mt-4'>About this item</p>
        <p className='text-black text-sm font-normal text-wrap mb-6'>
          {product.description || "No description available."}
        </p>
      </div>

      <div className="mb-6 flex gap-2 flex-col">
        {/* Color Selection */}
        <div className="mt-2 md:mb-6 flex items-center gap-2 md:gap-4">
          <label className="text-lg font-medium text-black whitespace-nowrap flex-shrink-0">Color</label>
          <div className="flex gap-1 md:gap-3 flex-1">
            {product.variations?.map((variation, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(variation.color, variation)}
                className={`px-2 md:px-4 py-2 border rounded-lg text-black text-xs flex-1 min-w-0 ${selectedColor === variation.color.toLowerCase()
                    ? 'border-[#26735B] bg-[#26735B] text-white'
                    : 'border-gray-200'
                  }`}
              >
                {variation.color}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="mt-2 md:mb-6 flex items-center gap-2 md:gap-4">
          <label className="text-lg font-medium text-black whitespace-nowrap flex-shrink-0">Size</label>
          <div className="flex gap-1 md:gap-3 flex-1">
            {getUniqueSizes(getAvailableSizes()).map((sizeObj, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(sizeObj.size)}
                className={`px-2 md:px-4 py-2 border rounded-lg text-black text-xs flex-1 min-w-0 ${selectedSize === sizeObj.size ? 'border-gray-400 bg-gray-100' : 'border-gray-200'
                  }`}
              >
                {sizeObj.size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <label className="text-lg font-medium text-black block">Quantity</label>
          <div className="flex items-center border border-gray-200 rounded-lg w-32">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-2 border-r border-gray-200 text-black cursor-pointer"
            >
              −
            </button>
            <span className="px-4 py-2 text-black flex-1 text-center">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-4 py-2 border-l border-gray-200 text-black cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>
    

      <div className="hidden md:flex flex-row gap-4 mb-6">
        <div className="flex-1">
          <button
            className="bg-[#26735B] text-white px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1f5a47] transition-colors"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="w-5 h-5 text-white" />
            Add to Cart
          </button>
        </div>
        <div className="flex items-center justify-center w-12 h-12 border border-[#26735B] rounded-lg hover:bg-gray-50 cursor-pointer">
          {isFavorite ? (
            <FaHeart className="text-[#26735B] w-5 h-5" />
          ) : (
            <FiHeart className="text-[#26735B] w-5 h-5" />
          )}
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] p-4 z-50">
        <div className="flex gap-3">

          <button
            className="bg-[#26735B] text-white px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1f5a47] transition-colors"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="w-5 h-5 text-white" />
            Add to Cart
          </button>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            {isFavorite ? (
              <FaHeart className="text-[#26735B] w-5 h-5" />
            ) : (
              <FiHeart className="text-[#26735B] w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const currentImages = getCurrentImages();

  return (
    <div className="max-w-7xl mx-auto py-12 md:py-4">
      {/* Mobile Layout */}
      <div className="block md:hidden pb-24 overflow-y-auto">
        <div className="px-4 py-4">
          <div className="relative">
            <Image
              alt="Main product"
              src={currentImages[currentImageIndex] || yellowWoman.src}
              width={492}
              height={500}
              style={{ height: 'auto', width: '100%' }}
              className="rounded-lg w-full h-auto mb-4"
              onError={handleImageError}
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#E4E7EC] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
            >
              <svg className="w-4 h-4 text-[#343330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#E4E7EC] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
            >
              <svg className="w-4 h-4 text-[#343330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {currentImages.map((img, idx) => (
              <Image
                key={idx}
                alt={`Product thumbnail ${idx}`}
                src={img || yellowWoman.src}
                width={96}
                height={128}
                className={`object-cover rounded cursor-pointer ${idx === currentImageIndex ? 'border-2 border-[#26735B]' : 'border border-gray-200'
                  }`}
                onClick={() => setCurrentImageIndex(idx)}
                onError={handleImageError}
              />
            ))}
          </div>
        </div>

        <ProductInfoPanel />

        <div className="px-4 flex flex-col gap-4">
          <ProductTabs />
        <RecentlyViewed test="hello"/>
        </div>
          {/* <div>
      </div> */}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex flex-col md:flex-row md:gap-10 py-8 mt-[45px]">
          <div className='flex flex-row gap-4 flex-1'>
            <div className="flex flex-col gap-2 w-20">
              {currentImages.map((img, idx) => (
                <Image
                  key={idx}
                  alt={`Product thumbnail ${idx}`}
                  src={img || yellowWoman.src}
                  width={96}
                  height={128}
                  className={`object-cover rounded cursor-pointer ${idx === currentImageIndex ? 'border-2 border-[#26735B]' : 'border border-gray-200'
                    }`}
                  onClick={() => setCurrentImageIndex(idx)}
                  onError={handleImageError}
                />
              ))}
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="relative">
                <Image
                  alt="Main product"
                  src={currentImages[currentImageIndex] || yellowWoman.src}
                  width={550}
                  height={500}
                  style={{ height: 'auto', width: '100%' }}
                  className="rounded-lg w-full h-auto mb-4"
                  onError={handleImageError}
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#E4E7EC] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                >
                  <svg className="w-4 h-4 text-[#343330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#E4E7EC] bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
                >
                  <svg className="w-4 h-4 text-[#343330]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="min-h-[400px] w-full">
                <ProductTabs />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <ProductInfoPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetails;
