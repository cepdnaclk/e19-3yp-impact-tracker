import { create } from "zustand";
import {
  Buddies,
  BuddyStatus,
  activePage,
  BuddiesImpact,
  Impact,
} from "../types";
import { Map } from "immutable";

interface AppState {
  activePage: activePage;
  setActivePage: (page: activePage) => void;

  isMqttOnine: boolean;
  setMqttOnline: (status: boolean) => void;

  isInternetAvailable: boolean;
  setIsInternetAvailable: (isOnline: boolean) => void;

  buddiesStatus: Buddies;
  setBuddiesStatus: (buddiesState: Buddies) => void;

  buddiesImpact: BuddiesImpact;
  setBuddiesImpact: (buddiesImpact: BuddiesImpact) => void;
}

export const useAppState = create<AppState>()((set) => ({
  //For the sidebar menu item selected, and render main content
  activePage: "profile",
  setActivePage: (page) => set({ activePage: page }),

  //For the mqtt connection status
  isMqttOnine: false,
  setMqttOnline: (status) => set({ isMqttOnine: status }),

  //For the internet connection status
  isInternetAvailable: false,
  setIsInternetAvailable: (isOnline) => set({ isInternetAvailable: isOnline }),

  //For the buddies status
  buddiesStatus: Map<number, BuddyStatus>() as Buddies,
  setBuddiesStatus: (buddiesState: Buddies) =>
    set({ buddiesStatus: buddiesState }),

  //For the buddies impact
  buddiesImpact: Map<number, Impact>() as BuddiesImpact,
  setBuddiesImpact: (buddiesImpact: BuddiesImpact) =>
    set({ buddiesImpact: buddiesImpact }),
}));
