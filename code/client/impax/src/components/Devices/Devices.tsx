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
import DialogModal from "../Modal/DialogModal";
import { FieldValues, useForm } from "react-hook-form";

const Devices: React.FC = () => {
  const buddies: Buddies = useAppState((state) => state.buddiesStatus);
  const playerDetails = useAppState((state) => state.playerDetails);
  const playerMap = useAppState((state) => state.playerMap);
  const options: { value: string; label: string }[] = [];

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

  const [addBuddyOpen, setAddBuddyOpen] = React.useState<boolean>(false);
  //if mqtt is not connected, show no connection page
  const isMqttOnline = useAppState((state) => state.isMqttOnine);

  // form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    await syncDevice(data.SSID, data.password);
    reset();
    setAddBuddyOpen(false);
  };
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
        <div className={styles.info}>
          <h3>Configure Buddy, and Map Players</h3>
          <span className="devicesTotal">
            {Object.keys(buddies).length} Devices Connected
          </span>
        </div>
        <div className={styles.controls}>
          <DialogModal
            open={addBuddyOpen}
            setOpen={setAddBuddyOpen}
            title="Add new buddy"
            description="Please connect the buddy to the computer and enter the Hub's WiFi credentials."
            trigger={
              <Btn
                Icon={IoAdd}
                children="Add new buddy"
                buttonStyle="primary"
              />
            }
          >
            <form
              className={styles.newBuddyForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="SSID">WiFi SSID</label>
              {errors.SSID && <p>{`${errors.SSID?.message}`}</p>}
              <input
                {...register("SSID", { required: true })}
                type="text"
                name="SSID"
                placeholder="Impax-Hub"
                id="SSID"
              />
              <label htmlFor="password">Password</label>
              {errors.password && <p>{`${errors.password?.message}`}</p>}
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                placeholder="*******"
              />
              <Btn
                type="submit"
                buttonStyle="primary"
                children="Add New Buddy"
                Icon={IoAdd}
                disabled={isSubmitting}
                // onClick={() => {
                //   syncDevice();
                //   //TODO: if success, close modal, else show error
                //   setAddBuddyOpen(false);
                // }}
              />
            </form>
          </DialogModal>
        </div>
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
