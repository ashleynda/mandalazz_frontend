'use client';

import { useEffect } from 'react';
import ReusableCartTable from '../reusables/CartTable';
import { useCartStore } from '../../lib/store/useCart'; 
import OrderSummary from '../checkout/OrderSummary';
import Favourites from '../../component/favourites'; 
import useFetchCartQuery from "../../lib/hooks/useFetchCartMutation"; // Adjust the import path as necessary
import useRemoveFromCart from "../../lib/hooks/useRemoveFromCart"; 
import RecentlyViewed from '../../component/recentlyViewed'; 

// import Layout from '@/components/Layout';
// import ReusableCartTable from '../../../component/reusables/CartTable';
// import { useCartStore } from '@/store/cart'; // assuming you have a Zustand store or similar
// import { shallow } from 'zustand/shallow';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity);
  const { data,  isLoading, error } = useFetchCartQuery();
  const { mutate: removeItem, isPending, isError } = useRemoveFromCart();
  const setCartItems = useCartStore((state) => state.setCartItems); // Zustand setter for syncing
  // const { mutate: addToFav } = useAddToFavorites();
console.log('Cart items:', cartItems);
console.log("🧾 Cart from API:", data?.message?.cart);
console.log("jfn", data)

console.log("📦 FULL data:", data);

  useEffect(() => {
    if (data?.message?.cart) {
      setCartItems(data.message.cart.items); // <- A Zustand setter for syncing
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart: {error.message}</div>;

  const handleRemove = (productId) => {
    removeItem({ productId }, {
      onSuccess: () => {
        removeFromCart(productId);
      },
      onError: (error) => {
      console.error("❌ Failed to remove from server:", error.message);
    },
    });
  };

  const handleSaveForLater = (id) => {
    console.log('Saving for later:', id);
  };

  // const handleQuantityChange = (id) => {
  //   const updated = cartItems.map(item =>
  //     item.id === id ? { ...item, quantity: newQty } : item
  //   );
  //   // Replace cartItems (you need to update this based on how your store works)
  //   console.warn('⚠️ Quantity updated in UI only. Sync with store if needed:', updated);
  // };
   const handleQuantityChange = (productId, newQty) => {
    updateCartItemQuantity(productId, newQty);
  };

  const headers = ['Item Details', 'Quantity', 'Price', 'Actions'];

  // useEffect(() => {
  //   console.log('Cart items:', cartItems);
  // }, [cartItems]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-7">
      <h1 className="text-2xl font-bold text-[#061410]">Cart ({cartItems.length} items)</h1>
        
      <div className="flex flex-col lg:flex-row gap-8 mt-2 ">
        {/* Cart Table */}
        <div className='flex flex-col lg:flex-col gap-8 w-[748px] '>
          <div className="flex-1 bg-white ">
            <ReusableCartTable
              headers={headers}
              items={cartItems}
              // onQuantityChange={(id, newQty) => handleQuantityChange(id, newQty)}
              onQuantityChange={handleQuantityChange}
              showImageColumn={true}
              onRemove={handleRemove}
              onSaveForLater={handleSaveForLater}
            />
          </div>
          <div >
            <Favourites />
          </div>
          <div >
            <RecentlyViewed />
          </div>
        </div>
        
        {/* Order Summary */}
        {data?.message?.cart && (
          <div className="hidden lg:block lg:w-80">
            <OrderSummary cart={data.message.cart}/>
          </div>
        )}
      </div>
    </div>
  
  );
};

export default Cart;


