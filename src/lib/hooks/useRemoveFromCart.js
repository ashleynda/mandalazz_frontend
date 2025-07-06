


// import { useMutation } from "@tanstack/react-query";
// import { removeFromCart } from "../api/cart";

// export const useRemoveFromCart = () => {
//   const token = sessionStorage.getItem("authToken");
//   return useMutation({
//     mutationFn: (productId) => removeFromCart(productId),
//   });
// };

import { useMutation } from '@tanstack/react-query';

const removeFromCart = async ({ productId }) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    throw new Error("Please log in.");
  }
  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/remove", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to remove item from cart");
  }

  return data;
};

const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: removeFromCart,
  });
};

export default useRemoveFromCart;
