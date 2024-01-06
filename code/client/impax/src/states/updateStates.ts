import { BuddyStatus, Impact } from "../types";
import { useAppState } from "./appState";

export const updateBuddy = (buddy_id: number, battery: number) => {
  const timestamp = Date.now();
  const buddyStatus: BuddyStatus = { battery, timestamp };
  const buddiesStatus = useAppState.getState().buddiesStatus;

  //if buddy_id is not in buddiesState, add it
  //if buddy_id is in buddiesState, update it
  //if battery is 0, delete it
  if (battery === 0) buddiesStatus.delete(buddy_id);
  else buddiesStatus.set(buddy_id, buddyStatus);

  //set state
  useAppState.setState({ buddiesStatus: buddiesStatus });
  console.log(useAppState.getState().buddiesStatus);
};

export const updateImpact = (buddy_id: number, impactString: string) => {
  const magntitude = parseInt(impactString.split(",")[0]);
  const direction = impactString.split(",")[1];
  let impact: Impact;
  try {
    impact = { magntitude, direction } as Impact;
  } catch (error) {
    console.error(error);
    return;
  }

  //mutate buddiesImpact
  const buddiesImpacts = useAppState.getState().buddiesImpact;
  buddiesImpacts.set(buddy_id, impact);

  //set state
  useAppState.setState({ buddiesImpact: buddiesImpacts });
  console.log(useAppState.getState().buddiesImpact);
};
export type activePage =
  | "live"
  | "devices"
  | "analytics"
  | "profile"
  | "test"
  | "player-management";
