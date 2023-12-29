import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import { MdDeviceHub } from "react-icons/md";
import styles from "./Devices.module.scss";
import Btn from "../Buttons/Btn";
import { IoAdd } from "react-icons/io5";
import MappedDevice from "./Card/MappedDevice";
import Modal from "../Modal/Modal";

const Devices: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  // const [connectedDevices, setConnectedDevices] = useState<unknown[]>([]);

  // useEffect(() => {
  //   async function listUsbDevices() {
  //     try {
  //       // const devices = getDeviceList();

  //       // for (const device of devices) {
  //       //   console.log(device); // Legacy device
  //       // }
  //       const devices = await usb.getDeviceList();
  //       const deviceInfo = devices.map((device) => ({
  //         vendorId: device.deviceDescriptor.idVendor,
  //         productId: device.deviceDescriptor.idProduct,
  //         description: device.deviceDescriptor.iProduct,
  //         manufacturer: device.deviceDescriptor.iManufacturer,
  //         serialNumber: device.deviceDescriptor.iSerialNumber,
  //       }));
  //       console.log(deviceInfo);
  //       // setConnectedDevices(deviceInfo);
  //     } catch (error) {
  //       console.error("Error retrieving USB devices:", error);
  //     }
  //   }

  //   listUsbDevices();
  // }, []);

  return (
    <main className="main">
      <Title title="Device Connectivity" Icon={MdDeviceHub} />
      <div className={styles.summary}>
        <Btn
          Icon={IoAdd}
          onClick={() => setOpen(true)}
          children="Add new device"
          buttonStyle="secondary"
        />
        <p className="devicesTotal">9 Devices Connected</p>
      </div>

      {/* Add Device Modal */}
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <div
          style={{ width: "200px", height: "400px", backgroundColor: "red" }}
        >
          Test
        </div>
      </Modal>

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
