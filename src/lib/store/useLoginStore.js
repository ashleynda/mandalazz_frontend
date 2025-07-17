import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLoginStore = create(
    persist(
        (set) => ({
            formData: { email: '', password: '', rememberMe: false },
            errors: {},
            isAuthenticated: false,

            setFormData: (key, value) =>
                set((state) => ({
                    formData: { ...state.formData, [key]: value },
                })),

            setErrors: (errors) => set({ errors }),

            setAuthStatus: (status) => set({ isAuthenticated: status }),

            resetForm: () => set({
                formData: { email: '', password: '', rememberMe: false },
                errors: {}
            })
        }),
        {
            name: 'login-storage',
            partialize: (state) => ({
                formData: state.formData,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);

export default useLoginStore;