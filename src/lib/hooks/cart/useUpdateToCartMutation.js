import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAuthenticated, getAuthToken } from '../../utils/authUtils';
import { getOrCreateGuestId } from '../../utils/guestIdUtils';

const updateCartQuantity = async ({ productId, quantity }) => {
    const authenticated = isAuthenticated();
    const token = getAuthToken();

    const headers = {
        "Content-Type": "application/json",
    };

    const body = {
        productId: productId.toString(),
        quantity: parseInt(quantity)
    };

    if (authenticated && token) {
        headers.Authorization = `Bearer ${token}`;
    } else {
        // For guest users, include guestId in the request body
        const guestId = getOrCreateGuestId();
        body.guestId = guestId;
        console.log('🆔 Updating guest cart quantity with ID:', guestId);
    }

    console.log('🔄 Updating cart quantity:', { authenticated, productId, quantity });

    const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/update", {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || `Failed to update cart quantity (${response.status})`);
    }

    return data;
};

const useUpdateCartQuantity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCartQuantity,
        onSuccess: (data) => {
            console.log("✅ Cart quantity updated successfully:", data);
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
        onError: (error) => {
            console.error("❌ Failed to update cart quantity:", error);
        },
        retry: (failureCount, error) => {
            if (error.message.includes('Cart not found') || error.message.includes('not found')) {
                return false;
            }
            if (error.message.includes('validation') || error.message.includes('invalid')) {
                return false;
            }
            return failureCount < 2;
        },
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 5000),
    });
};

export default useUpdateCartQuantity;