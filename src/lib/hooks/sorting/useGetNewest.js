// // src/api/getSortedProducts.js

// export const getSortedProducts = async () => {
//   const response = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/product?sortBy=${sortBy}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token} `,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch sorted products");
//   }

//   return response.json();
// };
// src/api/getSortedProducts.js
export const getSortedProducts = async ({ queryKey }) => {
  const [_key, { sortBy, page, limit, token }] = queryKey;

  const response = await fetch(
    `https://mandelazz-webapp.azurewebsites.net/api/product?sortBy=${sortBy}&page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};


export const useProducts = (token) => {
  return useQuery({
    queryKey: ['newest-products'],
    queryFn: () => getSortedProducts(token),
    enabled: !!token, 
  });
}

