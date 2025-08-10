// import { useMutation } from '@tanstack/react-query';

// const resetPassword = async ({ token, newPassword }) => {
//   const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/user/reset-password', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ token, newPassword }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Password reset failed');
//   }

//   return response.json(); // or .text() if your backend returns plain text
// };


// src/lib/hooks/useResetPasswordMutation.ts
import { useMutation } from '@tanstack/react-query';

const resetPassword = async ({ token, newPassword }) => {
  const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/user/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Password reset failed');
  }

  return response.json(); // or .text() if the API returns text
};

export default function useResetPasswordMutation() {
  return useMutation({ mutationFn: resetPassword });
}
