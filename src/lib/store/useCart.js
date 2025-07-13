import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // Method 1: Separate local and API methods (RECOMMENDED)
      
      // For local state updates only (no API calls)
      addToCartLocally: (item) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (cartItem) => 
              cartItem.id === item.id && 
              cartItem.size === item.size && 
              cartItem.color === item.color
          );

          let newItems;
          if (existingItemIndex >= 0) {
            // Update existing item quantity
            newItems = state.items.map((cartItem, index) => 
              index === existingItemIndex 
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            );
          } else {
            // Add new item
            newItems = [...state.items, item];
          }

          const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const newTotalPrice = newItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

          return {
            items: newItems,
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
          };
        });
      },

      // Your existing addToCart method for API calls (keep for backward compatibility)
      addToCart: async (item, options = {}) => {
        const { skipAPI = false } = options;
        
        // If skipAPI is true, only update local state
        if (skipAPI) {
          get().addToCartLocally(item);
          return;
        }

        // Your existing API logic here
        try {
          // Make API call
          const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add auth headers if needed
            },
            body: JSON.stringify({
              productId: item.id,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to add item to cart');
          }

          const data = await response.json();
          
          // Update local state after successful API call
          get().addToCartLocally(item);
          
          return data;
        } catch (error) {
          console.error('Error adding to cart:', error);
          throw error;
        }
      },

      // Remove item from cart
      removeFromCart: (itemId, size, color) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => !(item.id === itemId && item.size === size && item.color === color)
          );
          
          const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const newTotalPrice = newItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

          return {
            items: newItems,
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
          };
        });
      },

      // Update item quantity
      updateQuantity: (itemId, size, color, newQuantity) => {
        if (newQuantity <= 0) {
          get().removeFromCart(itemId, size, color);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === itemId && item.size === size && item.color === color
              ? { ...item, quantity: newQuantity }
              : item
          );

          const newTotalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
          const newTotalPrice = newItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

          return {
            items: newItems,
            totalItems: newTotalItems,
            totalPrice: newTotalPrice,
          };
        });
      },

      // Clear cart
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },

      // Get cart item count
      getItemCount: () => {
        return get().totalItems;
      },

      // Get cart total
      getCartTotal: () => {
        return get().totalPrice;
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage
      getStorage: () => sessionStorage, // or sessionStorage
    }
  )
);

export { useCartStore };