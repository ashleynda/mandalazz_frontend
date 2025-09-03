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

// export const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });
// };

export const formatDate = (date) => {
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime())
    ? 'Invalid Date'
    : parsedDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
};

export const formatName = (name) => {
  if (!name) return "";

  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function capitalizeFirstLetter(name) {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1);
}
