/* eslint-disable no-constant-condition */
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
import { syncDevice } from "../../utils/serialCom";

const Devices: React.FC = () => {
  const buddies: Buddies = useAppState((state) => state.buddiesStatus);
  const playerDetails = useAppState((state) => state.playerDetails);
  const playerMap = useAppState((state) => state.playerMap);
  const options: { value: string; label: string }[] = [];

  // let [info, setInfo] = useState(null);

  //find mapped buddy_ids and unmapped buddy_ids
  const mappedBuddies = Object.keys(playerMap).map((buddy_id) =>
    parseInt(buddy_id)
  );
  const unMappedBuddies = Object.keys(buddies)
    .filter((buddy_id: string) => !mappedBuddies.includes(parseInt(buddy_id)))
    .map((buddy_id) => parseInt(buddy_id));

  //get unmapped players
  //has entries in playerDetails but not in playerMap

  for (const jersey_number in playerDetails) {
    //if (playerDetails[jersey_number]) continue; //empty jerysey number
    if (Object.values(playerMap).includes(parseInt(jersey_number))) continue;
    options.push({
      value: jersey_number.toString(),
      label: `${jersey_number} ${playerDetails[jersey_number].name}`,
    });
  }

  //if mqtt is not connected, show no connection page
  let isMqttOnline = useAppState((state) => state.isMqttOnine);
  isMqttOnline = true;
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
          onClick={() => {
            syncDevice();
          }}
        />
        <p className="devicesTotal">
          {Object.keys(buddies).length} Devices Connected
        </p>
      </div>

      {mappedBuddies.length > 0 && (
        <div className={styles.mapped}>
          <h3>Mapped Devices</h3>
          <div className={styles.grid}>
            {mappedBuddies.map((buddy_id: number) => (
              <MappedDevice
                key={buddy_id}
                buddyID={buddy_id}
                batteryLevel={buddies[buddy_id].battery}
                options={options}
                playerID={playerMap[buddy_id]}
              />
            ))}
          </div>
        </div>
      )}

      {unMappedBuddies.length > 0 && (
        <div className={styles.active}>
          <h3>Unmapped Buddies</h3>
          <div className={styles.grid}>
            {unMappedBuddies.map((buddy_id: number) => (
              <MappedDevice
                key={buddy_id}
                buddyID={buddy_id}
                batteryLevel={buddies[buddy_id].battery}
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
