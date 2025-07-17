'use client';

import { useEffect, useState } from 'react';
import ReusableCartTable from '../reusables/CartTable';
import { useCartStore } from '../../lib/store/useCart';
import OrderSummary from '../checkout/OrderSummary';
import Favourites from '../../component/favourites';
import useFetchCartQuery from "../../lib/hooks/cart/useFetchCartMutation";
import useRemoveFromCart from "../../lib/hooks/cart/useRemoveFromCart";
import useUpdateCartQuantity from "../../lib/hooks/cart/useUpdateToCartMutation";
import RecentlyViewed from '../../component/recentlyViewed';

const Cart = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const updateCartItemQuantity = useCartStore((state) => state.updateCartItemQuantity);
    const setCartItems = useCartStore((state) => state.setCartItems);

    const { data, isLoading, error, refetch } = useFetchCartQuery();
    const { mutate: removeFromCartMutation } = useRemoveFromCart();
    const { mutate: updateQuantityMutation } = useUpdateCartQuantity();

    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
    const [isRemovingItem, setIsRemovingItem] = useState(false);

    console.log('🛒 Local cart items:', cartItems);
    console.log("🌐 API cart data:", data);
    console.log("🔍 Full API response structure:", JSON.stringify(data, null, 2));

    // Sync with API cart data - Fixed the data access path
    useEffect(() => {
        console.log("🔄 Syncing effect triggered with data:", data);

        // Check multiple possible locations for cart items
        let apiCartItems = null;

        if (data?.cart?.items) {
            apiCartItems = data.cart.items;
            console.log("📍 Found cart items in data.cart.items:", apiCartItems);
        } else if (data?.message?.cart?.items) {
            apiCartItems = data.message.cart.items;
            console.log("📍 Found cart items in data.message.cart.items:", apiCartItems);
        } else if (data?.data?.cart?.items) {
            apiCartItems = data.data.cart.items;
            console.log("📍 Found cart items in data.data.cart.items:", apiCartItems);
        } else {
            console.log("❌ No cart items found in any expected location");
            console.log("🔍 Available data keys:", Object.keys(data || {}));
        }

        if (apiCartItems) {
            console.log("✅ Syncing with API cart items:", apiCartItems);

            // Only update if the API cart items are different from local cart items
            if (JSON.stringify(apiCartItems) !== JSON.stringify(cartItems)) {
                setCartItems(apiCartItems);
            }
        } else if (data && Array.isArray(data.cart?.items) && data.cart.items.length === 0) {
            // If API returns empty cart, clear local cart
            console.log("🔄 Setting cart items: Array(0)");
            setCartItems([]);
        }
    }, [data, setCartItems]); // Removed cartItems from dependency to avoid infinite loops

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading cart: {error.message}</div>;
    const handleRemove = async (item) => {
  const productId = item?.product?._id || item?.id;
  if (!productId) {
    console.warn("❌ Product ID not found for removal");
    return;
  }

  console.log('🗑️ Attempting to remove item:', productId);
  setIsRemovingItem(true);

  // Optimistic local state update
  removeFromCart(productId);

  removeFromCartMutation(
    { productId },
    {
      onSuccess: () => {
        console.log("✅ Item removed from cart:", productId);
        refetch();
      },
      onError: (error) => {
        console.error("❌ Failed to remove from cart:", error.message);
        alert(`Failed to remove item: ${error.message}`);
        refetch(); // Revert optimistic update
      },
      onSettled: () => {
        setIsRemovingItem(false);
      }
    }
  );
};


    // const handleRemove = async () => {
    //     console.log('🗑️ Attempting to remove item:', productId);
    //     setIsRemovingItem(true);

    //     // Optimistic update
    //     removeFromCart(productId);

    //     removeFromCartMutation(
    //         { productId },
    //         {
    //             onSuccess: () => {
    //                 console.log("✅ Item removed from cart:", productId);
    //                 refetch();
    //             },
    //             onError: (error) => {
    //                 console.error("❌ Failed to remove from cart:", error.message);
    //                 alert(`Failed to remove item: ${error.message}`);
    //                 // Revert optimistic update by refetching
    //                 refetch();
    //             },
    //             onSettled: () => {
    //                 setIsRemovingItem(false);
    //             }
    //         }
    //     );
    // };

    const handleSaveForLater = (id) => {
        console.log('Saving for later:', id);
    };

    const handleQuantityChange = async (productId, newQty) => {
        console.log('🔄 Updating quantity for product:', productId, 'to:', newQty);
        setIsUpdatingQuantity(true);

        // Optimistic update
        updateCartItemQuantity(productId, newQty);

        updateQuantityMutation(
            { productId, quantity: newQty },
            {
                onSuccess: () => {
                    console.log("✅ Quantity updated successfully");
                    refetch();
                },
                onError: (error) => {
                    console.error("❌ Failed to update quantity:", error.message);
                    alert(`Failed to update quantity: ${error.message}`);
                    // Revert optimistic update by refetching
                    refetch();
                },
                onSettled: () => {
                    setIsUpdatingQuantity(false);
                }
            }
        );
    };

    const headers = ['Item Details', 'Quantity', 'Price', 'Actions'];

    const calculateLocalTotal = () => {
        if (!cartItems || cartItems.length === 0) return 0;
        return cartItems.reduce((total, item) => {
            const itemPrice = item.product?.price?.$numberDecimal
                ? parseFloat(item.product.price.$numberDecimal)
                : 0;
            return total + (itemPrice * item.quantity);
        }, 0);
    };

    // Fixed displayCartData logic
    const displayCartData = () => {
        if (data?.cart) {
            return data.cart;
        } else if (data?.message?.cart) {
            return data.message.cart;
        } else {
            return {
                items: cartItems,
                totalAmount: {
                    $numberDecimal: calculateLocalTotal().toString()
                }
            };
        }
    };

    const currentCartData = displayCartData();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-7">
            <h1 className="text-2xl font-bold text-[#061410]">
                Cart ({cartItems.length} items)
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 mt-2">
                <div className='flex flex-col lg:flex-col gap-8 w-[748px]'>
                    <div className="flex-1 bg-white">
                        <ReusableCartTable
                            headers={headers}
                            items={cartItems}
                            onQuantityChange={handleQuantityChange}
                            showImageColumn={true}
                            onRemove={handleRemove}
                            onSaveForLater={handleSaveForLater}
                            isUpdating={isUpdatingQuantity}
                            isRemoving={isRemovingItem}
                        />
                    </div>
                    <div><Favourites /></div>
                    <div><RecentlyViewed /></div>
                </div>

                {currentCartData && (
                    <div className="hidden lg:block lg:w-80">
                        <OrderSummary
                            cart={currentCartData}
                            isLoading={isUpdatingQuantity || isRemovingItem}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;