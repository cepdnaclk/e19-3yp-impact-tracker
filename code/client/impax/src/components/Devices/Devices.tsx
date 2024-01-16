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

  // let [info, setInfo] = useState(null);

  const start = async () => {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const filters = [
      { usbVendorId: 0x2341, usbProductId: 0x0043 },
      { usbVendorId: 0x2341, usbProductId: 0x0001 },
    ];
    // console.log(navigator);
    if ("serial" in navigator) {
      // console.log(navigator.serial);
      console.log("Yahooo Serial is supported");
      const port = await (navigator.serial as any).requestPort({
        filters,
      });
      console.log(port);
      await port.open({ baudRate: 9600 });
      // console.log("Port Opened", port);
      // Write Data
      // const writer = port.writable.getWriter();
      // try {
      //   await writer.write(encoder.encode("PING\n"));
      //   console.log("Data written successfully");
      // } catch (error) {
      //   console.log(error);
      // } finally {
      //   writer.releaseLock();
      // }
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const encoder = new TextEncoder();
      const writer = port.writable.getWriter();
      await writer.write(encoder.encode("request"));

      writer.releaseLock();

      // pause execution for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // port.close();
      // console.log("Closed");
      // Read Data
      while (port.readable) {
        const reader = port.readable.getReader();
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              // |reader| has been canceled.
              break;
            }
            console.log(decoder.decode(value.buffer));
            // Do something with |value|...
          }
        } catch (error) {
          // Handle |error|...
        } finally {
          reader.releaseLock();
        }
      }

      // Close the port.

      // Allow the serial port to be closed later.
      // The Web Serial API is supported.
      // const filters = [{ usbVendorId: 6790 }];
      // // Prompt user to select an Arduino Uno device.
      // const port = await (navigator.serial as Serial).requestPort({ filters });
      // // const { usbProductId, usbVendorId } = port.getInfo();
      // console.log(port.send(222));
      // port && setInfo(port.getInfo());
    } else {
      console.log("its not");
    }
  };

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
            start();
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
