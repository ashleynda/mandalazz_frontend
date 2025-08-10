import { useMutation } from '@tanstack/react-query';

const changePassword = async ({ oldPassword, newPassword, token }) => {
  const response = await fetch('https://mandelazz-webapp.azurewebsites.net/api/user/change-password', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Password change failed');
  }

  return response.json(); 
};

const useChangePassword = () => {
  return useMutation({ mutationFn: changePassword });
};

export default useChangePassword;
