// lib/hooks/useGuestCart.js
import { useQuery } from '@tanstack/react-query';

const fetchGuestCart = async () => {
  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json(); // or response.text() if backend returns plain text
};

export default function useGuestCart() {
  return useQuery({
    queryKey: ['guest-cart'],
    queryFn: fetchGuestCart,
  });
}
