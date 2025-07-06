// // import { useQuery } from '@tanstack/react-query';
// // import { getAuthHeader } from "../../lib/utils/index"; 

// // const fetchCart = async () => {
// //   const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/", {
// //     method: "GET",
// //     headers: {
// //     //   Authorization: `Bearer ${token}`,
// //      ...getAuthHeader(),
// //     },
// //     redirect: "follow",
// //   });

// //   const text = await response.text();

// //   // You can convert to JSON if you expect structured data
// //   try {
// //     return JSON.parse(text);
// //   } catch {
// //     return text;
// //   }
// // };

// // export const useCart = () => {
// //   return useQuery({
// //     queryKey: ['cart'],
// //     queryFn: fetchCart,
// //   })
// // };

// import { useQuery } from '@tanstack/react-query';
// import { getAuthHeader } from "../../lib/utils/index"; 

// const fetchCart = async () => {
//   // Get auth headers (may or may not contain Authorization)
//   const authHeaders = getAuthHeader();

//   // Check if authHeaders has Authorization header
//   const hasAuth = authHeaders && authHeaders.Authorization;

//   const url = "https://mandelazz-webapp.azurewebsites.net/api/cart/";

//   const headers = hasAuth
//     ? authHeaders
//     : {}; // No auth header for guest users

//   const response = await fetch(url, {
//     method: "GET",
//     headers,
//     redirect: "follow",
//   });

//   const text = await response.text();

//   try {
//     return JSON.parse(text);
//   } catch {
//     return text;
//   }
// };

// export const useCart = () => {
//   return useQuery({
//     queryKey: ['cart'],
//     queryFn: fetchCart,
//     retry: false, // Optional: no retries on failure for clearer errors
//   });
// };


import { useQuery } from "@tanstack/react-query";
import { getAuthHeader } from "../../lib/utils/index";


const fetchCart = async () => {
  const headers = {
    ...getAuthHeader(), // will be empty if no token
  };

  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/", {
    method: "GET",
    headers,
    redirect: "follow",
  });

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const useFetchCartQuery = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  });
};

export default useFetchCartQuery;
