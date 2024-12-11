import { create } from "zustand";
import { axiosInstance } from "../../utils/axios";

interface User {
  id: string;
  email: string;
  role: string;
  userName: string;
}

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  initializeAuth: () => void;
  Registeruser: (formData: {
    userName: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean } | undefined>;
  Loginuser: (formData: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string } | undefined>;
  Checkout: () => Promise<void>;
};

export const Authstore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user, isAuthenticated: !!user });
  },

  initializeAuth: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },

  Registeruser: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      if (res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.log("Register Error:", error);
      return { success: false };
    }
  },

  Loginuser: async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);

      if (res.data.success) {
        set({ user: res.data.user, isAuthenticated: true });
        localStorage.setItem("user", JSON.stringify(res.data.user));
        return res.data;
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.log("Login Error:", error);
    }
  },

  Checkout: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/auth/check-auth", {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        set({
          isAuthenticated: true,
          user: res.data.user,
          isLoading: false,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
        localStorage.removeItem("user");
      }
    } catch (error) {
      set({ isAuthenticated: false, user: null, isLoading: false });
      localStorage.removeItem("user");
      console.log("Checkout Error:", error);
    }
  },
}));
