import { useMutation } from '@tanstack/react-query';

const validateResetToken = async ({ email, token }) => {
  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/user/validate-reset-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, token }),
  });

  if (!response.ok) {
    throw new Error("Failed to validate reset token");
  }

  return response.json();
};

export const useValidateResetToken = () => {
  return useMutation({
    mutationFn: validateResetToken,
  });
};

