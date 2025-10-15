import { create } from "zustand";


interface UiState {
theme: "dark" | "light";
toggle: () => void;
}


export const useUiStore = create<UiState>((set) => ({
theme: "dark",
toggle: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
}));