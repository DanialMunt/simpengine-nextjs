import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
})

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
 
//     if (error.response?.status === 401) {
//       console.warn("Unauthorized, redirect to login maybe")
//     }
//     return Promise.reject(error)
//   }
// )