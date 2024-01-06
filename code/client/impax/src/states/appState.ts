import { create } from "zustand";
import {
  Buddies,
  activePage,
  BuddiesImpact,
  Players,
  PlayerMap,
} from "../types";
import { players } from "../data/players";
import { deleteByValue } from "../utils/utils";
import MqttClient from "../services/mqttClient";

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

  playerDetails: Players;

  playerMap: PlayerMap;
  setPlayerMap: (playerMap: PlayerMap) => void;
  updatePlayerMap: (buddy_id: number, player_id: number) => void;
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
  buddiesStatus: {} as Buddies,
  setBuddiesStatus: (buddiesState: Buddies) =>
    set({ buddiesStatus: buddiesState }),

  //For the buddies impact
  buddiesImpact: {} as BuddiesImpact,
  setBuddiesImpact: (buddiesImpact: BuddiesImpact) =>
    set({ buddiesImpact: buddiesImpact }),

  //TODO: Clashing of players with other dashbaords
  playerDetails: players,

  //For the player map
  playerMap: {} as PlayerMap,
  setPlayerMap: (playerMap: PlayerMap) => set({ playerMap: playerMap }),
  updatePlayerMap: (buddy_id: number, player_id: number) => {
    set((prevState) => {
      const playerMap = { ...prevState.playerMap };
      //check if player_id is already in playerMap and delete it
      deleteByValue(playerMap, player_id);

      playerMap[buddy_id] = player_id;

      //publish new playerMap to mqtt
      MqttClient.getInstance().publishPlayerMap(playerMap);
      return { playerMap };
    });
  },
}));
