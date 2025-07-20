export const fetchProducts = async ({ category, brand }) => {
  let url = "https://mandelazz-webapp.azurewebsites.net/api/product?";

  if (brand) {
    url += `brand=${encodeURIComponent(brand)}`;
  } else if (category) {
    url += `category=${encodeURIComponent(category)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await response.json();
  return result.data?.products || []; // Always return array
};
