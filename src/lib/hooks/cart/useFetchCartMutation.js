// lib/hooks/cart/useFetchCartQuery.js
import { useQuery } from '@tanstack/react-query';
import { cartApi } from '../../api/cartApi';

const useFetchCartQuery = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await cartApi.getCart();
      return response.data; // Expected shape: { cart: { items: [...], ... } }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};

export default useFetchCartQuery;
