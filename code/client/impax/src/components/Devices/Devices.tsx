import React from "react";
import Title from "../Title/Title";
import { MdDeviceHub } from "react-icons/md";
import styles from "./Devices.module.scss";
import Btn from "../Buttons/Btn";
import { IoAdd } from "react-icons/io5";
import MappedDevice from "./Card/MappedDevice";
// import Modal from "../Modal/Modal";

const Devices: React.FC = () => {
  // const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <main className="main">
      <Title title="Device Connectivity" Icon={MdDeviceHub} />
      <div className={styles.summary}>
        <Btn
          Icon={IoAdd}
          // onClick={() => setOpen(true)}
          children="Add new device"
          buttonStyle="secondary"
        />
        <p className="devicesTotal">9 Devices Connected</p>
      </div>

      {/* Add Device Modal */}
      {/* <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <div
          style={{ width: "200px", height: "400px", backgroundColor: "red" }}
        >
          Test
        </div>
      </Modal> */}

      <div className={styles.mapped}>
        <h3>Mapped Devices</h3>
        <div className={styles.grid}>
          <MappedDevice batteryLevel={10} deviceID="#124" />
          <MappedDevice batteryLevel={100} deviceID="#42" />
          <MappedDevice batteryLevel={40} deviceID="#12" />
          <MappedDevice batteryLevel={80} deviceID="#213" />
        </div>
      </div>
    </main>
  );
};

export default Devices;
