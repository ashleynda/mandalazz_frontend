// utils/syncGuestCart.js

export const syncGuestCart = async (cartItems) => {
  const token = localStorage.getItem('authToken');
  if (token) return; // Don't sync if user is logged in

  try {
    await fetch('https://mandelazz-webapp.azurewebsites.net/api/guest/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems }),
    });
  } catch (err) {
    console.error('Error syncing guest cart:', err);
  }
};
