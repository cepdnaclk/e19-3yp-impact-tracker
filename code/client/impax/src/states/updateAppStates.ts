import MqttClient from "../services/mqttClient";
import { BuddyStatus, Impact } from "../types";
import { useAppState } from "./appState";

export const updateBuddy = (buddy_id: number, battery: number) => {
  console.log("updating buddy", buddy_id, battery);
  const timestamp = Date.now();
  const buddyStatus: BuddyStatus = { battery, timestamp };

  //if buddy_id is not in buddiesState, add it
  //if buddy_id is in buddiesState, update it
  //if battery is 0, delete it
  //updateSet
  useAppState.setState((prevState) => {
    const buddiesStatus = { ...prevState.buddiesStatus };

    if (battery === 0) {
      delete buddiesStatus[buddy_id];
    } else {
      buddiesStatus[buddy_id] = buddyStatus;
    }

    return { buddiesStatus };
  });

  console.log(useAppState.getState().buddiesStatus);
};

export const updateImpact = (buddy_id: number, impactString: string) => {
  const magntitude = parseInt(impactString.split(" ")[0]);
  const direction = impactString.split(" ")[1];
  const timestamp = Date.now();
  const impact: Impact = { magntitude, direction, timestamp } as Impact;

  useAppState.setState((prevState) => {
    const playersImpact = { ...prevState.playersImpact };
    const player_id = prevState.playerMap[buddy_id];
    if (player_id === undefined) return prevState;
    playersImpact[player_id] = impact;
    return { playersImpact };
  });

  console.log(useAppState.getState().playersImpact);
};

export const setPlayerMap = (playerMapString: string) => {
  const playerMap = JSON.parse(playerMapString);
  useAppState.setState({ playerMap: playerMap });
};

export const setSessionDetails = (sessionString: string) => {
  if (sessionString === "end") {
    useAppState.setState({ sessionDetails: null });
    return;
  }

  const session = JSON.parse(sessionString);
  useAppState.setState({ sessionDetails: session });
};

const checkBuddiesAvailability = () => {
  console.log("checking buddies availability");

  //check if all buddies are available
  //if timestamp is more than 60 seconds ago, remove from buddiesStatus

  const buddiesStatus = useAppState.getState().buddiesStatus;

  //iterate through buddiesStatus and find if any buddy is not available
  const unavailableBuddies = Object.keys(buddiesStatus).filter((buddy_id) => {
    const timestamp = buddiesStatus[parseInt(buddy_id)].timestamp;
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;

    return timeDifference > 60000;
  });

  if (unavailableBuddies.length === 0) {
    return;
  }

  console.log("unavailable buddies", unavailableBuddies);

  //set buddiesStatus
  useAppState.setState((prevState) => {
    const buddiesStatus = { ...prevState.buddiesStatus };

    unavailableBuddies.forEach((buddy_id) => {
      delete buddiesStatus[parseInt(buddy_id)];
    });

    return { buddiesStatus };
  });

  //remove buddy from player map -> set playerMap
  useAppState.setState((prevState) => {
    const playerMap = { ...prevState.playerMap };

    unavailableBuddies.forEach((buddy_id) => {
      delete playerMap[parseInt(buddy_id)];
    });

    MqttClient.getInstance().publishPlayerMap(playerMap);
    return { playerMap };
  });

  // if in monitoring buddies, remove from monitoring buddies
  useAppState.setState((prevState) => {
    const monitoringBuddies = new Set(prevState.monitoringBuddies);

    unavailableBuddies.forEach((buddy_id) => {
      monitoringBuddies.delete(parseInt(buddy_id));
    });

    return { monitoringBuddies };
  });
};

//check buddies availability every 60 seconds
setInterval(checkBuddiesAvailability, 60000);

export type activePage =
  | "live"
  | "devices"
  | "analytics"
  | "profile"
  | "test"
  | "player-management";
