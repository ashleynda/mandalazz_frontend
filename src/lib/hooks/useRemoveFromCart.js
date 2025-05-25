


import { useMutation } from "@tanstack/react-query";
import { removeFromCart } from "../api/cart";

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: (productId) => removeFromCart(productId),
  });
};
