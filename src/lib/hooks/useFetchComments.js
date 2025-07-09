import { useQuery } from '@tanstack/react-query';

const fetchComments = async ({ queryKey }) => {
  const [, commentId, token] = queryKey;

  const response = await fetch(`https://mandelazz-webapp.azurewebsites.net/api/comment/${commentId}/comments`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  return response.json(); // assuming the response is JSON
};

export const useComments = (commentId, token) => {
  return useQuery({
    queryKey: ['comments', commentId, token],
    queryFn: fetchComments,
    enabled: !!commentId && !!token, // only fetch if both are present
  });
};
