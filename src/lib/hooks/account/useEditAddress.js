// lib/hooks/account/useGetAddressById.ts
import { useMutation, useQuery } from '@tanstack/react-query';

const fetchAddressById = async (id) => {
    const token = sessionStorage.getItem('authToken');
    console.log('Token from sessionStorage:', sessionStorage.getItem('authToken'));

  const res = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/address/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch address');
  }

  return res.json();
};

const updateAddress = async ({ id, payload }) => {
  const token = sessionStorage.getItem('authToken');
  const res = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/address/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to update address');
  }

  return res.json();
};

export const useAddressById = (id) =>
  useQuery({
    queryKey: ['address', id],
    queryFn: () => fetchAddressById(id),
    enabled: !!id, // Don't run unless `id` exists
  });


  export const useUpdateAddress = () =>
  useMutation({
    mutationFn: updateAddress,
  });
