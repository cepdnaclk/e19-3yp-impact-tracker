import MqttClient from "../services/mqttClient";
import { BuddyStatus, Impact } from "../types";
import { useAppState } from "./appState";

export const updateBuddy = (buddy_id: number, battery: number) => {
  const timestamp = Date.now();
  const buddyStatus: BuddyStatus = { battery, timestamp };

  //if buddy_id is not in buddiesState, add it
  //if buddy_id is in buddiesState, update it
  //if battery is 0, delete it

  //The deleting will be important as we will be checking for unavailable buddies, and
  //the client-dashboards will be publishing a 0 status when buddies are disconnected
  //Note: buddies will be sending retained messages

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
};

export const updateImpact = (buddy_id: number, impactString: string) => {
  //Example impactString: "10 Left"
  const magntitude = parseInt(impactString.split(" ")[0]);
  const direction = impactString.split(" ")[1];
  const timestamp = Date.now();
  const impact: Impact = { magntitude, direction, timestamp } as Impact;

  //update playersImpact state with impact
  useAppState.setState((prevState) => {
    const playersImpact = { ...prevState.playersImpact };
    const player_id = prevState.playerMap[buddy_id];
    if (player_id === undefined) return prevState;
    playersImpact[player_id] = impact;
    return { playersImpact };
  });
};

export const setPlayerMap = (playerMapString: string) => {
  //Parse playerMapString and set playerMap
  const playerMap = JSON.parse(playerMapString);
  useAppState.setState({ playerMap: playerMap });

  //update monitoringBuddies accordingly, if not in playerMap it should not be in monitoringBuddies
  useAppState.setState((prevState) => {
    const monitoringBuddies = new Set(prevState.monitoringBuddies);

    Object.keys(playerMap).forEach((buddy_id) => {
      if (!(buddy_id in playerMap)) {
        monitoringBuddies.delete(parseInt(buddy_id));
      }
    });

    return { monitoringBuddies };
  });
};

export const setSessionDetails = (sessionString: string) => {
  //Parse sessionString and set sessionDetails
  //If sessionString is "end", set sessionDetails to null

  if (sessionString === "end") {
    useAppState.setState({ sessionDetails: null });
    return;
  }

  const session = JSON.parse(sessionString);
  useAppState.setState({ sessionDetails: session });
};

const checkBuddiesAvailability = () => {
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

  //publish the buddy status 0 to mqtt, so other clients will be able to invalidate the buddy
  unavailableBuddies.forEach((buddy_id) => {
    MqttClient.getInstance().publishBuddyStatus(parseInt(buddy_id), 0);
  });
};

//check buddies availability every 60 seconds
setInterval(checkBuddiesAvailability, 60000);

//active pages for the dashboard, used for the sidebar
export type activePage =
  | "live"
  | "devices"
  | "analytics"
  | "profile"
  | "test"
  | "player-management";
