import { useMutation } from '@tanstack/react-query';

// Define the mutation function
const createCheckout = async ({ token, userDetails, paymentType }) => {
  const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/checkout/create', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userDetails,
      paymentType,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json(); // or response.text() depending on your API response
};

const useCreateCheckout = () => {
  return useMutation({
    mutationFn: createCheckout,
  });
};
export default useCreateCheckout;