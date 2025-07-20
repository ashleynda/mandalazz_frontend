// import { useQuery } from '@tanstack/react-query';

// export const useFetchMyOrders = (token) => {
//   return useQuery({
//     queryKey: ['myOrders'],
//     queryFn: async () => {
//       const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/checkout/my-orders", {
//         method: "GET", // Normally GET requests shouldn't have a body
//         headers: {
//           "Authorization": `Bearer ${token}`,
//         },
       
//       });

//       if (!res.ok) {
//         const error = await res.json();
//         throw new Error(error.message || 'Failed to fetch orders');
//       }

//       return res.json();
//     },
//     enabled: !!token, // will only run if token is not null/undefined
//   });
// };

import { useQuery } from '@tanstack/react-query';

export const useFetchMyOrders = (token) => {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: async () => {
      const response = await fetch(
        "https://mandelazz-webapp.azurewebsites.net/api/checkout/my-orders",
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch orders');
      }

      return response.json();
    },
    enabled: !!token, // Only fetch when token is available
  });
};
