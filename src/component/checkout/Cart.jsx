'use client';

import { useEffect } from 'react';
import ReusableCartTable from '../reusables/CartTable';
import { useCartStore } from '../../lib/store/useCart';
import OrderSummary from '../checkout/OrderSummary';
import Favourites from '../../component/favourites';
import RecentlyViewed from '../../component/recentlyViewed';

import useFetchCartQuery from "../../lib/hooks/cart/useFetchCartMutation";
import useRemoveFromCart from "../../lib/hooks/cart/useRemoveFromCart";
import useUpdateCartMutation from "../../lib/hooks/cart/useUpdateToCartMutation";

const Cart = () => {
    const cartItems = useCartStore(state => state.cartItems);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const updateCartItemQuantity = useCartStore(state => state.updateCartItemQuantity);
    const setCartItems = useCartStore(state => state.setCartItems);

    const { data, isLoading, error } = useFetchCartQuery();
    const { mutate: removeItem } = useRemoveFromCart();

    useEffect(() => {
        if (data?.cart?.items) {
            setCartItems(data.cart.items);
        }
    }, [data, setCartItems]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading cart: {error.message}</div>;
    if (!Array.isArray(cartItems)) return <div>Cart items not loaded properly</div>;

    const handleRemove = (productId) => {
        removeItem({ productId }, {
            onSuccess: () => removeFromCart(productId),
        });
    };

    const handleQuantityChange = (productId, newQty) => {
        updateCartItemQuantity(productId, newQty);
    };

    const handleSaveForLater = (id) => {
        // Placeholder for future "Save for later" logic
        console.log('Saving for later:', id);
    };

    const headers = ['Item Details', 'Quantity', 'Price', 'Actions'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-7">
            <h1 className="text-2xl font-bold text-[#061410]">
                Cart ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
            </h1>

            <div className="flex flex-col lg:flex-row gap-8 mt-2">
                {/* Left Side - Cart Table + Favourites + RecentlyViewed */}
                <div className='flex flex-col gap-8 w-full lg:w-[748px]'>
                    <div className="bg-white">
                        <ReusableCartTable
                            headers={headers}
                            items={cartItems}
                            onQuantityChange={handleQuantityChange}
                            showImageColumn={true}
                            onRemove={handleRemove}
                            onSaveForLater={handleSaveForLater}
                        />
                    </div>
                    <Favourites />
                    <RecentlyViewed />
                </div>

                {/* Right Side - Order Summary */}
                {data?.cart && (
                    <div className="hidden lg:block lg:w-80">
                        <OrderSummary cart={data.cart} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
