"use client";

import React, { useState } from 'react';
import { Rating } from '@mui/material';


// Importing the image
import yellowWoman from '../../assets/yellowWoman.png'; // Adjust the path as necessary

import { StaticImageData } from 'next/image';
import { useParams, useRouter } from 'next/navigation';

// interface Product {
//   id: number;
//   title: string;
//   price: string;
//   image: string | StaticImageData;
//   rating?: number;
// }

const products = [
  { id: 1, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
  { id: 2, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
  { id: 3, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
  { id: 4, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
  { id: 5, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
  { id: 6, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
  { id: 7, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
  { id: 8, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
  { id: 9, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
  { id: 10, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
  { id: 11, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
  { id: 12, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
  { id: 13, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
  { id: 14, title: "Elegant Red Maxi Dress", price: "150,000", image: yellowWoman },
  { id: 15, title: "Classic Black Evening Gown", price: "200,000", image: yellowWoman },
  { id: 16, title: "Golden Yellow Butterfly Bodycon Dress", price: "120,000", image: yellowWoman },
 
  // Add more products here...
];

const ViewProducts = () => {
  const [ratingValue, setRatingValue] = useState(3.5);
  const router = useRouter();
  console.log('Router:', router); // Check if router is defined
  const params = useParams();
const id = params?.id; // or you can destructure directly as const { id } = useParams();


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
  const handleOptions = (id) => {
    if (!id) {
      console.error('Error: Product ID is undefined');
      return;
    }
    console.log(`Navigating to ViewDetailsPage for product ID: ${id}`);
    router.push(`/viewProductDetails/${id}`);
  };
  

  return (
    <div className="p-10 ">
      <p className="text-3xl font-bold text-[#061410] mb-6 text-left ml-12">Best Sellers</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 ml-8">
        {products.map((product) => (
          <div key={product.id} className="ml-4">
            <div
              style={{ width: '400px', borderRadius: '8px', overflow: 'hidden' }}
              className="card-container"
            >
              {/* Header */}
              <div className="card-header">
                <img alt="custom header" src={typeof yellowWoman === 'string' ? yellowWoman : yellowWoman.src} className="w-full rounded-t-lg" />
              </div>

              {/* Title */}
              <div className="card-title">
                <p className="text-left text-base font-normal font-figtree text-[#061410]">{product.title}</p>
              </div>

              {/* Subtitle (Price) */}
              <div className="card-subtitle">
                <p className="text-left text-[#061410] text-lg font-bold">{product.price}</p>
              </div>

              {/* Content (Rating) */}
              <div className="card-content flex justify-left gap-2">
                <Rating
                  value={ratingValue}
                  onChange={(event, newValue) => setRatingValue(newValue ?? 0)}
                  precision={0.5} // Allows half-star rating
                  size="small" // Set the size of the stars
                />
                <p className='text-[#061410] text-xs font-medium'>{ratingValue ? Math.round(ratingValue).toFixed(1) : 'N/A'}</p>
                <p className='text-[#061410] text-xs font-medium'>(400 + Reviews)</p>
              </div>

              {/* Footer */}
              <div className="flex gap-4 border border-[#26735B] rounded-lg text-[#26735B] mt-4">
                <button
                  type="button"
                  onClick={() => handleOptions(product.id)}
                  className="w-full h-[48px] text-base font-bold font-manrope"
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
