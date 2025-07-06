// lib/hooks/useCreateAddress.ts
import { useMutation } from "@tanstack/react-query";

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: async (payload) => {
    //   const token = "your-token-here"; 
     const token = sessionStorage.getItem('authToken');
      const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/address/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error("Failed to create address");
      }

      return response.json();
    },
  });
};
