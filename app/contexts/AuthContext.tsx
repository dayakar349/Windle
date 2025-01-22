"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/app/services/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOut: () => void;
  updateAuthState: (user: User, token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: () => {},
  updateAuthState: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    setIsLoading(false);
  }, []);

  const updateAuthState = (user: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

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
