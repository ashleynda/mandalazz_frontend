"use client";

import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';


// Importing the image
import yellowWoman from '../../assets/yellowWoman.png';

import { StaticImageData } from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import useProductsQuery from '../../lib/hooks/useProductMutation';
import { FiHeart } from 'react-icons/fi';
import useAddToFavorites from '../../lib/hooks/useAddToFavourites';
import useRemoveFavoriteMutation from '../../lib/hooks/useRemoveFavourites';
import useFavoritesQuery from '@/src/lib/hooks/useFavouritesQuery';
import useSnackbarStore from '@/src/lib/store/useSnackbarStore';
import { FaHeart } from 'react-icons/fa';



const ViewProducts = () => {
  const [ratingValue, setRatingValue] = useState(3.5);
  const router = useRouter();
  console.log('Router:', router);
  const params = useParams();
  const id = params?.id;
  const [token, setToken] = useState('');
  const { data, isLoading, isError, error } = useProductsQuery();
  // const products = data?.data ?? [];
  let products = [];
  useEffect(() => {
  console.log('URL Param ID:', id);
}, [id]);
useEffect(() => {
  const found = products.find(p => p._id === '687392714d98fe23ca44ad62');
  console.log('Test Product Found:', found);
}, [products]);


  if (data) {
    if (Array.isArray(data)) {
      products = data;
      console.log('Using data directly as array');
    } else if (Array.isArray(data.data)) {
      products = data.data;
      console.log('Using data.data as array');
    } else if (Array.isArray(data.products)) {
      products = data.products;
      console.log('Using data.products as array');
    } else if (data.data && Array.isArray(data.data.products)) {
      products = data.data.products;
      console.log('Using data.data.products as array');
    } else {
      console.log('Could not find products array in data structure');
      console.log('Available keys in data:', Object.keys(data));
    }
  }

  console.log('Final products array:', products);
  console.log('Products length:', products.length);
  console.log('Is products an array?', Array.isArray(products));
  console.log('Products:', products);
  const { mutate: addToFavorites, isPending } = useAddToFavorites();
  const [favorites, setFavorites] = useState([]);
  const deleteFavorite = useRemoveFavoriteMutation();
  const { data: favoritesQuery } = useFavoritesQuery(token || undefined, {
    enabled: !!token,
  });
  console.log('Favorites Query:', favoritesQuery);
  const { showSnackbar } = useSnackbarStore();


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('authToken');
      setToken(storedToken || '');
    }
  }, []);

  // useEffect(() => {
  //   if (favoritesQuery?.data && Array.isArray(favoritesQuery.data)) {
  //     const favoriteIds = favoritesQuery.data.map((product) => product._id);
  //     setFavorites(favoriteIds);
  //   }
  // }, [favoritesQuery]);
  useEffect(() => {
  if (Array.isArray(favoritesQuery?.data)) {
    const favoriteIds = favoritesQuery.data
      .filter((product) => product && product._id) // exclude null/undefined or missing _id
      .map((product) => product._id);

    setFavorites(favoriteIds);
  }
}, [favoritesQuery]);



  const handleAddToFavorites = (productId) => {
    if (favorites.includes(productId)) {
      deleteFavorite.mutate(productId, {
        onSuccess: (response) => {
          setFavorites((prevFavorites) => prevFavorites.filter(id => id !== productId));
          console.log('Product removed from favorites:', response.data);
        },
        onError: (error) => {
          console.error('Error removing product from favorites:', error);
        },
      });
    } else {
      addToFavorites(productId, {
        onSuccess: (response) => {
          setFavorites((prevFavorites) => [...prevFavorites, productId]);
          showSnackbar({ message: 'Product added to favorites', severity: 'success' });
        },
        onError: (error) => {
          const message = error?.message;
           if (message?.includes("not logged in")) {
      return; // Do nothing, already handled in useAddToFavorites
    }
          showSnackbar({ message: 'Product is already in favorites', severity: 'error' });
        },
      });
    }
  };

  // const handleDelete = () => {
  //   deleteFavorite.mutate(favoriteId);
  // };




  // const handleOptions = (id: number) => {
  //   if (!id) {
  //     console.error('Error: Product ID is undefined');
  //     return;
  //   }
  //   console.log(`Navigating to ViewDetailsPage for product ID: ${id}`);
  //   router.push(`/products/viewProductDetails/${id}`)
  //   //   .then(() => console.log('Navigation successful'))
  //   //   .catch((err) => console.error('Navigation failed:', err));
  // };
  // const handleOptions = (productId, color, size) => {
  //   if (!productId || !color || !size) {
  //     console.error('Missing Product ID, color, or size:', {productId, color, size});
  //     return;
  //   }
  //   const lowerCasedColor = color?.toLowerCase?.() || "";
  //    const href = `/viewProductDetails/${productId}?color=${encodeURIComponent(lowerCasedColor)}&size=${encodeURIComponent(size)}`;
  //   console.log('Navigating to ViewDetailsPage for product ID:', href);

  // router.push({
  //   pathname:`/viewProductDetails/${productId}`,
  //   query: { color: lowerCasedColor },
  // })
  //   router.push(href);
  // };
  const handleOptions = (id, color, size) => {
    const queryParams = new URLSearchParams();
    if (color) queryParams.append('color', color.toLowerCase());
    if (size) queryParams.append('size', size);

    const href = `/viewProductDetails/${id}?${queryParams.toString()}`;
    console.log('Navigating to:', href);
    console.log('Product ID:', id, 'Color:', color, 'Size:', size);
    console.log("Product ID:", id._id);




    router.push(href);
  };

  console.log("Product:", products.name, "ColorCode:", products.variations?.[0]?.colorCode);

  console.log("Product variations:", products.variations);


  return (
    <div className="p-4 md:p-10 ">
      <p className="text-2xl md:text-3xl font-bold text-[#061410] mb-6 text-center md:text-left md:ml-12 hidden md:block">Best Sellers</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:ml-8 cursor-pointer">
        {products.map((product) => (
          <div key={product._id} className="w-full">
            <div
              role='button'
              tabIndex={0}
              style={{ borderRadius: '8px', overflow: 'hidden' }}
              className="card-container"
              // onClick={() => handleOptions(product._id, 
              //   product.variations?.[0]?.colorCode,
              //   product.variations?.[0]?.availableSizes?.[0]
              // )}
              //                 onClick={() => {
              // const variation = product.variations?.[0];
              // const color = variation?.colorCode;
              // const size = Array.isArray(variation?.sizes) ? variation.sizes[0] : undefined;
              onClick={() => {
                const variation = product.variations?.[0];
                const color = variation?.color;
                const size = variation?.sizes?.[0]?.size;

                if (!color || !size) {
                  console.error("Missing color or size", { color, size });
                  return;
                }
                handleOptions(product._id, color, size);
              }}


            >
              {/* Header */}
              <div className="card-header w-full relative h:[200px] md:h-[250px]">
                {/* <img alt="custom header" src={typeof yellowWoman === 'string' ? yellowWoman : yellowWoman.src} className="w-full rounded-t-lg" /> */}
                <img
                  alt={product.name}
                  src={
                    product.variations?.[0]?.images?.[0] ??
                    yellowWoman.src // fallback image
                  }
                  className="w-full rounded-t-lg object-cover h-[166px] md:h-full"
                />
                <button
                  // onClick={() => handleAddToFavorites(product._id)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToFavorites(product._id);
                  }}
                  className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition bg-white hover:scale-105
                  
                  `}
                  aria-label="Save for later"
                >
                  {favorites.includes(product._id) ? (
                    <FaHeart className="text-[#26735B]" size={16} />
                  ) : (
                    <FiHeart className="text-[#26735B]" size={16} />
                  )}
                  {/* <FiHeart className="text-[#191818]" /> */}
                  {/* <FiHeart className={favorites.includes(product._id) ? "bg-[#26735B]" : "text-[#191818]"} /> */}
                </button>
              </div>

              {/* Title */}
              <div className="card-title w-full mt-2">
                {/* <p className="text-left text-base font-normal font-figtree text-[#061410]">{product.title}</p> */}
                <p className="text-left text-sm font-normal font-figtree text-[#061410]">{product.name}</p>

              </div>

              {/* Subtitle (Price) */}
              <div className="card-subtitle w-full flex gap-2 ">
                <p className="text-left text-[#061410] text-base font-bold">
                  {/* {product.price} */}
                  {/* {product.price.$numberDecimal} */}
                  {product.price?.$numberDecimal ?? "N/A"}
                </p>
                <span className="text-[11px] font-normal text-[#667085] line-through mt-1">₦150,000</span>
              </div>

              {/* Content (Rating) */}
              <div className="card-content flex justify-center sm:justify-start w-full mt-2 text-nowrap">
                <Rating
                  value={ratingValue}
                  onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
                  precision={0.5}
                  size="small"
                  className='w-[63px]'
                />
                <p className='text-[#061410] text-xs font-medium'>{ratingValue ? Math.round(ratingValue).toFixed(1) : 'N/A'}</p>
                <p className='text-[#061410] text-xs font-medium tracking-tighter'>(400 + Reviews)</p>
              </div>

              {/* Footer */}
              <div className="flex gap-4 border border-[#26735B] rounded-lg text-[#26735B] mt-4 w-full">
                <button
                  type="button"
                  className="w-full h-[48px] text-base font-bold font-manrope cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const variation = product.variations?.[0];
                    const color = variation?.colorCode;
                    const size = Array.isArray(variation?.availableSizes) ? variation.availableSizes[0] : undefined;

                    handleOptions(product._id, color, size);
                  }}
                >
                  Choose Options
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
