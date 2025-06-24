// "use client";

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { useParams, useRouter } from 'next/navigation';
// // import Breadcrumbs from '@/components/Breadcrumbs'; // Import Breadcrumbs component
// // import { useCartStore } from '@/store/cart'; 
// import yellowWoman from '../../assets/yellowWoman.png';
// import { FaHeart } from 'react-icons/fa';
// import SpecsAndReviews from './SpecsAndReviews';
// import { FiShoppingCart } from 'react-icons/fi';
// import { FiHeart } from 'react-icons/fi';
// import { useCartStore } from '@/src/lib/store/useCart';
// import { Rating } from '@mui/material';
// import useProductsQuery from '@/src/lib/hooks/useProductMutation';
// import useAddToCartMutation from "../../lib/hooks/useAddToCartMutation";
// import useFavoritesQuery from '@/src/lib/hooks/useFavouritesQuery';
// import useSnackbarStore from '@/src/lib/store/useSnackbarStore';



// const sizes = [8, 10, 12, 14, 16, 18, 20];
// const colors = ["#2E7D32", "#000", "#1976D2", "#D32F2F", "#FFC107", "#E91E63", "#1B5E20", "#FFF", "#BDBDBD"];

// const ViewProductDetails = () => {
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [images] = useState(Array(5).fill(yellowWoman));
//   const [breadcrumbs] = useState([
//     { label: 'Home', path: '/' },
//     { label: 'Category', path: '/category' },
//     { label: 'Product', path: '/category/product' }
//   ]);
//   const router = useRouter();
//   const params = useParams();
//   const id = params?.id;
//   const [ratingValue, setRatingValue] = useState(3.5);

//   const { addToCart } = useCartStore();
//   const { data, isLoading } = useProductsQuery();
//   const { mutate: addToCartMutation, isPending, error } = useAddToCartMutation();
//   // const products = data?.data ?? [];
//   const products = data?.data?.products ?? [];

//   const product = products.find(p => p._id === id);
//   const [token, setToken] = useState('');
//   const { showSnackbar } = useSnackbarStore();
//   console.log('params.id:', id);
// console.log('products:', products);



//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedToken = sessionStorage.getItem('authToken');
//       setToken(storedToken || '');
//     }
//   }, []);
//   const { data: favoritesData, isLoading: favoritesLoading } = useFavoritesQuery(token);


//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   if (!product) {
//     return <div>Product not found</div>;
//   }
//   //   useEffect(() => {
//   //   console.log("favoritesData", favoritesData);
//   // }, [favoritesData]);

//   // const isFavorite = product && favoritesData?.some(fav => fav._id === product._id);
//   const isFavorite = product && favoritesData?.data?.some(fav => fav._id === product._id);



//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       showSnackbar({
//         message: "Please select a size",
//         severity: "error",
//       });
//       return;
//     }

//     if (!selectedColor) {
//       showSnackbar({
//         message: "Please select a color",
//         severity: "error",
//       });
//       return;
//     }

//     const newItem = {
//       id: product._id,
//       quantity,
//       size: selectedSize,
//       color: selectedColor,
//       name: product.name,
//       image: product?.variations?.[0]?.images?.[0] || yellowWoman.src,
//       price: product.price?.$numberDecimal ?? "0.00",
//       description: product.description || "No description",
//     };

//     console.log('Adding to cart:', newItem);
//     addToCart(newItem);
//     addToCartMutation(newItem);


//     router.push('/viewProductDetails/checkout/cart');
//   };

//   const ProductDetails = () => (
//     <div className="px-4 md:px-0">
//       <h1 className="text-2xl md:text-3xl font-bold text-[#061410] mb-4 md:mb-6 text-left">{product.name}</h1>
//       <p className="text-left text-[#061410] text-lg font-bold mb-4">{product.price?.$numberDecimal ?? "N/A"}</p>

//       <div className="card-content flex justify-left gap-2 mb-4">
//         <Rating
//           value={ratingValue}
//           onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
//           precision={0.5}
//           size="small"
//         />
//         <p className='text-[#061410] text-xs font-medium'>{ratingValue ? Math.round(ratingValue).toFixed(1) : 'N/A'}</p>
//         <p className='text-[#061410] text-xs font-medium'>(400 + Reviews)</p>
//       </div>

//       <p className='text-[#061410] text-lg font-normal font-figtree mb-2'>About this item</p>
//       <p className='text-black text-sm font-normal text-wrap mb-6'>
//         Lorem ipsum dolor sit amet consectetur. Neque quis commodo neque justo id scelerisque ultrices varius ornare. 
//         Aliquam dignissim amet fames sollicitudin hac metus fusce ultrices. Dignissim aliquet erat ipsum diam. 
//         Nascetur id nulla penatibus vel enim tristique viverra nibh imperdiet.
//       </p>

