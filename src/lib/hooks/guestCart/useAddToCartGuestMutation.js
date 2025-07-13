// lib/hooks/useAddToCart.js
import { useMutation } from '@tanstack/react-query';

const addToCart = async ({ productId, quantity, color, size }) => {
  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
      color,
      size,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || 'Failed to add to cart');
  }

  return response.json();
};

export default function useAddToCartGuest() {
  return useMutation({ mutationFn: addToCart });
}
