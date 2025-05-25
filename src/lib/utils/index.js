// utils/auth.js or similar
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) return {}; // No token, no auth header
  return {
    Authorization: `Bearer ${token}`,
  };
};