//       <div className="mb-6">
//         {/* Size selection */}
//         <div className="mb-6">
//           <label className="text-lg font-medium text-black mb-3 block">Size</label>
//           <div className="flex flex-wrap gap-3">
//             {sizes.map((size) => (
//               <button
//                 key={size}
//                 onClick={() => setSelectedSize(size)}
//                 className={`px-4 py-2 border rounded-lg text-black min-w-[48px] ${
//                   selectedSize === size ? 'border-gray-400 bg-gray-100' : 'border-gray-200'
//                 }`}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Color selection */}
//         <div className="mb-6">
//           <label className="text-lg font-medium text-black mb-3 block">Color</label>
//           <div className="flex flex-wrap gap-3">
//             {colors.map((color) => (
//               <button
//                 key={color}
//                 onClick={() => setSelectedColor(color)}
//                 className={`w-8 h-8 rounded-full border ${
//                   selectedColor === color ? 'border-2 border-black' : 'border-2 border-gray-300'
//                 }`}
//               >
//                 <span
//                   style={{ backgroundColor: color }}
//                   className={`w-full h-full rounded-full block ${
//                     selectedColor === color ? 'scale-90' : ''
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Quantity selection */}
//         <div className="mb-6">
//           <label className="text-lg font-medium text-black mb-3 block">Quantity</label>
//           <div className="flex items-center border border-gray-200 rounded-lg w-32">
//             <button 
//               onClick={decreaseQuantity} 
//               className="px-4 py-2 border-r border-gray-200 text-black hover:bg-gray-50"
//             >
//               −
//             </button>
//             <span className="px-4 py-2 text-black flex-1 text-center">{quantity}</span>
//             <button 
//               onClick={increaseQuantity} 
//               className="px-4 py-2 border-l border-gray-200 text-black hover:bg-gray-50"
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-row gap-4 mb-6">
//         <div className="flex-1">
//           <button 
//             className="bg-[#26735B] text-white px-4 py-3 rounded-lg w-full flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1f5a47] transition-colors" 
//             onClick={handleAddToCart}
//           >
//             <FiShoppingCart className="w-5 h-5 text-white" />
//             Add to Cart
//           </button>
//         </div>
//         <div className="flex items-center justify-center w-12 h-12 border border-[#26735B] rounded-lg hover:bg-gray-50 cursor-pointer">
//           {isFavorite ? (
//             <FaHeart className="text-[#191818] w-5 h-5" />
//           ) : (
//             <FiHeart className="text-[#26735B] w-5 h-5" />
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     // <Layout>
//     <div className="max-w-7xl mx-auto ">
//       <div className="">
//         {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
//       </div>
//       <div className="flex flex-col md:flex-row md:gap-10 py-8 md:h-[calc(100vh-160px)] mt-[45px]">
//         <div className='flex flex-col gap-4'>
//           <div className="flex flex-col gap-4">
//             <Image
//               alt="Main product"
//               src={
//                 product?.variations?.[0]?.images?.[0] ??
//                 yellowWoman.src

