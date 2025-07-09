import { useMutation } from "@tanstack/react-query";

export const useCreateAddress = () => {
    return useMutation({
        mutationFn: async (payload) => {
            const token = sessionStorage.getItem('authToken');

            if (!token) {
                throw new Error("Authentication token is required");
            }

            console.log("🏠 Creating address with payload:", JSON.stringify(payload, null, 2));

            const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/address/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json().catch(() => ({ success: false, message: "Failed to parse response" }));

            console.log("📡 Address response status:", response.status);
            console.log("📡 Address response data:", data);

            if (!response.ok) {
                let errorMessage = "Failed to create address";

                if (data.message) {
                    if (typeof data.message === 'string') {
                        errorMessage = data.message;
                    } else if (typeof data.message === 'object' && data.message.message) {
                        errorMessage = data.message.message;
                    } else {
                        errorMessage = JSON.stringify(data.message);
                    }
                }

                throw new Error(errorMessage);
            }

            return data;
        },
        onSuccess: (data) => {
            console.log("✅ Address created successfully:", data);
        },
        onError: (error) => {
            console.error("❌ Address creation failed:", error.message);
        },
    });
};