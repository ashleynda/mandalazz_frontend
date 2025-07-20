// import { useQuery } from '@tanstack/react-query';

// const fetchBrands = async (category) => {
//   const res = await fetch(
//     `https://mandelazz-webapp.azurewebsites.net/api/product/?brand=${brand}`,
//     {
//       method: 'GET',
//       // headers: {
//       //   Cookie:
//       //     'ARRAffinity=6f2978b61f339eeffd2de0fbd1035abfc785be48acaa2538361e33d044856829; ARRAffinitySameSite=6f2978b61f339eeffd2de0fbd1035abfc785be48acaa2538361e33d044856829; sid=s%3Aa9HSA9CZYtaR8LJ7ynZzFeA0TPT8JYab.kXLKw1A290iebTPPTctrsixUZeQFXsQFLMe%2Bivo1H8Q',
//       // },
//       credentials: 'include', // important for cookies
//     }
//   );

//   if (!res.ok) {
//     // throw new Error('Failed to fetch foreign brand types');
//        const errorText = await res.text();
//     console.error("Fetch Brands Error:", errorText);
//     throw new Error(`Failed to fetch brands: ${errorText}`);
//   }

//   return res.json();
// };

// export const useBrands = (category) =>
//   useQuery({
//     queryKey: ['brands', category],
//     queryFn: () => fetchBrands(category),
//     enabled: !!category, // Only run if category is defined
//   });


import { useQuery } from '@tanstack/react-query';

const fetchProductsByBrand = async (brand) => {
  const res = await fetch(
    `https://mandelazz-webapp.azurewebsites.net/api/product/?brand=${encodeURIComponent(brand)}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch Products by Brand Error:", errorText);
    throw new Error(`Failed to fetch products: ${errorText}`);
  }

  return res.json();
};

export const useProductsByBrand = (brand) =>
  useQuery({
    queryKey: ['products', brand],
    queryFn: () => fetchProductsByBrand(brand),
    enabled: !!brand,
  });
