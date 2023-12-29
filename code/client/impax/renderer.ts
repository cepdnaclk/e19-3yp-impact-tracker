// import { usb, getDeviceList } from "usb";
// const devices: usb.Device[] = getDeviceList();
// function getDeviceDetails(device) {
//   return device.productName || `Unknown device ${device.deviceId}`;
// }

// async function testIt() {
//   const noDevicesFoundMsg = "No devices found";
//   const grantedDevices = await navigator.usb.getDevices();
//   let grantedDeviceList = "";
//   if (grantedDevices.length > 0) {
//     for (const device of grantedDevices) {
//       grantedDeviceList += `<hr>${getDeviceDetails(device)}</hr>`;
//     }
//   } else {
//     grantedDeviceList = noDevicesFoundMsg;
//   }
//   document.getElementById("granted-devices").innerHTML = grantedDeviceList;

//   grantedDeviceList = "";
//   try {
//     const grantedDevice = await navigator.usb.requestDevice({
//       filters: [],
//     });
//     grantedDeviceList += `<hr>${getDeviceDetails(grantedDevice)}</hr>`;
//   } catch (ex) {
//     if (ex.name === "NotFoundError") {
//       grantedDeviceList = noDevicesFoundMsg;
//     }
//   }
//   document.getElementById("granted-devices2").innerHTML = grantedDeviceList;
// }

// document.getElementById("clickme").addEventListener("click", testIt);
console.log(devices);
// async function logConnectedUSBDevices() {
//   try {
//     const devices = await usb.getDeviceList();
//     console.log("Connected USB devices:");
//     for (const device of devices) {
//       console.log(device);
//     }
//   } catch (error) {
//     console.error("Error getting USB device list:", error);
//   }
// }

// // Call the function early in your main.ts file
// await logConnectedUSBDevices();
