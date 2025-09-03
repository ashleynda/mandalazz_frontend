// useAuthStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  login: (token) => {
    sessionStorage.setItem("authToken", token);
    set({ isLoggedIn: true });
  },
  logout: () => {
    sessionStorage.removeItem("authToken");
    set({ isLoggedIn: false });
  },
}));
