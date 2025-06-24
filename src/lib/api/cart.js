export const removeFromCart = async (productId) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/remove", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
    redirect: "follow",
  });

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};