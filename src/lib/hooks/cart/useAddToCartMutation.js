import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAuthenticated, getAuthToken } from '../../utils/authUtils';

const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartData) => {
      const authenticated = isAuthenticated();
      const token = getAuthToken();

      const payload = {
        productId: cartData.productId,
        quantity: cartData.quantity || 1,
        ...(cartData.size ? { size: String(cartData.size).toLowerCase() } : {}),
        ...(cartData.color ? { color: cartData.color.toLowerCase() } : {}),
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      if (authenticated && token) {
        headers.Authorization = `Bearer ${token}`;
      }

      console.log('📦 Adding to cart with payload:', payload);

      const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/cart/add', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials: 'include', // ✅ Essential for using server session
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('❌ Add to cart failed:', result);
        throw new Error(result.message || "Failed to add item to cart");
      }

      console.log('✅ Item added to cart successfully:', result);
      return result;
    },
    onSuccess: (data) => {
      console.log('✅ Add to cart mutation successful:', data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('❌ Add to cart mutation failed:', error);
    },
  });
};

export default useAddToCartMutation;
