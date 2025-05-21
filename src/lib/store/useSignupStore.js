// stores/useSignupStore.js
import { create } from 'zustand';

const useSignupStore = create((set) => ({
  formData: { firstName: '', lastName: '', email: '', password: '' },
  errors: {},
  setFormData: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),
  setErrors: (errors) => set({ errors }),
}));

export default useSignupStore;
