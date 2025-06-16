import { useQuery } from '@tanstack/react-query';

const fetchComments = async () => {
  const token = sessionStorage.getItem('authToken');
  const response = await fetch(
    'https://mandelazz-webapp.azurewebsites.net/api/comment/67fa8eb7eb8d1a357aced4de/comments',
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

export const useComments = () => {
  return useQuery({
    queryKey: ['comments', '67fa8eb7eb8d1a357aced4de'],
    queryFn: fetchComments,
  });
};
