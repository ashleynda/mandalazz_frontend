import { useQuery } from '@tanstack/react-query';

const useFavoritesQuery = (token) => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await fetch('https://mandelazz-webapp.azurewebsites.net/api/favorites', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch favorites');
      }

      return res.json(); // or res.text() if you expect plain text
    },
    enabled: !!token, // Only run if token is available
  });
};

export default useFavoritesQuery;
