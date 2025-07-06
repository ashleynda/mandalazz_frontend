// // src/store/useAddressStore.ts
// import { create } from "zustand";

// const defaultData = {
//   firstName: "",
//   lastName: "",
//   phone: "",
//   altPhone: "",
//   address: "",
//   landmark: "",
//   city: "",
//   lga: "",
//   state: "",
//   isDefault: false,
//   countryCode: "+234",
//   altCountryCode: "+234",
// };

// export const useAddressStore = create()((set) => ({
//   formData: defaultData,
//   setFormData: (data) =>
//     set((state) => ({
//       formData: { ...state.formData, ...data },
//     })),
//   resetFormData: () => set({ formData: defaultData }),
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultData = {
  firstName: '',
  lastName: '',
  phone: '',
  altPhone: '',
  address: '',
  landmark: '',
  city: '',
  lga: '',
  state: '',
  isDefault: false,
  countryCode: '+234',
  altCountryCode: '+234'
};

export const useAddressStore = create()(
  persist(
    (set) => ({
      formData: defaultData,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetFormData: () => set({ formData: defaultData }),
    }),
    {
      name: "address-store", // localStorage key
    }
  )
);
