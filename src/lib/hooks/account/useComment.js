import { useMutation } from '@tanstack/react-query';

const postComment = async ({ productId, commentText }) => {
  const response = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/comment/${productId}/comment`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentText }),
  });

  if (!response.ok) {
    throw new Error("Failed to post comment");
  }

  return response.json();
};

export const usePostReview = () => {
  return useMutation({
    mutationFn: postComment,
  });
};
