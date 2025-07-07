import { useMutation } from '@tanstack/react-query';

const createCheckout = async ({ token, payload }) => {
  if (!token) {
    throw new Error("Authentication token is required");
  }

  console.log("🚀 Making checkout request with payload:", JSON.stringify(payload, null, 2));

  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/checkout/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({ success: false, message: "Failed to parse response" }));

  console.log("📡 Response status:", response.status);
  console.log("📡 Response data:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    // Handle different response formats
    let errorMessage = "Checkout failed";

    if (data.message) {
      if (typeof data.message === 'string') {
        errorMessage = data.message;
      } else if (typeof data.message === 'object' && data.message.message) {
        errorMessage = data.message.message;
      } else {
        errorMessage = JSON.stringify(data.message);
      }
    }

    throw new Error(errorMessage);
  }

  if (data.success === false) {
    let errorMessage = "Checkout failed";

    if (data.message) {
      if (typeof data.message === 'string') {
        errorMessage = data.message;
      } else if (typeof data.message === 'object' && data.message.message) {
        errorMessage = data.message.message;
      } else {
        errorMessage = JSON.stringify(data.message);
      }
    }

    throw new Error(errorMessage);
  }

  return data;
};

const useCreateCheckout = () => {
  return useMutation({
    mutationFn: createCheckout,
    onSuccess: (data) => {
      console.log("✅ Checkout mutation success:", JSON.stringify(data, null, 2));
    },
    onError: (error) => {
      console.error("❌ Checkout mutation failed:", error.message);
    },
  });
};

export default useCreateCheckout;