import { useMutation } from '@tanstack/react-query';

const useFetchMyOrders = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/checkout/my-orders", {
        method: "GET", // Normally GET requests shouldn't have a body
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "text/plain",
        },
        body: `{
          "userDetails": {
            "addressId": "68568a64f014ec20f0978488"
          },
          "paymentType": "online_payment"
        }`
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch orders');
      }

      return response.json();
    }
  });
};
