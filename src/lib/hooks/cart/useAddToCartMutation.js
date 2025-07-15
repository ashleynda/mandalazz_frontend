import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../../api/cartApi';

const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: async (cartData) => {
      const response = await cartApi.addToCart(cartData);
      return response.data;
    },
    onError: (error) => {
      console.error('Add to cart error:', error);
    },
  });
};

export default useAddToCartMutation;