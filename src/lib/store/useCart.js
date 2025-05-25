import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { syncGuestCart } from '../../lib/utils/syncGuestCarts';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      savedForLater: [],
      setCartItems: (items) => set({ cartItems: items }),
      
      // Add item to cart
      // addToCart: (item) => {
      //   let { cartItems } = get();
      //   if (!Array.isArray(cartItems)) {
      //     cartItems = [];
      //   };
      //   const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        
      //   if (existingItem) {
      //     // If item exists, update quantity
      //     set({
      //       cartItems: cartItems.map(cartItem => 
      //         cartItem.id === item.id 
      //           ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
      //           : cartItem
      //       )
      //     });
      //   } else {
      //     // If new item, add to cart
      //     set({ 
      //       cartItems: [...cartItems, { ...item, quantity: item.quantity || 1 }] 
      //     });
      //   }
      // },
      addToCart: async (item) => {
  let { cartItems } = get();
  if (!Array.isArray(cartItems)) cartItems = [];

  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  const token = localStorage.getItem('authToken');

  if (existingItem) {
    const updatedCart = cartItems.map(cartItem =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
        : cartItem
    );

    set({ cartItems: updatedCart });
    syncGuestCart(updatedCart);

    if (token) {
      try {
        await fetch(`https://mandelazz-webapp.azurewebsites.net/api/cart/update/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: existingItem.quantity + (item.quantity || 1) })
        });
      } catch (err) {
        console.error('Failed to update cart item on backend:', err);
      }
    }
  } else {
    const newCart = [...cartItems, { ...item, quantity: item.quantity || 1 }];
    set({ cartItems: newCart });

    if (token) {
      try {
        await fetch('https://mandelazz-webapp.azurewebsites.net/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: item.id, qty: item.quantity || 1 }),
        });
      } catch (err) {
        console.error('Failed to add item to cart on backend:', err);
      }
    }
  }
},

      
      // Remove item from cart
      removeFromCart: (id) => {
        const { cartItems } = get();
        set({
          cartItems: cartItems.filter(item => item.id !== id)
        });
      },
      
      // Update quantity of an item
      updateCartItemQuantity: (id, newQuantity) => {
        const { cartItems } = get();
        
        // Ensure quantity is valid
        const quantity = parseInt(newQuantity);
        if (isNaN(quantity) || quantity < 1) return;
        
        set({
          cartItems: cartItems.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        });
      },
      
      // Clear cart
      clearCart: () => set({ cartItems: [] }),
      
      // Save item for later
      saveForLater: (id) => {
        const { cartItems, savedForLater } = get();
        const itemToSave = cartItems.find(item => item.id === id);
        
        if (itemToSave) {
          set({
            cartItems: cartItems.filter(item => item.id !== id),
            savedForLater: [...savedForLater, itemToSave]
          });
        }
      },
      
      // Move saved item back to cart
      moveToCart: (id) => {
        const { cartItems, savedForLater } = get();
        const itemToMove = savedForLater.find(item => item.id === id);
        
        if (itemToMove) {
          set({
            savedForLater: savedForLater.filter(item => item.id !== id),
            cartItems: [...cartItems, itemToMove]
          });
        }
      },
      
      // Get cart total
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => 
          total + (item.price * item.quantity), 0);
      },
      
      // Get cart item count
      getCartItemCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage', // unique name for localStorage
      getStorage: () => localStorage,
      partialize: (state) => ({
        ...state,
        cartItems: Array.isArray(state.cartItems) ? state.cartItems : [],
        savedForLater: Array.isArray(state.savedForLater) ? state.savedForLater : [],
      }),

    }
  )
);