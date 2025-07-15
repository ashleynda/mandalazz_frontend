import { isAuthenticated, getAuthToken } from '../../utils/authUtils';
import { getCurrentGuestId } from '../../utils/guestIdUtils';

const fetchCart = async () => {
  const authenticated = isAuthenticated();
  const token = getAuthToken();
  const guestId = getCurrentGuestId(); // ✅

  console.log('🔍 Fetching cart:', { authenticated, hasToken: !!token, guestId });

  const headers = {
    'Content-Type': 'application/json',
  };

  if (authenticated && token) {
    headers.Authorization = `Bearer ${token}`;
  } else if (guestId) {
    headers['x-guest-id'] = guestId; // ✅ Custom header for guests
  }

  const url = "https://mandelazz-webapp.azurewebsites.net/api/cart/";

  const response = await fetch(url, {
    method: "GET",
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('❌ Cart fetch failed:', response.status, response.statusText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('✅ Cart fetched successfully:', data);

  const cartData = data?.cart || data?.message?.cart || data?.data?.cart;

  return {
    ...data,
    cart: cartData || { items: [], totalAmount: 0 },
  };
};
export default fetchCart;