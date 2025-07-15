import { getCurrentGuestId } from '../../utils/guestIdUtils';

const removeFromCart = async ({ productId }) => {
  const authenticated = isAuthenticated();
  const token = getAuthToken();
  const guestId = getCurrentGuestId(); // ✅

  const headers = {
    "Content-Type": "application/json",
  };

  if (authenticated && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const body = {
    productId: productId.toString(),
    guestId: !authenticated ? guestId : undefined, // ✅ Only add guestId if not authenticated
  };

  console.log('🗑️ Removing from cart:', { authenticated, productId, guestId });

  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/remove", {
    method: "DELETE",
    headers,
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data?.message || `Failed to remove item from cart (${response.status})`);
  }

  return data;
};

export default removeFromCart ;