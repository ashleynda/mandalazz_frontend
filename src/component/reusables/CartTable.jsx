// 'use client';

// import Image from 'next/image';
// import React from 'react';

// // export type CartItem = {
// //   id: string | number;
// //   name?: string;
// //   title?: string;
// //   image?: string;
// //   color?: string;
// //   size?: string;
// //   quantity: number;
// //   price: number;
// //   discount?: number;
// // };

// // type ReusableCartTableProps = {
// //   headers?: string[];
// //   items: CartItem[];
// //   onRemove?: (id: string | number) => void;
// //   onSaveForLater?: (id: string | number) => void;
// //   onQuantityChange?: (id: string | number, quantity: number) => void;
// // };

// const COLOR_MAP = {
//   '#000000': 'Black',
//   '#FFFFFF': 'White',
//   '#FF0000': 'Red',
//   '#00FF00': 'Green',
//   '#0000FF': 'Blue',
//   '#FFFF00': 'Yellow',
//   '#00FFFF': 'Cyan',
//   '#FF00FF': 'Magenta',
//   '#C0C0C0': 'Silver',
//   '#808080': 'Gray',
//   '#800000': 'Maroon',
//   '#808000': 'Olive',
//   '#800080': 'Purple',
//   '#008080': 'Teal',
//   '#000080': 'Navy',
//   '#FFA500': 'Orange',
//   '#FFC0CB': 'Pink',
//   '#A52A2A': 'Brown',
//   '#FFD700': 'Gold',
// };

// const getColorName = (hex) => {
//   if (!hex) return 'Not specified';
//   const normalizedHex = hex.startsWith('#') ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
//   return COLOR_MAP[normalizedHex] || hex;
// };

// const formatPrice = (price) =>
//   new Intl.NumberFormat('en-NG', {
//     style: 'currency',
//     currency: 'NGN',
//     minimumFractionDigits: 0,
//   }).format(price);

// const displayValue = (value) =>
//   value === null || value === undefined || value === '' ? 'Not specified' : value;

// const ReusableCartTable = ({
//   headers = ['Item Details', 'Quantity', 'Price', 'Actions'],
//   items,
//   onRemove = () => {},
//   onSaveForLater = () => {},
//   onQuantityChange = () => {},
// }) => {
//   const incrementQuantity = (item) => {
//     onQuantityChange(item.id, item.quantity + 1);
//   };

//   const decrementQuantity = (item) => {
//     if (item.quantity > 1) {
//       onQuantityChange(item.id, item.quantity - 1);
//     }
//   };

