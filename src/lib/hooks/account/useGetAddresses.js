// api/getUserAddress.ts

import { useQuery } from "@tanstack/react-query";
import { get } from "http";

export const getUserAddress = async () => {
    const token = sessionStorage.getItem("authToken");
  const res = await fetch("https://mandelazz-webapp.azurewebsites.net/api/address/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch address");

  return res.json();
};

export const useUserAddresses = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserAddress,
  });
};

