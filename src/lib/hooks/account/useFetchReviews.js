// hooks/useFetchComments.ts
import { useQuery } from "@tanstack/react-query";

const fetchComments = async (productId) => {
   const token = sessionStorage.getItem("authToken");
  const response = await fetch(
    `https://mandelazz-webapp.azurewebsites.net/api/comment/${productId}/comments`,
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
};

export const useFetchReviews = (productId) => {
  return useQuery({
    queryKey: ["comments", productId],
    queryFn: () => fetchComments(productId),
    // enabled: !!productId, // Only fetch if productId is provided
  });
};
