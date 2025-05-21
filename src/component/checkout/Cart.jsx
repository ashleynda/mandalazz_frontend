'use client';

import { useEffect } from 'react';
import ReusableCartTable from '../reusables/CartTable';
import { useCartStore } from '../../lib/store/useCart'; 
import OrderSummary from '../checkout/OrderSummary';
import Favourites from '../../component/favourites'; 

// import Layout from '@/components/Layout';
// import ReusableCartTable from '../../../component/reusables/CartTable';
// import { useCartStore } from '@/store/cart'; // assuming you have a Zustand store or similar
// import { shallow } from 'zustand/shallow';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity);

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleSaveForLater = (id) => {
    console.log('Saving for later:', id);
  };

  const handleQuantityChange = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    // Replace cartItems (you need to update this based on how your store works)
    console.warn('⚠️ Quantity updated in UI only. Sync with store if needed:', updated);
  };

  const headers = ['Item Details', 'Quantity', 'Price', 'Actions'];

  useEffect(() => {
    console.log('Cart items:', cartItems);
  }, [cartItems]);

  return (
    // <div className='flex'>
    //   <div className=" mx-auto overflow-hidden mt-44">
    //     <ReusableCartTable
    //       headers={headers}
    //       items={cartItems}
    //       onRemove={handleRemove}
    //       onSaveForLater={handleSaveForLater}
    //       onQuantityChange={handleQuantityChange}
    //     />
    //   </div>
    //   <OrderSummary />
    // </div>
    
      // <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mx-auto mt-44 px-4">
      //   {/* Cart Table */}
      //   <div className="flex-1">
      //     <ReusableCartTable
      //       headers={headers}
      //       items={cartItems}
      //       onRemove={handleRemove}
      //       onSaveForLater={handleSaveForLater}
      //       onQuantityChange={handleQuantityChange}
      //     />
      //   </div>
    
      //   {/* Order Summary */}
      //   <div className="lg:w-80">
      //     <OrderSummary />
      //   </div>
      // </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Cart Header */}
      <h1 className="text-2xl font-bold text-[#061410]">Cart ({cartItems.length} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 mt-2 ">
        {/* Cart Table */}
        <div className='flex flex-col lg:flex-col gap-8'>
          <div className="flex-1 bg-white">
            <ReusableCartTable
              headers={headers}
              items={cartItems}
              onQuantityChange={(id, newQty) => handleQuantityChange(id, newQty)}
              showImageColumn={true} // Assuming your component supports this prop
            />
          </div>
          <div>
            <Favourites />
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <OrderSummary />
        </div>
      </div>
    </div>
  
  );
};

export default Cart;


// 'use client';

// import { useEffect } from 'react';
// import { useCartStore } from '../../lib/store/useCart'; 
// import ReusableCartTable from '../reusables/CartTable';

// export default function Cart() {
//   // Get cart methods from Zustand store
//   const cartItems = useCartStore((state) => state.cartItems);
//   const removeFromCart = useCartStore((state) => state.removeFromCart);
//   const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity);
  
//   const handleRemove = (id) => {
//     removeFromCart(id);
//   };

//   const handleSaveForLater = (id) => {
//     console.log('Save for later functionality:', id);
//     // You can implement this later
//   };

//   const handleQuantityChange = (id, newQty) => {
//     updateCartItemQuantity(id, newQty);
//   };

//   const headers = ['Item Details', 'Quantity', 'Price', 'Actions'];
  
//   // Calculate total
//   const cartTotal = cartItems.reduce((total, item) => 
//     total + (item.price * item.quantity), 0);

//   // Debugging
//   useEffect(() => {
//     console.log('Cart items:', cartItems);
//   }, [cartItems]);

//   return (
//     <div className="max-w-7xl mx-auto overflow-hidden mt-16 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
//       {cartItems.length > 0 ? (
//         <>
//           <ReusableCartTable
//             headers={headers}
//             items={cartItems}
//             onRemove={handleRemove}
//             onSaveForLater={handleSaveForLater}
//             onQuantityChange={handleQuantityChange}
//           />
          
//           <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//             <div className="flex justify-between text-lg font-medium">
//               <span>Total:</span>
//               <span>${cartTotal.toFixed(2)}</span>
//             </div>
//             <div className="mt-4 flex justify-end">
//               <button 
//                 className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 onClick={() => window.location.href = '/checkout'}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="text-center py-16 bg-gray-50 rounded-lg">
//           <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
//           <p className="mb-6">Add items to your cart to see them here.</p>
//           <a href="/" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             Continue Shopping
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }