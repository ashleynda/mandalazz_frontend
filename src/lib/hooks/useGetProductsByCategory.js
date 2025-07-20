import { useQuery } from '@tanstack/react-query';

export const getProducts = async (category) => {
  const response = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/product?category=${category}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();
  console.log("🌐 API raw result:", result);

  return result.data.products; // ✅ returns just the array of products
};


export const useProductsByCategory = (category) => {
  return useQuery({
    queryKey: ['products-by-category', category],
    queryFn: ({ queryKey }) => {
      const [_key, category] = queryKey;
      return getProducts(category);
    },
    enabled: !!category, // only run if category is defined
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });
};

