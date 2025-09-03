// // src/lib/hooks/useResetPasswordMutation.js

// import { useMutation } from '@tanstack/react-query';

// const useResetPasswordMutation = () => {
//   return useMutation({
//     mutationFn: async (data) => {
//       const res = await fetch('https://mandelazz-webapp.azurewebsites.net/api/user/reset-password', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         const errData = await res.json();
//         throw new Error(errData.message || 'Password reset failed');
//       }

//       return res.json(); // Return parsed response
//     },
//   });
// };

// export default useResetPasswordMutation;

import { useMutation } from "@tanstack/react-query";

const resetPassword = async ({ token, newPassword }) => {
  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/user/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }

  return response.json(); // or response.text() if your backend returns plain text
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
