import { useMutation } from '@tanstack/react-query';

const useRemoveFavoriteMutation = () => {
  return useMutation({
    mutationFn: async (favoriteId) => {
        const token = sessionStorage.getItem('authToken'); 
        if (!token || token === "undefined") {
            throw new Error("User is not logged in. Please log in to add favorites.");
        }

      const response = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/favorites/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        redirect: "follow"
      });

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    },
    onSuccess: (data) => {
      console.log("Successfully deleted favorite:", data);
      // Optionally refetch favorites or show a toast here
    },
    onError: (error) => {
      console.error("Failed to delete favorite:", error);
    },
  });
};

export default useRemoveFavoriteMutation;
