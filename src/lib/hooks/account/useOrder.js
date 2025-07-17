import { useMutation } from '@tanstack/react-query';

const updateDeliveryStatus = async ({ token, orderId }) => {
    // const token = sessionStorage.getItem('authToken'); // or however you're storing it
  const response = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/checkout/update-delivery/${orderId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      deliveryStatus: 'under_process',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update delivery status');
  }

  return response.json(); // or response.text() if that's what your API returns
};

export const useUpdateDelivery = () => {
  return useMutation({
    mutationFn: updateDeliveryStatus,
  });
};
