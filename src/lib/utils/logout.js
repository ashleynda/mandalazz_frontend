export const logout = () => {
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userId');
  window.dispatchEvent(new Event('logout')); 
  window.location.href = '/products'; 
};
