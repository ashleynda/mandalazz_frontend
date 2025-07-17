// lib/hooks/auth/useLoginMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            console.log("🔐 Logging in with:", { email: data.email });

            const res = await fetch("https://mandelazz-webapp.azurewebsites.net/api/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Login failed");
            }

            const result = await res.json();

            if (result.token) {
                sessionStorage.setItem("authToken", result.token);
            }

            return result;
        },

        onSuccess: (data) => {
            console.log("✅ Login successful:", data);

            // Invalidate cart and any other related data
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries(); // Optional: refresh everything
        },

        onError: (error) => {
            console.error("❌ Login failed:", error.message || error);
        },
    });
};

export default useLoginMutation;
