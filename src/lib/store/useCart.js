import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [],
            savedForLater: [],

            // Sync cart items from API response
            setCartItems: (items) => {
                console.log('🔄 Setting cart items:', items);
                set({ cartItems: Array.isArray(items) ? items : [] });
            },

            // Add to cart (optimistic update)
            addToCart: (item) => {
                const { cartItems } = get();
                const existingItemIndex = cartItems.findIndex(
                    cartItem => cartItem.id === item.id &&
                        cartItem.size === item.size &&
                        cartItem.color === item.color
                );

                if (existingItemIndex >= 0) {
                    const updatedItems = [...cartItems];
                    updatedItems[existingItemIndex].quantity += item.quantity || 1;
                    set({ cartItems: updatedItems });
                } else {
                    set({ cartItems: [...cartItems, { ...item, quantity: item.quantity || 1 }] });
                }
            },

            // Remove from cart (optimistic update)
            removeFromCart: (productId) => {
                const { cartItems } = get();
                const updatedItems = cartItems.filter(item => {
                    const itemId = item.product?._id || item.id;
                    return itemId !== productId;
                });
                set({ cartItems: updatedItems });
            },

            // Update quantity (optimistic update)
            updateCartItemQuantity: (productId, newQuantity) => {
                const { cartItems } = get();
                const quantity = parseInt(newQuantity);

                if (isNaN(quantity) || quantity < 1) return;

                const updatedItems = cartItems.map(item => {
                    const itemId = item.product?._id || item.id;
                    return itemId === productId ? { ...item, quantity } : item;
                });
                set({ cartItems: updatedItems });
            },

            clearCart: () => {
                console.log('🧹 Clearing cart');
                set({ cartItems: [], savedForLater: [] });
            },

            saveForLater: (productId) => {
                const { cartItems, savedForLater } = get();
                const itemToSave = cartItems.find(item => {
                    const itemId = item.product?._id || item.id;
                    return itemId === productId;
                });

                if (itemToSave) {
                    const updatedCart = cartItems.filter(item => {
                        const itemId = item.product?._id || item.id;
                        return itemId !== productId;
                    });

                    set({
                        cartItems: updatedCart,
                        savedForLater: [...savedForLater, itemToSave]
                    });
                }
            },

            moveToCart: (productId) => {
                const { cartItems, savedForLater } = get();
                const itemToMove = savedForLater.find(item => {
                    const itemId = item.product?._id || item.id;
                    return itemId === productId;
                });

                if (itemToMove) {
                    const updatedSaved = savedForLater.filter(item => {
                        const itemId = item.product?._id || item.id;
                        return itemId !== productId;
                    });
                    const updatedCart = [...cartItems, itemToMove];

                    set({
                        savedForLater: updatedSaved,
                        cartItems: updatedCart
                    });
                }
            },

            getCartTotal: () => {
                const { cartItems } = get();
                return cartItems.reduce((total, item) => {
                    let itemPrice = 0;

                    if (item.product?.price?.$numberDecimal) {
                        itemPrice = parseFloat(item.product.price.$numberDecimal);
                    } else if (item.price) {
                        itemPrice = parseFloat(item.price);
                    }

                    return total + (itemPrice * item.quantity);
                }, 0);
            },

            getTotalQuantity: () => {
                const { cartItems } = get();
                return cartItems.reduce((total, item) => total + item.quantity, 0);
            },

            isItemInCart: (productId) => {
                const { cartItems } = get();
                return cartItems.some((item) => {
                    const itemId = item.product?._id || item.id;
                    return itemId === productId;
                });
            },

            getCartItem: (productId) => {
                const { cartItems } = get();
                return cartItems.find((item) => {
                    const itemId = item.product?._id || item.id;
                    return itemId === productId;
                });
            },

            getCartItemCount: () => {
                const { cartItems } = get();
                return cartItems.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({
                cartItems: Array.isArray(state.cartItems) ? state.cartItems : [],
                savedForLater: Array.isArray(state.savedForLater) ? state.savedForLater : [],
            }),
        }
    )
);