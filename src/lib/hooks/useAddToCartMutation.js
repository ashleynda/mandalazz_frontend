// src/lib/hooks/useAddToCartMutation.js
import { useMutation } from '@tanstack/react-query';

const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: async (cartData) => {
      const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/cart/add', {
        method: 'POST',
        headers: {
        //   Authorization: `Bearer ${token}`,
         ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      return response.json();
    },
  });
};

export default useAddToCartMutation;
