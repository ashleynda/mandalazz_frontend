import { useQuery } from "@tanstack/react-query";

const fetchUserProfile = async () => {
    const token = sessionStorage.getItem("authToken");
  const res = await fetch("https://mandelazz-webapp.azurewebsites.net/api/user/profile", {
    method: "GET",
    headers: {
      Authorization:
    `'Bearer ${token}`
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });
};
