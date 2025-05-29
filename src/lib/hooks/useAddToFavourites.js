import { useMutation } from '@tanstack/react-query';

const useAddToFavorites = () => {
  return useMutation({
    mutationFn: async (productId) => {
      const token = sessionStorage.getItem('authToken'); 
      if (!token || token === "undefined") {
        throw new Error("User is not logged in. Please log in to add favorites.");
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

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
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
