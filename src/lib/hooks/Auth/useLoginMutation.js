import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentGuestId, clearGuestId } from '../../utils/guestIdUtils';

const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            // Get current guest ID before login
            const guestId = getCurrentGuestId();

            // Prepare login payload
            const loginPayload = {
                ...data,
                ...(guestId && { guestId }) // Include guestId if exists
            };

            console.log('🔐 Logging in with payload:', {
                email: loginPayload.email,
                guestId: loginPayload.guestId
            });

            const res = await fetch(
                "https://mandelazz-webapp.azurewebsites.net/api/user/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginPayload),
                }
            );

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Login failed");
            }

            const result = await res.json();

            // Store auth token
            if (result.token) {
                sessionStorage.setItem("authToken", result.token);

                // Clear guest ID after successful login since user is now authenticated
                if (guestId) {
                    console.log('🔄 Clearing guest ID after successful login');
                    clearGuestId();
                }
            }

            return result;
        },
        onSuccess: (data) => {
            console.log('✅ Login successful:', data);

            // Invalidate cart queries to fetch user's cart
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            queryClient.invalidateQueries({ queryKey: ['fetchCart'] });

            // Invalidate all queries to ensure fresh data
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            console.error("❌ Login failed:", error);
        },
    });
};

export default useLoginMutation;
