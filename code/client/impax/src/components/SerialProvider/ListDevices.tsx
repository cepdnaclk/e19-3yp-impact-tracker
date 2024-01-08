// devices.js
import React, { useState, useEffect } from "react";
import SerialPort from "serialport";
// interface SerialPortInfo {
//   path: string;
//   manufacturer: string;
//   product: string;
//   // ...other port properties
// }

const ListDevices = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Use Node.js API to list serial ports
    SerialPort.list().then((ports) => {
      setDevices(
        ports.map((port) => ({
          path: port.path,
          manufacturer: port.manufacturer,
          product: port.product,
          // ...other port properties
        }))
      );
    });
  }, []);

  return (
    <ul>
      {devices.map((device) => (
        <li key={device.path}>
          {device.path} - {device.manufacturer} {device.product}
        </li>
      ))}
    </ul>
  );
};

export default ListDevices;
