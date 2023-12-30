function getDeviceDetails(device) {
  return device.productName || `Unknown device ${device.deviceId}`;
}

async function testIt() {
  const noDevicesFoundMsg = "No devices found";
  const grantedDevices = await navigator.usb.getDevices();
  let grantedDeviceList = "";
  if (grantedDevices.length > 0) {
    for (const device of grantedDevices) {
      grantedDeviceList += `<hr>${getDeviceDetails(device)}</hr>`;
    }
  } else {
    grantedDeviceList = noDevicesFoundMsg;
  }
  const grantedDevicesElement = document.getElementById("granted-devices");
  if (grantedDevicesElement) {
    grantedDevicesElement.innerHTML = grantedDeviceList;
  }

  grantedDeviceList = "";
  try {
    const grantedDevice = await navigator.usb.requestDevice({
      filters: [],
    });
    grantedDeviceList += `<hr>${getDeviceDetails(grantedDevice)}</hr>`;
  } catch (ex) {
    if (ex.name === "NotFoundError") {
      grantedDeviceList = noDevicesFoundMsg;
    }
  }
  const grantedDevicesElement2 = document.getElementById("granted-devices2");
  if (grantedDevicesElement2) {
    grantedDevicesElement2.innerHTML = grantedDeviceList;
  }
}

const clickmeElement = document.getElementById("clickme");
if (clickmeElement) {
  clickmeElement.addEventListener("click", testIt);
}
