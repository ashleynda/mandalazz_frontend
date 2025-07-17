// lib/hooks/cart/useUpdateCartMutation.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../../api/cartApi';

const useUpdateCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId, quantity }) => {
            const response = await cartApi.updateCartItem({ productId, quantity });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        },
        onError: (error) => {
            console.error('Update cart error:', error.message);
        },
    });
};

export default useUpdateCartMutation;
