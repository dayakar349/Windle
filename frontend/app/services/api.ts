import axios from "axios";
import { chatStorage } from "./chatStorage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api";

console.log("API URL:", API_URL); // Debug log

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
    try {
      console.log("Sending request to:", `${API_URL}/chat`); // Debug log
      const response = await api.post("/chat", { query });

      if (!response.data || !response.data.response) {
        throw new Error("Invalid response format from server");
      }

      const chat = chatStorage.saveChat(query, response.data.response);
      return { response: response.data.response, chatId: chat.id };
    } catch (error: any) {
      console.error("API Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error.response?.status === 401) {
        window.location.href = "/auth/signin";
        return;
      }

      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to get response from server"
      );
    }
  },
};

export default api;
