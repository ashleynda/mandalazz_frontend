// lib/hooks/useRecentlyViewedQuery.ts
import { useQuery } from '@tanstack/react-query';

const fetchRecentViewed = async () => {
  const res = await fetch("https://mandelazz-webapp.azurewebsites.net/api/recentview/", {
    method: "GET",
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recent viewed items");
  }

  const json = await res.json();
  return json.message.cart.items;
};

export const useRecentlyViewedQuery = () =>
  useQuery({
    queryKey: ['recentViewed'],
    queryFn: fetchRecentViewed,
  });
