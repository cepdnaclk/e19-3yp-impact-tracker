import React from "react";
import Title from "../Title/Title";
import { MdDeviceHub } from "react-icons/md";
import styles from "./Devices.module.scss";
import Btn from "../Buttons/Btn";
import { IoAdd } from "react-icons/io5";
import MappedDevice from "./Card/MappedDevice";
import { useAppState } from "../../states/appState";
import { Buddies } from "../../types";
import NoMqttConnection from "../StatusScreens/NoMqttConnection";

const Devices: React.FC = () => {
  const buddies: Buddies = useAppState((state) => state.buddiesStatus);
  const playerDetails = useAppState((state) => state.playerDetails);
  const playerMap = useAppState((state) => state.playerMap);
  const options: { value: string; label: string }[] = [];

  //find mapped buddy_ids and unmapped buddy_ids
  const mappedBuddies = Object.keys(buddies).filter(
    (buddy_id: string) => parseInt(buddy_id) in playerMap
  );
  const unMappedBuddies = Object.keys(buddies).filter(
    (buddy_id: string) => !mappedBuddies.includes(buddy_id)
  );

  for (const buddy_id in unMappedBuddies) {
    const jersey_number = playerMap[parseInt(buddy_id)];
    if (jersey_number === undefined) continue;
    options.push({
      value: jersey_number.toString(),
      label: `${jersey_number} ${playerDetails[jersey_number].name}`,
    });
  }

  //if mqtt is not connected, show no connection page
  const isMqttOnline = useAppState((state) => state.isMqttOnine);
  if (!isMqttOnline) {
    return (
      <main className="main">
        <Title title="Buddy Connectivity" Icon={MdDeviceHub} />
        <NoMqttConnection />
      </main>
    );
  }
  return (
    <main className="main">
      <Title title="Buddy Connectivity" Icon={MdDeviceHub} />
      <div className={styles.summary}>
        <Btn
          Icon={IoAdd}
          // onClick={() => setOpen(true)}
          children="Add new device"
          buttonStyle="secondary"
        />
        <p className="devicesTotal">
          {Object.keys(buddies).length} Devices Connected
        </p>
      </div>

      {mappedBuddies.length > 0 && (
        <div className={styles.mapped}>
          <h3>Mapped Devices</h3>
          <div className={styles.grid}>
            {mappedBuddies.map((buddy_id: string) => (
              <MappedDevice
                key={parseInt(buddy_id)}
                buddyID={parseInt(buddy_id)}
                batteryLevel={buddies[parseInt(buddy_id)].battery}
                options={options}
                playerID={playerMap[parseInt(buddy_id)]}
              />
            ))}
          </div>
        </div>
      )}

      {unMappedBuddies.length > 0 && (
        <div className={styles.active}>
          <h3>Unmapped Buddies</h3>
          <div className={styles.grid}>
            {unMappedBuddies.map((buddy_id: string) => (
              <MappedDevice
                key={parseInt(buddy_id)}
                buddyID={parseInt(buddy_id)}
                batteryLevel={buddies[parseInt(buddy_id)].battery}
                options={options}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Devices;
