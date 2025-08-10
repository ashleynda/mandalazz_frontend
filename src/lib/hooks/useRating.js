import { useMutation } from '@tanstack/react-query';

export const postRating = async ({ productId, rating, comment, token }) => {
  const res = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/rate/${productId}`, {
    method: 'POST',
    headers: {
      Authorization:
        `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rating, comment }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Failed to post rating');
  }

  return res.json();
};

export const usePostRating = () => {
  return useMutation({
    mutationFn: postRating,
  });
};
