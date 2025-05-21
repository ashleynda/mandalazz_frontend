import { create } from 'zustand';

const useLoginStore = create((set) => ({    
    formData: { email: '', password: '' },
    errors: {},
    setFormData: (key, value) =>
        set((state) => ({
        formData: { ...state.formData, [key]: value },
        })),
    setErrors: (errors) => set({ errors }),
}));

export default useLoginStore;