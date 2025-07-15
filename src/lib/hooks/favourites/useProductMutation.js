import { useQuery } from '@tanstack/react-query';

const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('https://mandelazz-webapp.azurewebsites.net/api/product/');

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Fetching products failed');
      }

      return res.json();
    },
  });
};

export default useProductsQuery;