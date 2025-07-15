// store/useCart.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            cartItems: [],
            totalAmount: 0,

            // Set cart items from API response
            setCartItems: (items) => {
                const processedItems = items.map(item => ({
                    id: item.product._id || item.product,
                    productId: item.product._id || item.product,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                    name: item.product.name || 'Unknown Product',
                    image: item.product.images?.[0] || item.product.variations?.[0]?.images?.[0] || '',
                    price: item.product.price?.$numberDecimal || item.product.price || "0.00",
                    description: item.product.description || "No description",
                    stock: item.product.stock || 0,
                }));

                set({ cartItems: processedItems });
                get().calculateTotal();
            },

            // Add item to cart (local state)
            addToCart: (item) => {
                const { cartItems } = get();
                const existingItem = cartItems.find(
                    (cartItem) =>
                        cartItem.id === item.id &&
                        cartItem.size === item.size &&
                        cartItem.color === item.color
                );

                let newCartItems;
                if (existingItem) {
                    newCartItems = cartItems.map((cartItem) =>
                        cartItem.id === item.id &&
                        cartItem.size === item.size &&
                        cartItem.color === item.color
                            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                            : cartItem
                    );
                } else {
                    newCartItems = [...cartItems, item];
                }

                set({ cartItems: newCartItems });
                get().calculateTotal();

                // For guests, also save to localStorage
                if (typeof window !== 'undefined') {
                    const token = sessionStorage.getItem('authToken');
                    if (!token) {
                        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
                    }
                }
            },

            // Remove item from cart (local state)
            removeFromCart: (productId) => {
                const newCartItems = get().cartItems.filter((item) => item.id !== productId);
                set({ cartItems: newCartItems });
                get().calculateTotal();

                // For guests, also update localStorage
                if (typeof window !== 'undefined') {
                    const token = sessionStorage.getItem('authToken');
                    if (!token) {
                        if (newCartItems.length === 0) {
                            localStorage.removeItem('cartItems');
                        } else {
                            localStorage.setItem('cartItems', JSON.stringify(newCartItems));
                        }
                    }
                }
            },


            // Update item quantity (local state)
            updateCartItemQuantity: (productId, newQuantity) => {
                if (newQuantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }

                const newCartItems = get().cartItems.map((item) =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                );

                set({ cartItems: newCartItems });
                get().calculateTotal();

                // For guests, also update localStorage
                if (typeof window !== 'undefined') {
                    const token = sessionStorage.getItem('authToken');
                    if (!token) {
                        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
                    }
                }
            },

            // Clear entire cart
            clearCart: () => {
                set({ cartItems: [], totalAmount: 0 });

                // Also clear localStorage for guests
                if (typeof window !== 'undefined') {
                    const token = sessionStorage.getItem('authToken');
                    if (!token) {
                        localStorage.removeItem('cartItems');
                    }
                }
            },

            // Calculate total amount
            calculateTotal: () => {
                const { cartItems } = get();
                const total = cartItems.reduce((sum, item) => {
                    const price = parseFloat(item.price) || 0;
                    return sum + (price * item.quantity);
                }, 0);
                set({ totalAmount: total });
            },

            // Get cart count - FIXED VERSION
            getCartCount: () => {
                if (typeof window === 'undefined') return 0;

                const token = sessionStorage.getItem('authToken');

                if (token) {
                    // Logged in — use Zustand state
                    return get().cartItems.reduce((count, item) => count + (item.quantity || 0), 0);
                } else {
                    // Guest — use both Zustand state AND localStorage as fallback
                    const zustandCount = get().cartItems.reduce((count, item) => count + (item.quantity || 0), 0);

                    // If Zustand has items, use that
                    if (zustandCount > 0) {
                        return zustandCount;
                    }

                    // Otherwise, fallback to localStorage
                    try {
                        const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
                        return localCart.reduce((count, item) => count + (item.quantity || 0), 0);
                    } catch (error) {
                        console.error('Error reading cart from localStorage:', error);
                        return 0;
                    }
                }
            },

            // Load cart from localStorage for guests
            loadGuestCart: () => {
                if (typeof window === 'undefined') return;

                const token = sessionStorage.getItem('authToken');
                if (!token) {
                    try {
                        const localCart = JSON.parse(localStorage.getItem('cartItems')) || [];
                        if (localCart.length > 0) {
                            set({ cartItems: localCart });
                            get().calculateTotal();
                        }
                    } catch (error) {
                        console.error('Error loading guest cart:', error);
                    }
                }
            },

            // Find item in cart
            findCartItem: (productId, size, color) => {
                return get().cartItems.find(
                    item => item.id === productId && item.size === size && item.color === color
                );
            },
        }),
        {
            name: 'cart-storage',
            // Store full cart data for guests
            partialize: (state) => ({
                cartItems: state.cartItems,
                totalAmount: state.totalAmount
            }),
        }
    )
);

export { useCartStore };