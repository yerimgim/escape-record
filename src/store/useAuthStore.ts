import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  name: string;
};

type AuthState = {
  user: User | null;
  login: (name: string, pin: string) => boolean;
  signup: (name: string, pin: string) => boolean;
  logout: () => void;
};

const MOCK_USER = "escape_user";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signup: (name, pin) => {
        const userRawData = localStorage.getItem(MOCK_USER);
        const users = userRawData ? JSON.parse(userRawData) : {};

        if (users[name]) return false;

        users[name] = pin;
        localStorage.setItem(MOCK_USER, JSON.stringify(users));
        set({ user: { name } });
        return true;
      },
      login: (name, pin) => {
        const userRawData = localStorage.getItem(MOCK_USER);
        // const users = userRawData ? JSON.parse(userRawData) : {};
        const users = userRawData
          ? JSON.parse(userRawData)
          : { 뚝딱: "1234", 하이: "0000" }; // 임시

        if (users[name] === pin) {
          set({ user: { name } });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    { name: "escape_auth" },
  ),
);