//               }
//               width={550} height={550} className="rounded-t-lg"
//             />
//             <div className="grid grid-cols-6 gap-2 overflow-hidden">
//               {(product?.variations?.[0]?.images ?? [yellowWoman.src]).map((img, idx) => (
//                 <Image key={idx}
//                   // alt="Thumbnail" 
//                   // src={image} 
//                   alt={`Product thumbnail ${idx}`}
//                   src={img}
//                   width={96}
//                   height={128}
//                   className="object-cover"
//                 />
//               ))}
//             </div>
//           </div>
//           <ProductDetails />
//           <div className="min-h-[400px] w-full">
//             <SpecsAndReviews />
//           </div>
//         </div>
//         <div className="">
//           <h1 className="text-3xl font-bold text-[#061410] mb-6 text-left text-nowrap">{product.name}</h1>
//           <p className="text-left text-[#061410] text-lg font-bold">{product.price?.$numberDecimal ?? "N/A"}</p>
//           <div className="card-content flex justify-left gap-2">
//             <Rating
//               value={ratingValue}
//               onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
//               precision={0.5} // Allows half-star rating
//               size="small" // Set the size of the stars
//             />
//             <p className='text-[#061410] text-xs font-medium'>{ratingValue ? Math.round(ratingValue).toFixed(1) : 'N/A'}</p>
//             <p className='text-[#061410] text-xs font-medium'>(400 + Reviews)</p>
//           </div>
//           <p className='text-[#061410] text-lg font-normal font-figtree'>About this item</p>
//           <p className='text-black text-sm font-normal text-wrap'>Lorem ipsum dolor sit amet consectetur. Neque quis commodo neque justo id scelerisque ultrices varius ornare. Aliquam dignissim amet fames sollicitudin hac metus fusce ultrices. Dignissim aliquet erat ipsum diam. Nascetur id nulla penatibus vel enim tristique viverra nibh imperdiet.</p>
//           <div className="p-6">
//             {/* Size selection */}
//             <div className="mb-4 flex items-center gap-4">
//               <label className="text-lg font-medium text-black">Size</label>
//               <div className="flex gap-3 mt-2">
//                 {sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-4 py-2 border rounded-lg text-black ${selectedSize === size ? 'border-grey-200 text-black' : 'border-gray-200'}`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Color selection */}
//             <div className="mb-4 flex items-center gap-4">
//               <label className="text-lg font-medium text-black">Color</label>
//               <div className="flex gap-3 mt-2">
//                 {colors.map((color) => (
//                   <button
//                     key={color}
//                     onClick={() => setSelectedColor(color)}
//                     className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-2 border-black' : 'border-2 border-gray-300'}`}
//                   >
//                     <span
//                       style={{ backgroundColor: color }}
//                       className={`w-full h-full rounded-full block ${selectedColor === color ? 'scale-90' : ''}`}
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity selection */}
//             <div className="flex items-center gap-4">
//               <label className="text-lg font-medium text-black">Quantity</label>
//               <div className="flex items-center border border-grey-200 rounded-lg mt-2 w-32">
//                 <button onClick={decreaseQuantity} className="px-4 py-2 border-r border-grey-200 text-black">−</button>
//                 <span className="px-4 py-2 text-black">{quantity}</span>
//                 <button onClick={increaseQuantity} className="px-4 py-2 border-l text-black">+</button>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-row gap-4">
//             <div className="flex-1">
//               <button className="bg-[#26735B] text-white px-4 py-2 rounded-lg w-full h-full flex items-center justify-center gap-2 cursor-pointer" onClick={handleAddToCart}>
//                 <FiShoppingCart className="w-6 h-6 text-white" />
//                 Add to Cart
//               </button>
//             </div>
//             <div className="flex items-center justify-center w-12 h-12 border border-[#26735B] rounded-lg">
//               {/* <FiHeart className="text-[#26735B] w-5 h-5" /> */}
//               {isFavorite ? (
//                 <FaHeart className="text-[#191818] w-5 h-5" />
//               ) : (
//                 <FiHeart className="text-[#26735B] w-5 h-5" />
//               )}

//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//     // </Layout>
//   );
// };

// export default ViewProductDetails;
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
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

const sizes = [8, 10, 12, 14, 16, 18, 20];
const colors = ["#2E7D32", "#000", "#1976D2", "#D32F2F", "#FFC107", "#E91E63", "#1B5E20", "#FFF", "#BDBDBD"];

const ViewProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
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
  const { mutate: addToCartMutation, isPending, error } = useAddToCartMutation();
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

  const { data: favoritesData, isLoading: favoritesLoading } = useFavoritesQuery(token);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!product) {
    return <div>Product not found</div>;
  }

  const isFavorite = product && favoritesData?.data?.some(fav => fav._id === product._id);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedSize) {
      showSnackbar({
        message: "Please select a size",
        severity: "error",
      });
      return;
    }

    if (!selectedColor) {
      showSnackbar({
        message: "Please select a color",
        severity: "error",
      });
      return;
    }

    const newItem = {
      id: product._id,
      quantity,
      size: selectedSize,
      color: selectedColor,
      name: product.name,
      image: product?.variations?.[0]?.images?.[0] || yellowWoman.src,
      price: product.price?.$numberDecimal ?? "0.00",
      description: product.description || "No description",
    };

    console.log('Adding to cart:', newItem);
    addToCart(newItem);
    addToCartMutation(newItem);

    router.push('/viewProductDetails/checkout/cart');
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
          Lorem ipsum dolor sit amet consectetur. Neque quis commodo neque justo id scelerisque ultrices varius ornare.
          Aliquam dignissim amet fames sollicitudin hac metus fusce ultrices. Dignissim aliquet erat ipsum diam.
          Nascetur id nulla penatibus vel enim tristique viverra nibh imperdiet.
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

        <div className="mt-4 md:mb-6 flex items-center gap-4">
          <label className="text-lg font-medium text-black whitespace-nowrap">Color</label>
          <div className="flex flex-1 gap-1 md:gap-3 ">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
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
        </div>

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

      {/* Desktop Layout */}
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