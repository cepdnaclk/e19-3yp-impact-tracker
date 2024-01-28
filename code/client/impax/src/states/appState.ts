import { create } from "zustand";
import {
  Buddies,
  activePage,
  Players,
  PlayerMap,
  Session,
  PlayersImpact,
  PlayerImpactHistory,
  PlayersActiveTime,
  Verification,
  SessionToBeUploaded,
  PlayersWithTimeStamp,
} from "../types";
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

  // buddiesImpact: BuddiesImpact;
  // setBuddiesImpact: (buddiesImpact: BuddiesImpact) => void;

  playersImpact: PlayersImpact;
  setPlayersImpact: (playersImpact: PlayersImpact) => void;

  playersImpactHistory: PlayerImpactHistory;

  playerDetails: Players;
  setPlayerDetails: (players: Players) => void;
  addPlayer: (
    jersey_number: number,
    player_name: string,
    player_email: string,
    Verification: Verification
  ) => void;
  removePlayer: (player_id: number) => void;
  editPlayer: (
    jersey_number: number,
    player_name: string,
    player_email: string
  ) => void;

  playersActiveTime: PlayersActiveTime;

  playerMap: PlayerMap;
  setPlayerMap: (playerMap: PlayerMap) => void;
  updatePlayerMap: (buddy_id: number, player_id: number) => void;
  deleteFromPlayerMap: (buddy_id: number) => void;

  sessionDetails: Session;
  setSessionDetails: (session: Session) => void;
  updateSessionDetails: (sessionName: string) => void;
  endSession: (save: boolean) => void;

  monitoringBuddies: Set<number>;
  addToMonitoringBuddies: (buddy_id: number) => void;
  removeFromMonitoringBuddies: (buddy_id: number) => void;
}

export const useAppState = create<AppState>()((set) => ({
  //For the sidebar menu item selected, and render main content
  activePage:
    localStorage.getItem("isLoggedInManager") === "true"
      ? "live"
      : localStorage.getItem("isLoggedInPlayer") === "true"
      ? "player-analytics"
      : "profile",
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
  // buddiesImpact: {} as BuddiesImpact,
  // setBuddiesImpact: (buddiesImpact: BuddiesImpact) =>
  //   set({ buddiesImpact: buddiesImpact }),

  //For the players impact
  playersImpact: {} as PlayersImpact,
  setPlayersImpact: (playersImpact: PlayersImpact) =>
    set({ playersImpact: playersImpact }),

  //For the players impact history
  playersImpactHistory: {} as PlayerImpactHistory,

  //TODO: Clashing of players with other dashbaords
  playerDetails: localStorage.getItem("players") as Players | {} as Players,
  setPlayerDetails: (players: Players) => {
    set({ playerDetails: players });
    const timestamp = new Date().getTime();
    const playersWithTimestamp = {
      timestamp,
      players,
    };
    localStorage.setItem("players", JSON.stringify(playersWithTimestamp));
  },
  removePlayer: (player_id: number) => {
    set((prevState) => {
      const playerDetails = { ...prevState.playerDetails };
      delete playerDetails[player_id];

      const timestamp = new Date().getTime();
      const playersWithTimestamp: PlayersWithTimeStamp = {
        timestamp,
        players: playerDetails,
      };
      localStorage.setItem("players", JSON.stringify(playersWithTimestamp));

      return { playerDetails };
    });
  },
  editPlayer: (
    jersey_number: number,
    player_name: string,
    player_email: string
  ) =>
    set((prevState) => {
      const playerDetails = {
        ...prevState.playerDetails,
        [jersey_number]: {
          name: player_name,
          email: player_email,
          verification: prevState.playerDetails[jersey_number]?.verification,
        },
      };

      const timestamp = new Date().getTime();
      const playersWithTimestamp: PlayersWithTimeStamp = {
        timestamp,
        players: playerDetails,
      };
      localStorage.setItem("players", JSON.stringify(playersWithTimestamp));
      return { playerDetails };
    }),
  addPlayer: (
    jersey_number: number,
    player_name: string,
    player_email: string,
    verification: Verification
  ) =>
    set((prevState) => {
      const playerDetails = {
        ...prevState.playerDetails,
        [jersey_number]: {
          name: player_name,
          email: player_email,
          verification: verification,
        },
      };

      const timestamp = new Date().getTime();
      const playersWithTimestamp: PlayersWithTimeStamp = {
        timestamp,
        players: playerDetails,
      };
      localStorage.setItem("players", JSON.stringify(playersWithTimestamp));
      return { playerDetails };
    }),

  //For the player map
  playerMap: {} as PlayerMap,
  setPlayerMap: (playerMap: PlayerMap) => {
    set({ playerMap: playerMap });
  },

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
  deleteFromPlayerMap: (buddy_id: number) => {
    set((prevState) => {
      const playerMap = { ...prevState.playerMap };
      delete playerMap[buddy_id];

      //update monitoringBuddies accordingly, if not in playerMap it should not be in monitoringBuddies
      const monitoringBuddies = new Set(prevState.monitoringBuddies);
      monitoringBuddies.delete(buddy_id);

      //publish new playerMap to mqtt
      MqttClient.getInstance().publishPlayerMap(playerMap);
      return { playerMap, monitoringBuddies };
    });
  },

  //For player active time map
  playersActiveTime: {} as PlayersActiveTime,

  //For the session details
  sessionDetails: {} as Session,
  setSessionDetails: (session: Session) => {
    set({ sessionDetails: session });
    MqttClient.getInstance().publishSession(session);
  },
  updateSessionDetails: (sessionName: string) => {
    set((prevState) => {
      if (prevState.sessionDetails.active === false) {
        return prevState;
      }

      const sessionDetails = { ...prevState.sessionDetails };
      sessionDetails.session_name = sessionName;
      sessionDetails.updatedAt = Date.now();

      // publish session to mqtt
      MqttClient.getInstance().publishSession(sessionDetails);
      return { ...prevState, sessionDetails };
    });
  },
  endSession: (save: boolean) => {
    set((prevState) => {
      const sessionDetails: Session = { ...prevState.sessionDetails };
      sessionDetails.active = false;
      sessionDetails.updatedAt = Date.now();

      if (save) {
        //save session to history
        const playerImpactHistory = { ...prevState.playersImpactHistory };

        // localStorage sessionsToBeUploaded -> [{Session, PLayerImpactHistory}, ...]
        const savedSession: SessionToBeUploaded = {
          session: sessionDetails,
          playerImpactHistory,
        };
        const sessionsToBeUploaded: SessionToBeUploaded[] =
          JSON.parse(localStorage.getItem("sessionsToBeUploaded") as string) ||
          [];
        sessionsToBeUploaded.push(savedSession);
        localStorage.setItem(
          "sessionsToBeUploaded",
          JSON.stringify(sessionsToBeUploaded)
        );
      }

      //clear other states

      // publish session to mqtt
      MqttClient.getInstance().publishSession(sessionDetails);
      return { ...prevState, sessionDetails };
    });
  },

  //for live dashboard monitoring and active buddie
  monitoringBuddies: new Set<number>(),
  addToMonitoringBuddies: (buddy_id: number) => {
    set((prevState) => {
      const monitoringBuddies = new Set(prevState.monitoringBuddies);
      monitoringBuddies.add(buddy_id);
      return { monitoringBuddies };
    });
  },
  removeFromMonitoringBuddies: (buddy_id: number) => {
    set((prevState) => {
      const monitoringBuddies = new Set(prevState.monitoringBuddies);
      monitoringBuddies.delete(buddy_id);
      return { monitoringBuddies };
    });
  },
}));
