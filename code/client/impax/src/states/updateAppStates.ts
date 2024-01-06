import { BuddyStatus, Impact } from "../types";
import { useAppState } from "./appState";

export const updateBuddy = (buddy_id: number, battery: number) => {
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
  const impact: Impact = { magntitude, direction } as Impact;

  useAppState.setState((prevState) => {
    const buddiesImpact = { ...prevState.buddiesImpact };
    buddiesImpact[buddy_id] = impact;
    return { buddiesImpact };
  });

  console.log(useAppState.getState().buddiesImpact);
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

  //set buddiesStatus
  useAppState.setState((prevState) => {
    const buddiesStatus = { ...prevState.buddiesStatus };

    unavailableBuddies.forEach((buddy_id) => {
      delete buddiesStatus[parseInt(buddy_id)];
    });

    return { buddiesStatus };
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
