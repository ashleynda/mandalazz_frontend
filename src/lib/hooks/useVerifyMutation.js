import { useMutation } from '@tanstack/react-query';

const useVerifyMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch('https://mandelazz-webapp.azurewebsites.net/api/user/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Signup failed');
      }

      return res.json();
    },
  });
};

export default useVerifyMutation;