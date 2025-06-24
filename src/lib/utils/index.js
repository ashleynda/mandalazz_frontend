// utils/auth.js or similar
// export const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return {}; // No token, no auth header
//   return {
//     Authorization: `Bearer ${token}`,
//   };
// };
export const getAuthHeader = () => {
  const token = sessionStorage.getItem('authToken'); // <-- use sessionStorage
  if (!token) return {}; // No token, no auth header
  return {
    Authorization: `Bearer ${token}`,
  };
};


export function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
