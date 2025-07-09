import { useQuery } from '@tanstack/react-query';

const fetchComments = async ({ queryKey}) => {
  // const token = sessionStorage.getItem('authToken');
   const [, commentId, token] = queryKey;
  const response = await fetch(
    `https://mandelazz-webapp.azurewebsites.net/api/comment/${commentId}/comments`,
    {
      method: 'GET',
      headers: {
        Authorization:
          `Bearer ${token}`
      },
      redirect: 'follow',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  const result = await response.json();
  return result;
};

export const useComments = (commentId, token) => {
  return useQuery({
    queryKey: ['comments', commentId, token],
    queryFn: fetchComments,
    enabled: !!commentId && !!token,
  });
};
