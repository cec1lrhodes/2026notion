import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user) => {
        useAuthStore.persist.clearStorage();
        localStorage.removeItem("kanban-storage");
        localStorage.removeItem("NotionStore");
        set({ isAuthenticated: true, user });
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: "auth-storage" },
  ),
);
