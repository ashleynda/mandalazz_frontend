// import { useMutation } from '@tanstack/react-query';

// // Define the mutation function
// const createCheckout = async ({ userDetails, paymentType }) => {
//    const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
// console.log("Auth Token:", token);
//  console.log("userDetails:", userDetails);
//   console.log("paymentType:", paymentType);

//      if (!token) {
//     throw new Error("Please login.");
//   }
//   if (!userDetails?.addressId) {
//   throw new Error("Missing address ID");
// }

//   const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/checkout/create', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       userDetails,
//       paymentType,
//     }),
//   });


//     const responseData = await response.json().catch(() => ({}));

 
//   if (!response.ok || responseData?.success === false) {
//     const message =
//       typeof responseData.message === 'string'
//         ? responseData.message
//         : JSON.stringify(responseData.message || 'Something went wrong');
//     throw new Error(message);
//   }

//   return responseData;
// };

// const useCreateCheckout = () => {
//   return useMutation({
//     mutationFn: createCheckout,
//   });
// };
// export default useCreateCheckout;

import { useMutation } from '@tanstack/react-query';

const createCheckout = async ({ token, payload }) => {
    if (!token) throw new Error("Please login.");
  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/checkout/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // const data = await response.json();
   const data = await response.json().catch(() => ({}));


  if (!response.ok || data?.success === false) {
    const message =
      typeof data.message === 'string'
        ? data.message
        : JSON.stringify(data.message || 'Checkout failed');
    throw new Error(message);
  }

  return data;
};

const useCreateCheckout = () => {
  return useMutation({
    mutationFn: createCheckout,
    onSuccess: (data) => {
      console.log("✅ Checkout success:", data);
    },
    onError: (error) => {
      console.error("❌ Checkout failed:", error.message);
    },
  });
};

export default useCreateCheckout;

