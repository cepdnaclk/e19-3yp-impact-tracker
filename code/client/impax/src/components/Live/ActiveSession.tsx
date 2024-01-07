import styles from "./ActiveSession.module.scss";
import { FaEdit, FaTimes } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import Btn from "../Buttons/Btn";
import MonitoringCard from "./Card/MonitoringCard";
import ActiveCard from "./Card/ActiveCard";
import AlertModal from "../Modal/AlertModal";
import { useAppState } from "../../states/appState";
import DialogModal from "../Modal/DialogModal";
import { useState } from "react";

const ActiveSession = () => {
  const buddiesStatus = useAppState((state) => state.buddiesStatus);
  const sessionDetails = useAppState((state) => state.sessionDetails);
  const updateSessionDetails = useAppState(
    (state) => state.updateSessionDetails
  );
  const endSession = useAppState((state) => state.endSession);
  const playerMap = useAppState((state) => state.playerMap);
  const [editSessionName, setEditSessionName] = useState<string>(
    sessionDetails?.session_name || ""
  );
  const monitoringBuddies = useAppState((state) => state.monitoringBuddies);
  const addToMonitoringBuddies = useAppState(
    (state) => state.addToMonitoringBuddies
  );
  const removeFromMonitoringBuddies = useAppState(
    (state) => state.removeFromMonitoringBuddies
  );

  const activeBuddies = new Set<number>(
    Object.keys(playerMap)
      .map((buddy_id) => parseInt(buddy_id))
      .filter((x) => !monitoringBuddies.has(x) && x in buddiesStatus)
  );

  const handleAddToMonitoring = (buddy_id: number) => {
    addToMonitoringBuddies(buddy_id);
  };

  const handleRemoveFromMonitoring = (buddy_id: number) => {
    removeFromMonitoringBuddies(buddy_id);
  };

  const handleEditSessionName = () => {
    updateSessionDetails(editSessionName);
  };
  //Time object of 15 mins and 5 mins before for testing
  // const currentDate = new Date();
  // const fifteenMinutesBefore = new Date(currentDate.getTime() - 15 * 60 * 1000);
  // const fiveMinutesBefore = new Date(currentDate.getTime() - 4 * 60 * 1000);
  // const eightMinutesBefore = new Date(currentDate.getTime() - 8 * 60 * 1000);
  return (
    <>
      <div className={styles.session}>
        <div className={styles.info}>
          <h2>{sessionDetails?.session_name}</h2>
          <span>Session Id: {sessionDetails?.session_id}</span>
        </div>
        <div className={styles.controls}>
          <DialogModal
            title="Edit Session"
            description="Enter new session name"
            trigger={
              <Btn Icon={FaEdit} buttonStyle="secondary">
                Edit Session
              </Btn>
            }
            confirmButton={
              <Btn
                Icon={FaEdit}
                buttonStyle="primary"
                onClick={handleEditSessionName}
              >
                Confirm Changes
              </Btn>
            }
          >
            <div className={styles.editSessionField}>
              <label htmlFor="sessionName">Session Name</label>
              <input
                type="text"
                id="sessionName"
                value={editSessionName}
                onChange={(e) => setEditSessionName(e.target.value)}
              />
            </div>
          </DialogModal>
          <AlertModal
            trigger={<Btn Icon={IoMdExit}>Exit Session</Btn>}
            title="Are you sure to exit session?"
            description="Session data will be downloaded to your computer and uploaded when connected to the internet"
            action={
              <Btn Icon={IoMdExit} onClick={endSession}>
                Confirm Exit
              </Btn>
            }
            cancel={<Btn Icon={FaTimes}>Cancel</Btn>}
          />
        </div>
      </div>
      {monitoringBuddies.size > 0 && (
        <div className={styles.monitoring}>
          <h3>Monitoring Players</h3>
          <div className={styles.grid}>
            {[...monitoringBuddies].map((buddy_id) => (
              <MonitoringCard
                key={buddy_id}
                buddy_id={buddy_id}
                onClick={handleRemoveFromMonitoring}
              />
            ))}
          </div>
        </div>
      )}
      {activeBuddies.size > 0 && (
        <div className={styles.active}>
          <h3>Active Players</h3>
          <div className={styles.grid}>
            {[...activeBuddies].map((buddy_id) => (
              <ActiveCard
                key={buddy_id}
                buddy_id={buddy_id}
                onClick={handleAddToMonitoring}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveSession;
