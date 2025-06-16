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
  return result.data.products; // ✅ returns just the array of products
};
