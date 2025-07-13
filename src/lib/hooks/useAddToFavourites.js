import { useMutation } from '@tanstack/react-query';
import useSnackbarStore from '../store/useSnackbarStore';

const useAddToFavorites = () => {
  const showSnackbar = useSnackbarStore()
  return useMutation({
    mutationFn: async (productId) => {
      const token = sessionStorage.getItem('authToken');
      // if (!token || token === "undefined") {
      //   throw new Error("User is not logged in. Please log in to add favorites.");
      // }       
      if (!token || token === "undefined") {
        showSnackbar({
          message: "User is not logged in. Please log in to add favorites.",
          severity: "error", // or "warning"
        });
        throw new Error("User is not logged in.") 
      }

      const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/favorites", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        redirect: "follow",
      });

      // const text = await response.text();
      // try {
      //   return JSON.parse(text);
      // } catch {
      //   return text;
      // }
        if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add to favorites");
      }

      return response.json();
    
    },
    onSuccess: () => {
      console.log("Added to favorites successfully");
      // toast.success("Added to favorites!");
    },
    onError: (error) => {
      console.error("Error adding to favorites:", error);
      // toast.error("Failed to add to favorites");
    }
  });
};

export default useAddToFavorites;
