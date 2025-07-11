"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import Breadcrumbs from '@/components/Breadcrumbs'; // Import Breadcrumbs component
// import { useCartStore } from '@/store/cart'; 
import yellowWoman from '../../assets/yellowWoman.png';
import { FaHeart } from 'react-icons/fa';
import SpecsAndReviews from './SpecsAndReviews';
import { FiShoppingCart } from 'react-icons/fi';
import { FiHeart } from 'react-icons/fi';
import { useCartStore } from '@/src/lib/store/useCart';
import { Rating } from '@mui/material';
import useProductsQuery from '@/src/lib/hooks/useProductMutation';
import useAddToCartMutation from "../../lib/hooks/useAddToCartMutation";
import useFavoritesQuery from '@/src/lib/hooks/useFavouritesQuery';
import useSnackbarStore from '@/src/lib/store/useSnackbarStore';

const sizes = ['L', 10, 12, 14, 16, 18, 20];
const colors = ["yellow", "blue", "red", "brown suit", "sky-blue", "gray", "cream", "white", "pink", "purple"];

const ViewProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const searchParams = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [images] = useState(Array(5).fill(yellowWoman));
  const [breadcrumbs] = useState([
    { label: 'Home', path: '/' },
    { label: 'Category', path: '/category' },
    { label: 'Product', path: '/category/product' }
  ]);
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [ratingValue, setRatingValue] = useState(3.5);

  const { addToCart } = useCartStore();
  const { data, isLoading } = useProductsQuery();
  const { mutate: addToCartMutation } = useAddToCartMutation();
  const products = data?.data?.products ?? [];

  const product = products.find(p => p._id === id);
  const [token, setToken] = useState('');
  const { showSnackbar } = useSnackbarStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Add these navigation functions
  const nextImage = () => {
    const images = product?.variations?.[0]?.images ?? [yellowWoman.src];
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = product?.variations?.[0]?.images ?? [yellowWoman.src];
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('authToken');
      setToken(storedToken || '');
    }
  }, []);

  useEffect(() => {
    const queryColor = searchParams.get('color');
    const variationColor = product?.variations?.[0]?.color;
    const size = searchParams.get('size');
    console.log("queryColor:", queryColor);
    console.log("variationColor:", variationColor);

    if (queryColor && typeof queryColor === 'string') {
      setSelectedColor(queryColor.toLowerCase());
    } else if (variationColor && typeof variationColor === 'string') {
      setSelectedColor(variationColor.toLowerCase());
    } else if (
      size && !isNaN(Number(size))) {
      setSelectedSize(Number(size));
    }
  }, [product, searchParams]);
  // useEffect(() => {
  //   const queryColor = searchParams.get('color');

  //   if (queryColor) {
  //     setSelectedColor(queryColor.toLowerCase());
  //     return;
  //   }

  //   if (
  //     product &&
  //     Array.isArray(product.variations) &&
  //     product.variations.length > 0 &&
  //     typeof product.variations[0].color === 'string'
  //   ) {
  //     setSelectedColor(product.variations[0].color.toLowerCase());
  //   }
  // }, [product, searchParams]);



  const { data: favoritesData, isLoading: favoritesLoading } = useFavoritesQuery(token, {
    enabled: !!token
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }
  //   useEffect(() => {
  //   const newColor = searchParams.get("color")?.toLowerCase() || null;
  //   setSelectedColor(newColor);
  // }, [searchParams]);
  // useEffect(() => {
  //   if (product && product.variations?.[0]?.color) {
  //     setSelectedColor(product.variations[0].color.toLowerCase());
  //   }
  // }, [product]);





  const isFavorite = product && favoritesData?.data?.some(fav => fav._id === product._id);

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
    const selectedVariation = product?.variations.find(
      (v) => v.color.toLowerCase() === selectedColor
    );

    if (!selectedVariation) {
      showSnackbar({ message: "Selected variation not found", severity: "error" });
      return;
    }


    const apiPayload = {
      productId: product._id,
      quantity: finalQuantity,
      size: selectedSize,
      color: selectedVariation?.color ?? selectedColor,
      // color: selectedColor && typeof selectedColor === 'string' ? selectedColor.toLowerCase() : selectedColor,
    };

    // Debug: Check if product._id exists
    if (!product._id) {
      console.error('Product ID is missing:', product);
      showSnackbar({
        message: "Product ID is missing",
        severity: "error",
      });
      return;
    }


    const newItem = {
      id: product._id,
      quantity: finalQuantity,
      size: selectedSize,
      color: selectedColor,
      name: product.name,
      image: product?.variations?.[0]?.images?.[0] || yellowWoman.src,
      price: product.price?.$numberDecimal ?? "0.00",
      description: product.description || "No description",
    };

    console.log('Adding to cart:', newItem);
    console.log("Calling mutation with:", newItem);
    console.log("Size:", selectedSize);
    console.log("Color:", selectedColor);
    console.log("Calling mutation now...");
    console.log('Product object:', product);
    console.log('Product ID:', product._id);
    console.log('Final API payload:', apiPayload);

    addToCart(newItem);
    addToCartMutation(apiPayload, {
      onSuccess: (data) => {
        console.log('Mutation succeeded, navigating to cart...');
        const safeMessage =
          typeof data?.message === 'string'
            ? data.message
            : 'Item added to cart';

        showSnackbar({
          message: safeMessage,
          severity: "success",
        });
        router.push('/viewProductDetails/checkout/cart');
      },
      onError: (err) => {
        console.error("Mutation error:", err);
         const errorMessage =
    typeof err?.message === 'string'
      ? err.message
      : 'Something went wrong';

  showSnackbar({
    message: errorMessage,
    severity: "error",
  });

      },
    });

  };

  const ProductDetails = () => (
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

      <div className="mb-6 flex gap-2 flex-col ">
        <div className="mt-2 md:mb-6 flex items-center gap-2 md:gap-4">
          <label className="text-lg font-medium text-black whitespace-nowrap flex-shrink-0">Size</label>
          <div className="flex gap-1 md:gap-3 flex-1">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 md:px-4 py-2 border rounded-lg text-black text-xs flex-1 min-w-0 ${selectedSize === size ? 'border-gray-400 bg-gray-100' : 'border-gray-200'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* <div className="mt-4 md:mb-6 flex items-center gap-4">
          <label className="text-lg font-medium text-black whitespace-nowrap">Color</label>
          <div className="flex flex-1 gap-1 md:gap-3 ">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color?.toLowerCase() ? color.toLowerCase() : color)}
                className={`w-8 h-8 rounded-full border flex-shrink-0 ${selectedColor === color ? 'border-2 border-black' : 'border-2 border-gray-300'
                  }`}
              >
                <span
                  style={{ backgroundColor: color }}
                  className={` h-full rounded-full block ${selectedColor === color ? 'scale-90' : ''
                    }`}
                />
              </button>
            ))}
          </div>
        </div> */}

        <div className="mb-6 flex items-center gap-4">
          <label className="text-lg font-medium text-black block">Quantity</label>
          <div className="flex items-center border border-gray-200 rounded-lg w-32">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-2 border-r border-gray-200 text-black hover:bg-gray-50"
            >
              −
            </button>
            <span className="px-4 py-2 text-black flex-1 text-center">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-4 py-2 border-l border-gray-200 text-black hover:bg-gray-50"
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
            <FaHeart className="text-[#191818] w-5 h-5" />
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
              <FaHeart className="text-[#191818] w-5 h-5" />
            ) : (
              <FiHeart className="text-[#26735B] w-5 h-5" />
            )}
            {/* <FaHeart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} /> */}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-12 md:py-4">
      {/* <div className=""> */}
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      {/* </div> */}
      {/* Mobile Layout */}
      <div className="block md:hidden">
        {/* Product Images */}
        <div className="px-4 py-4">
          <div className="relative">
            <Image
              alt="Main product"
              src={product?.variations?.[0]?.images?.[0] ?? yellowWoman.src}
              width={492}
              height={500}
              style={{ height: 'auto', width: '100%' }}
              className="rounded-lg w-full h-auto mb-4"
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
            {(product?.variations?.[0]?.images ?? [yellowWoman.src]).map((img, idx) => (
              <Image
                key={idx}
                alt={`Product thumbnail ${idx}`}
                src={img}
                width={96}
                height={128}
                // className="object-cover rounded"
                className={`object-cover rounded cursor-pointer ${idx === currentImageIndex ? 'border-2 border-[#26735B]' : 'border border-gray-200'
                  }`}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
        </div>

        <ProductDetails />

        <div className="px-4">
          <SpecsAndReviews />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="flex flex-col md:flex-row md:gap-10 py-8 md:h-[calc(100vh-160px)] mt-[45px]">
          <div className='flex flex-col gap-4 flex-1'>
            <div className="flex flex-col gap-4">
              <Image
                alt="Main product"
                src={product?.variations?.[0]?.images?.[0] ?? yellowWoman.src}
                width={550}
                height={550}
                className="rounded-t-lg"
              />
              <div className="grid grid-cols-6 gap-2 overflow-hidden">
                {(product?.variations?.[0]?.images ?? [yellowWoman.src]).map((img, idx) => (
                  <Image
                    key={idx}
                    alt={`Product thumbnail ${idx}`}
                    src={img}
                    width={96}
                    height={128}
                    className="object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="min-h-[400px] w-full">
              <SpecsAndReviews />
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <ProductDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetails;