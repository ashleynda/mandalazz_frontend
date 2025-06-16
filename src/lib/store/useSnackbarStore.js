// lib/store/useSnackbarStore.ts or .js
import { create } from 'zustand';

const useSnackbarStore = create((set) => ({
  open: false,
  message: '',
  severity: 'success', // 'success' | 'error' | 'warning' | 'info'
  showSnackbar: ({ message, severity = 'success' }) =>
    set({ open: true, message, severity }),
  closeSnackbar: () => set({ open: false }),
}));

export default useSnackbarStore;
