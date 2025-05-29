export const logout = () => {
  sessionStorage.removeItem('authToken');
  window.dispatchEvent(new Event('logout')); // Dispatch custom event
  window.location.href = '/products'; // Navigate to login or refresh
};
