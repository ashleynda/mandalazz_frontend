import { useMutation } from '@tanstack/react-query';

const postRating = async ({ productId, rating, comment }) => {
  const res = await fetch(`http://localhost:3030/api/rate/${productId}`, {
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

  return res.json(); // Assuming the API returns JSON
};

// React Query hook
export const usePostRating = () => {
  return useMutation({
    mutationFn: postRating,
  });
};
