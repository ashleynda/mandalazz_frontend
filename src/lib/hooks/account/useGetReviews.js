// import { useQuery } from "@tanstack/react-query";

// const fetchOrders = async () => {
//     const token = sessionStorage.getItem("authToken");
//   const res = await fetch(
//     "https://mandelazz-webapp.azurewebsites.net/api/checkout/my-orders",
//     {
//       method: "GET",
//       headers: {
//         Authorization:
//           `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch orders");
//   }

//   const data = await res.json();
//   return data;
// };

// export const useDeliveredOrders = () => {
//   return useQuery({
//     queryKey: ["deliveredOrders"],
//     queryFn: fetchOrders,
//     select: (data) => {
//       const checkouts = data?.message?.checkouts || [];
//       return checkouts.filter(
//         (order) => order?.deliveryStatus?.toLowerCase() === "delivered"
//       );
//     },
//   });
// };


import { useQuery } from "@tanstack/react-query";

const fetchDeliveredOrders = async () => {
  const token = sessionStorage.getItem("authToken");
  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/checkout/delivered-orders", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export default function useDeliveredOrders() {
  return useQuery({
    queryKey: ["deliveredOrders"],
    queryFn: fetchDeliveredOrders,
     select: (data) => data?.message?.deliveredOrders || [],
  });
}
