export const getPopular = async ({ queryKey }) => {
  const [_key, { sortBy, page, limit }] = queryKey;

  const response = await fetch(
    `https://mandelazz-webapp.azurewebsites.net/api/product?sortBy=${sortBy}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      redirect: "follow",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json(); 
};
