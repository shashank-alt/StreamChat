import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamChat-theme") || "Business",
  setTheme: (theme) => {
    localStorage.setItem("streamChat-theme", theme);
    set({ theme });
  },
}));