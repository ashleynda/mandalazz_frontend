// lib/hooks/cart/useRemoveFromCart.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../../api/cartApi';

const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId }) => {
      // Check if user is logged in
      if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          // For guests, just resolve without API call
          return { success: true, message: 'Item removed from local cart' };
        }
      }

      // For logged-in users, call the API
      const response = await cartApi.removeFromCart({ productId });
      return response.data;
    },
    onSuccess: () => {
      // Only invalidate queries for logged-in users
      if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('authToken');
        if (token) {
          queryClient.invalidateQueries(['cart']);
        }
      }
    },
    onError: (error) => {
      console.error('❌ Remove from cart failed:', error.message);
    },
  });
};

export default useRemoveFromCart;