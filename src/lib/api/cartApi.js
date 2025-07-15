import axios from 'axios';

const API_BASE_URL = 'https://mandelazz-webapp.azurewebsites.net/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for session cookies
});

// Add request interceptor to include auth token if available
axiosInstance.interceptors.request.use(
    (config) => {
      // Check for auth token in sessionStorage
      if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('authToken');
          // Optionally redirect to login
          // window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
);

export const cartApi = {
  addToCart: async (cartData) => {
    return await axiosInstance.post('/cart/add', cartData);
  },

  getCart: async () => {
    return await axiosInstance.get('/cart');
  },

  updateCartItem: async ({ productId, quantity }) => {
    return await axiosInstance.put('/cart/update', { productId, quantity });
  },

  removeFromCart: async ({ productId }) => {
    return await axiosInstance.delete('/cart/remove', { data: { productId } });
  },

  clearCart: async () => {
    return await axiosInstance.delete('/cart/clear');
  },
};