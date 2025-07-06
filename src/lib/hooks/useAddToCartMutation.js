// import { useMutation } from '@tanstack/react-query';

import { useMutation } from "@tanstack/react-query";

// const useAddToCartMutation = () => {

//   return useMutation({
//     mutationFn: async (cartData) => {

//       const token = sessionStorage.getItem("authToken");

//       if (!token) {
//         throw new Error("Token not found");
//       }

//       const payload = {
//         productId: cartData.id,
//         quantity: cartData.quantity,
//         size: cartData.size?.toLowerCase?.(),   
//         // color: cartData.color?.toLowerCase?.(), // same here
//         ...(cartData.color ? { color: cartData.color?.toLowerCase?.() } : {}),
//       };


//       const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/cart/add', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//          throw new Error(result.message || "Failed to add item to cart");
//       }

//       return result
//     },
//   });
// };

// export default useAddToCartMutation;
// import { useMutation } from '@tanstack/react-query';

const useAddToCartMutation = () => {
  return useMutation({
    mutationFn: async (cartData) => {
      const token = sessionStorage.getItem("authToken");


      if (!token) {
        throw new Error("Token not found");
      }

      const payload = {
        productId: cartData.productId, // Changed from cartData.id to cartData.productId
        quantity: cartData.quantity,
        ...(cartData.size ? { size: String(cartData.size).toLowerCase() } : {}),
        ...(cartData.color ? { color: cartData.color.toLowerCase() } : {}),
      };

      const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/cart/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add item to cart");
      }

      return result;
    },


  });
};

export default useAddToCartMutation;
