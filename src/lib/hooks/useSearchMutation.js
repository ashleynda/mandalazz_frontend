import { useQuery } from '@tanstack/react-query';

// const fetchProductSearch = async (query) => {
//   const response = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/product/search?query=${encodeURIComponent(query)}`, {
//     method: "GET",
//     redirect: "follow",
//   });

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   return response.json(); // or use response.json() if the response is JSON
// };

// const useProductSearch = (query, enabled= true) => {
//   return useQuery({
//     queryKey: ['productSearch', query],
//     // queryFn: fetchProductSearch,
//      queryFn: () => fetchProductSearch(query),
//     enabled: !!query && enabled,
//   });
// };
// export default useProductSearch;
const useProductSearch = (query, enabled = false) => {
  return useQuery({
    queryKey: ['productSearch', query],
    queryFn: async () => {
      const response = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/product/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      return response.json();
    },
    enabled: !!query && enabled,
  });
};
export default useProductSearch;