// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoredData() {
      const token = await AsyncStorage.getItem("@PaleoHunter:token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const response = await api.get("/auth/me");
          setUser(response.data);
        } catch {
          signOut();
        }
      }
      setLoading(false);
    }
    loadStoredData();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      console.log("email", email);
      console.log("password", password);
      const response = await api.post("/auth/login", { email, password });
      console.log("response", response.data);
      const { token, user } = response.data;
      console.log("token", token);
      await AsyncStorage.setItem("@PaleoHunter:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
      console.log("user", user);
      router.replace("home" as any);
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Invalid credentials");
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem("@PaleoHunter:token");
    setUser(null);
    router.replace("/");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