//   return (
//     <div className="cart-container">
//       <div className="cart-header">
//         <h2>Cart ({items.length} items)</h2>
//       </div>
//       <table className="cart-table">
//         <thead>
//           <tr>
//             {headers.map((header, index) => (
//               <th key={index} className={index === 0 ? 'item-column' : ''}>
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(item => (
//             <tr key={item.id} className="cart-item">
//               <td className="item-details">
//                 <div className="item-info">
//                   <img
//                     src={item.image || '/placeholder.jpg'}
//                     onError={(e) => {
//                       e.target.src = '/placeholder.jpg';
//                     }}
//                     alt="Product image"
//                     className="product-image"
//                   />
//                   <div className="item-description">
//                     <p className="item-name">{item.name || item.title || 'Product'}</p>
//                     <p className="item-color">Color. {getColorName(item.color)}</p>
//                     <p className="item-size">Size. {displayValue(item.size)}</p>
//                   </div>
//                 </div>
//               </td>
//               <td className="quantity-column">
//                 <div className="quantity-controls">
//                   <button onClick={() => decrementQuantity(item)} className="quantity-btn">−</button>
//                   <span className="quantity-value">{item.quantity}</span>
//                   <button onClick={() => incrementQuantity(item)} className="quantity-btn">+</button>
//                 </div>
//               </td>
//               <td className="price-column">
//                 <div className="price-info">
//                   <p className="item-price">{formatPrice(item.price)}</p>
//                   {item.discount && <p className="item-discount">{formatPrice(item.discount)}</p>}
//                 </div>
//               </td>
//               <td className="action-column">
//                 <div className="action-buttons">
//                   <button onClick={() => onRemove(item.id)} className="remove-btn">Remove Item</button>
//                   <button onClick={() => onSaveForLater(item.id)} className="save-btn">Save for Later</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReusableCartTable;

'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiTrash2, FiHeart } from 'react-icons/fi';
import { Figtree } from 'next/font/google';
import { Divider } from '@mui/material';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const COLOR_MAP = {
  '#000000': 'Black',
  '#FFFFFF': 'White',
  '#FF0000': 'Red',
  '#00FF00': 'Green',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#00FFFF': 'Cyan',
  '#FF00FF': 'Magenta',
  '#C0C0C0': 'Silver',
  '#808080': 'Gray',
  '#800000': 'Maroon',
  '#808000': 'Olive',
  '#800080': 'Purple',
  '#008080': 'Teal',
  '#000080': 'Navy',
  '#FFA500': 'Orange',
  '#FFC0CB': 'Pink',
  '#A52A2A': 'Brown',
  '#FFD700': 'Gold',
};

const getColorName = (hex) => {
  if (!hex) return 'Not specified';
  const normalizedHex = hex.startsWith('#') ? hex.toUpperCase() : `#${hex.toUpperCase()}`;
  return COLOR_MAP[normalizedHex] || hex;
};

const formatPrice = (price) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);

const ReusableCartTable = ({
  items = [],
  onRemove = () => {},
  onSaveForLater = () => {},
  onQuantityChange = () => {},
}) => {
  const safeItems = Array.isArray(items) ? items : [];
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const incrementQuantity = (item) => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };
 if (isMobile) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col gap-0">
          {safeItems.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="flex flex-col bg-white border border-gray-200 rounded-lg mb-2"
            >
              {/* Product Image */}
              <div className="flex items-start gap-3 py-4 px-4">
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={item.image || '/placeholder.jpg'}
                    alt={item.name || 'Product'}
                    className="w-full h-full object-cover"
                  />
                </div>
              
                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className={`font-medium text-sm text-[#061410] leading-tight ${figtree.className}`}>
                    {item.name || 'Golden Yellow Butterfly Bodycon Dress'}
                  </h3>
                  
                  <div className="flex gap-4 text-xs text-gray-600 mt-1">
                    <span className='text-[#667085] font-normal text-[13px]'>Colour • <span className="text-[#061410] font-normal text-sm">{getColorName(item.color) || 'Black'}</span></span>
                    <span className='text-[#667085] font-normal text-[13px]'>Size • <span className="text-[#061410] font-normal text-sm">{item.size || '12'}</span></span>
                  </div>
                  
                  <p className="font-bold text-base text-black mt-2">
                    {formatPrice(item.price || 240000)}
                  </p>
                </div>
              </div>
                
                {/* Quantity and Actions Row */}
                <Divider className="w-full" />
                <div className="flex items-center justify-between px-4 py-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-md text-[#F2F4F7]">
                    <button 
                      onClick={() => decrementQuantity(item)} 
                      className="w-8 h-8 flex items-center text-[#343330] justify-center text-lg font-medium hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-normal text-[#000000]">{item.quantity}</span>
                    <button 
                      onClick={() => incrementQuantity(item)} 
                      className="w-8 h-8 flex items-center text-[#343330] justify-center text-lg font-medium hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => onSaveForLater(item.id)} 
                      className="flex items-center gap-1 text-sm font-semibold text-[#191818] hover:text-black"
                    >
                      <FiHeart size={14} color='#191818' />
                      Favourite
                    </button>
                    
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="flex items-center gap-1 text-sm text-[#191818] font-semibold hover:text-red-600"
                    >
                      <FiTrash2 size={14} color='#191818' />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      
    );
  }


  return (
    // <div className=" px-4 border border-red-500 w-[748px] h-[497px]">
    <div className="px-4 w-[748px] h-[497px] overflow-y-auto">
      {/* <div className="border-b pb-3 mb-4">
        <h2 className="text-2xl font-bold text-[#061410]">Cart ({items.length} items)</h2>
      </div> */}
      
      <div className="flex flex-col gap-4 ">
        {safeItems.map((item, index) => (
          <div key={`${item.id}-${index}`} 
          // className="flex items-start justify-between py-4 border-b gap-4"
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between py-4 border-b gap-4"
          >
            <div className="w-20 h-24 shrink-0">
              <img
                src={item.image || '/placeholder.jpg'}
                alt={item.name || 'Product'}
                className="w-[83px] h-[84.35px] object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex-grow">
              <h3 className={`font-normal text-sm text-[#061410] ${figtree.className}`}>{item.name || ''}</h3>
              <div className="flex gap-2 text-sm text-gray-600 mt-1">
                <p className='text-[#667085] text-[13px]'>Colour: <span className="font-normal text-sm text-[#061410]">{getColorName(item.color) || 'Black'}</span></p>
                <p className='text-[#667085] text-[13px] font-normal'>Size: <span className="text-sm font-normal text-[#061410]">{item.size || '12'}</span></p>
              </div>
              <p className="font-bold text-base text-[#000000] mt-2">{formatPrice(item.price || 40000)}</p>
            </div>
            
            {/* Quantity Controls */}
            <div className='flex flex-col gap-2 items-end'>
              <div className="flex items-center text-black">
                <button 
                  onClick={() => decrementQuantity(item)} 
                  className="w-8 h-8 flex items-center justify-center text-xl font-medium"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button 
                  onClick={() => incrementQuantity(item)} 
                  className="w-8 h-8 flex items-center justify-center text-xl font-medium"
                >
                  +
                </button>
              </div>
            
              <div className="flex ml-6 ">
                <button 
                  onClick={() => onRemove(item.id) }
                  className="p-2 text-[#191818]"
                  aria-label="Remove item"
                >
                  <FiTrash2 />
                </button>
                <button 
                  onClick={() => onSaveForLater(item.id)} 
                  className="p-2 text-[#191818]"
                  aria-label="Save for later"
                >
                  <FiHeart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableCartTable;
