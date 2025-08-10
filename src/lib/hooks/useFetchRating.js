import { useQuery } from "@tanstack/react-query";

export const fetchRate = async (token, productId) => {
  const response = await fetch(
    `https://mandelazz-webapp.azurewebsites.net/api/rate/${productId}`,
    {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json(); // or response.text() if you need raw text
};

// export const useFetchRate = () => {
//   return useQuery({
//     queryKey: ["rate"],
//     queryFn: fetchRate,
//   });
// };
export const useFetchRateQuery = (token, productId) => {
  return useQuery({
    queryKey: ["rate", productId],
    queryFn: () => fetchRate(token, productId),
    enabled: !!token && !!productId, // Only fetch when token and productId are available
  });
};
