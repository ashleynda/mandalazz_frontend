// lib/hooks/account/useUpdateUserProfile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUserProfile = async (payload) => {
  const token = sessionStorage.getItem("authToken");

  const response = await fetch("https://mandelazz-webapp.azurewebsites.net/api/user/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] }); // optional
    },
  });
};
