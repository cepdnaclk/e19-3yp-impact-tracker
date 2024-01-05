import { create } from "zustand";

type activePage =
  | "live"
  | "devices"
  | "analytics"
  | "profile"
  | "test"
  | "player-management";

interface AppState {
  activePage: activePage;
  setActivePage: (page: activePage) => void;
  isMqttOnine: boolean;
  setMqttOnline: (status: boolean) => void;
  isInternetAvailable: boolean;
  setIsInternetAvailable: (isOnline: boolean) => void;
}

export const useAppState = create<AppState>()((set) => ({
  activePage: "profile",
  setActivePage: (page) => set({ activePage: page }),
  isMqttOnine: false,
  setMqttOnline: (status) => set({ isMqttOnine: status }),
  isInternetAvailable: true,
  setIsInternetAvailable: (isOnline) => set({ isInternetAvailable: isOnline }),
}));
