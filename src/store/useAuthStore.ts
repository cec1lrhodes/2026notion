import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useKanbanStore } from "./useKanbanStore";
import { useNotionStore } from "./useNotionStore";

interface User {
  email: string;
  username: string;
}

interface StoredUser {
  email: string;
  username: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: StoredUser[];

  register: (data: StoredUser) => boolean;
  loginUser: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [],

      register: (data) => {
        const exists = get().users.find((u) => u.email === data.email);
        if (exists) return false;

        set((state) => ({
          users: [...state.users, data],
          user: { email: data.email, username: data.username },
          isAuthenticated: true,
        }));

        localStorage.setItem("current-user", data.email); // ← додай
        useKanbanStore.getState().loadUserData(data.email); // ← додай
        useNotionStore.getState().loadUserData(data.email); // ← додай

        return true;
      },

      loginUser: (email, password) => {
        const found = get().users.find(
          (u) => u.email === email && u.password === password,
        );
        if (!found) return false;

        set({
          user: { email: found.email, username: found.username },
          isAuthenticated: true,
        });

        localStorage.setItem("current-user", email); // ← додай
        useKanbanStore.getState().loadUserData(email);
        useNotionStore.getState().loadUserData(email); // ← додай

        return true;
      },

      logout: () => {
        useKanbanStore.getState().resetKanban();
        useNotionStore.getState().resetStore(); // ← додай
        localStorage.removeItem("current-user"); // ← додай
        set({ isAuthenticated: false, user: null });
      },
    }),
    { name: "auth-storage" },
  ),
);
