import { players } from "../data/players";
import MqttClient from "../services/mqttClient";
import {
  BuddyStatus,
  Impact,
  PlayerImpactHistory,
  PlayerMap,
  Players,
  PlayersImpact,
  PlayersWithTimeStamp,
  Session,
} from "../types";
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

export const updateImpact = (player_id: number, impactString: string) => {
  //Example impactString: "10 Left 123456789"
  const magnitude: number = parseInt(impactString.trim().split(" ")[0]);
  const direction = impactString.split(" ")[1];
  const timestamp = parseInt(impactString.split(" ")[2]);

  const impact: Impact = {
    magnitude,
    direction,
    timestamp,
  } as Impact;

  console.log(impact);
  //update playersImpact state with impact
  useAppState.setState((prevState) => {
    const playersImpact = { ...prevState.playersImpact };
    playersImpact[player_id] = impact;
    console.log("Added to playersImpact", playersImpact);
    return { playersImpact };
  });
};

export const setPlayerMap = (playerMapString: string) => {
  //Parse playerMapString and set playerMap
  const playerMap = JSON.parse(playerMapString);

  //update monitoringBuddies accordingly, if not in playerMap it should not be in monitoringBuddies
  useAppState.setState((prevState) => {
    const monitoringBuddies = new Set(prevState.monitoringBuddies);

    //for each buddy_id in monitoringBuddies, check if it is in playerMap
    //if not, delete it from monitoringBuddies
    monitoringBuddies.forEach((buddy_id) => {
      if (!playerMap[buddy_id]) {
        monitoringBuddies.delete(buddy_id);
      }
    });

    return { monitoringBuddies };
  });
  useAppState.setState({ playerMap: playerMap });
};

export const setSessionDetails = (sessionString: string) => {
  //Parse sessionString and set sessionDetails
  const session = JSON.parse(sessionString);
  useAppState.setState({ sessionDetails: session });
};

export const checkBuddiesAvailability = () => {
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

export const updatePlayersImpactHistory = (
  player_id: number,
  impactHistoryString: string
) => {
  //update players impact history
  const impactHistory = JSON.parse(impactHistoryString) as Impact[];
  useAppState.setState((prevState) => {
    const playersImpactHistory = { ...prevState.playersImpactHistory };
    playersImpactHistory[player_id] = impactHistory;
    return { playersImpactHistory };
  });
};

//Flush all the states if the hub is disconnected
export const flushStates = () => {
  useAppState.setState({
    buddiesStatus: {} as BuddyStatus,
    playerMap: {} as PlayerMap,
    monitoringBuddies: new Set() as Set<number>,
    playersImpact: {} as PlayersImpact,
    playersImpactHistory: {} as PlayerImpactHistory,
    sessionDetails: {} as Session,
  });
};

//update Players in state and local storage
export const updatePlayersDetails = (players: Players) => {
  useAppState.setState({ playerDetails: players });
  const timestamp = new Date().getTime();
  const playersWithTimestamp: PlayersWithTimeStamp = {
    timestamp,
    players,
  };
  localStorage.setItem("players", JSON.stringify(playersWithTimestamp));
};

//validate timestamp and set player details
export const validateTimestampAndSetPlayerDetails = (message: string) => {
  const playersWithTimestamp: PlayersWithTimeStamp = JSON.parse(
    message
  ) as PlayersWithTimeStamp;
  const players: Players = playersWithTimestamp.players;
  const timestamp: number = playersWithTimestamp.timestamp;

  const currentPlayersWithTimestamp = JSON.parse(
    localStorage.getItem("players") as string
  ) as PlayersWithTimeStamp;
  const currentTimestamp = currentPlayersWithTimestamp.timestamp;

  if (timestamp > currentTimestamp) {
    updatePlayersDetails(players);
  }
};
