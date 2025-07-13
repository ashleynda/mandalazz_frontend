import { useQuery } from "@tanstack/react-query";

const getAuthHeader = () => {
  const token = sessionStorage.getItem("authToken"); 
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const fetchCart = async () => {
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
  };

  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/cart/", {
    method: "GET",
    headers,
    credentials: "include",
  });

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const useFetchCartQuery = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  });
};

export default useFetchCartQuery;
