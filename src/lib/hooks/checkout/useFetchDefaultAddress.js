import { useQuery } from "@tanstack/react-query";

const fetchDefaultAddress = async () => {
     const token = typeof window !== "undefined" ? sessionStorage.getItem("authToken") : null;
  if (!token) throw new Error("Token missing");
  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/address/default", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch default address");
  }

  return response.json();
};

export const useDefaultAddress = () => {
  return useQuery({
    queryKey: ["defaultAddress"],
    queryFn: fetchDefaultAddress,
  });
};
