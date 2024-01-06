import { useAppState } from "./appState";

const updateBuddy = (buddy_id: number, battery: number) => {
  const timestamp = Date.now();
  const buddyStatus = { battery, timestamp };
  // useAppState.setState( {buddiesState: } )
};
