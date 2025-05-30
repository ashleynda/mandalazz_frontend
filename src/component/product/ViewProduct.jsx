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


// interface Product {
//   id: number;
//   title: string;
//   price: string;
//   image: string | StaticImageData;
//   rating?: number;
// }

// const products = [
//   { id: 1, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
//   { id: 2, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
//   { id: 3, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
//   { id: 4, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
//   { id: 5, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
//   { id: 6, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
//   { id: 7, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
//   { id: 8, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
//   { id: 9, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
//   { id: 10, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
//   { id: 11, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
//   { id: 12, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
//   { id: 13, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
//   { id: 14, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
//   { id: 15, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
//   { id: 16, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
 
//   // Add more products here...
// ];

const ViewProducts = () => {
  const [ratingValue, setRatingValue] = useState(3.5);
  const router = useRouter();
  console.log('Router:', router); // Check if router is defined
  const params = useParams();
  const id = params?.id; 
  const [token, setToken] = useState('');
  const { data, isLoading, isError, error } = useProductsQuery();
  const products = data?.data ?? [];
  console.log('Products:', products);
  const { mutate: addToFavorites, isPending } = useAddToFavorites();
  const [favorites, setFavorites] = useState([]);
  const deleteFavorite = useRemoveFavoriteMutation();
  const { data: favoritesQuery } = useFavoritesQuery(token || null);
  console.log('Favorites Query:', favoritesQuery);

  useEffect(() => {
  if (typeof window !== 'undefined') {
    const storedToken = sessionStorage.getItem('authToken');
    setToken(storedToken || '');
  }
}, []);


  useEffect(() => {
    if (favoritesQuery && Array.isArray(favoritesQuery.favorites)) {
      setFavorites(favoritesQuery.favorites);
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
          console.log('Product added to favorites:', response.data);
        },
        onError: (error) => {
          alert('User is not logged in. Please log in to add favorites.');
          console.error('Error adding product to favorites:', error);
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
  const handleOptions = (productId) => {
    if (!productId) {
      console.error('Error: Product ID is undefined');
      return;
    }
    console.log(`Navigating to ViewDetailsPage for product ID: ${productId}`);
    router.push(`/viewProductDetails/${productId}`);
  };
  

  return (
    <div className="p-4 md:p-10 ">
      <p className="text-2xl md:text-3xl font-bold text-[#061410] mb-6 text-center md:text-left md:ml-12">Best Sellers</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-8 cursor-pointer"
        onClick={() => handleOptions(product._id)}>
        {products.map((product) => (
          <div key={product.id} className="w-full max-w-[300px]">
            <div
              style={{ width: '400px', borderRadius: '8px', overflow: 'hidden' }}
              className="card-container"
            >
              {/* Header */}
              <div className="card-header w-full relative h-[250px]">
                {/* <img alt="custom header" src={typeof yellowWoman === 'string' ? yellowWoman : yellowWoman.src} className="w-full rounded-t-lg" /> */}
                <img
                  alt={product.name}
                src={
                  product.variations?.[0]?.images?.[0] ??
                  yellowWoman.src // fallback image
                }
                  className="w-full rounded-t-lg object-cover h-[250px]"
                />
                <button
                  onClick={() => handleAddToFavorites(product._id)}
                  className={`absolute bottom-2 right-2 p-2 rounded-full shadow-md transition hover:scale-105
                  ${favorites.includes(product._id) ? "bg-[#26735B]" : "bg-white"}`}
                  aria-label="Save for later"
                >
                  {/* <FiHeart className="text-[#191818]" /> */}
                   <FiHeart className={favorites.includes(product._id) ? "bg-[#26735B]" : "text-[#191818]"} />
                </button>
              </div>

              {/* Title */}
              <div className="card-title w-full mt-2">
                {/* <p className="text-left text-base font-normal font-figtree text-[#061410]">{product.title}</p> */}
                <p className="text-center sm:text-left text-base font-normal font-figtree text-[#061410]">{product.name}</p>

              </div>

              {/* Subtitle (Price) */}
              <div className="card-subtitle w-full">
                <p className="text-center sm:text-left text-[#061410] text-lg font-bold">
                  {/* {product.price} */}
                  {/* {product.price.$numberDecimal} */}
                   {product.price?.$numberDecimal ?? "N/A"}
                </p>
              </div>

              {/* Content (Rating) */}
              <div className="card-content flex justify-center sm:justify-start gap-2 w-full mt-2">
                <Rating
                  value={ratingValue}
                  onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
                  precision={0.5}
                  size="small"
                />
                <p className='text-[#061410] text-xs font-medium'>{ratingValue ? Math.round(ratingValue).toFixed(1) : 'N/A'}</p>
                <p className='text-[#061410] text-xs font-medium'>(400 + Reviews)</p>
              </div>

              {/* Footer */}
              <div className="flex gap-4 border border-[#26735B] rounded-lg text-[#26735B] mt-4 w-full">
                <button
                  type="button"
                  onClick={() => handleOptions(product._id)}
                  className="w-full h-[48px] text-base font-bold font-manrope cursor-pointer"
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
