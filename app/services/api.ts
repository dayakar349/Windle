import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  signup: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
  },
  signin: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/signin", data);
    return response.data;
  },
};

export const chatApi = {
  sendMessage: async (query: string) => {
    const response = await api.post("/chat", { query });
    return response.data;
  },
};

export default api;
