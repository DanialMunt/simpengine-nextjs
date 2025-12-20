import axios from "axios"

import useAuthStore from "@/stores/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
 
//     if (error.response?.status === 401) {
//       console.warn("Unauthorized, redirect to login maybe")
//     }
//     return Promise.reject(error)
//   }
// )