import { create } from "zustand";
import { Buddies } from "../types";

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
  buddiesState: Buddies;
}

export const useAppState = create<AppState>()((set) => ({
  activePage: "profile",
  setActivePage: (page) => set({ activePage: page }),
  isMqttOnine: false,
  setMqttOnline: (status) => set({ isMqttOnine: status }),
  isInternetAvailable: false,
  setIsInternetAvailable: (isOnline) => set({ isInternetAvailable: isOnline }),
  buddiesState: new Map(),
  setBuddiesState: (buddiesState: Buddies) => set({ buddiesState }),
}));
