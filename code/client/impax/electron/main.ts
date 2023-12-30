import { app, BrowserWindow ,Session,PermissionCheckHandlerHandlerDetails,USBDevice, HIDDevice, DevicePermissionHandlerHandlerDetails} from 'electron'
import path from 'node:path'
// import * as usb from "usb";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

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
// logConnectedUSBDevices();

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

/* */














/**/


  // ************** WebUSB API START **************
  let grantedDeviceThroughPermHandler: Electron.USBDevice | Electron.HIDDevice | Electron.SerialPort;

  win.webContents.session.on(
    "select-usb-device",
    (event, details, callback) => {
      // Add events to handle devices being added or removed before the callback on
      // `select-usb-device` is called.
      if (win) {
        win.webContents.session.on("usb-device-added", (event, device) => {
          console.log("usb-device-added FIRED WITH", device);
          // Optionally update details.deviceList
        });

        win.webContents.session.on(
          "usb-device-removed",
          (event, device) => {
            console.log("usb-device-removed FIRED WITH", device);
            // Optionally update details.deviceList
          }
        );
      }

      interface DeviceWithId {
        deviceId: string;
      }
      
      let grantedDeviceThroughPermHandler: USBDevice | HIDDevice | DeviceWithId;
      event.preventDefault();
      if (details.deviceList && details.deviceList.length > 0) {
        const deviceToReturn = details.deviceList.find((device) => {
          return (
            !grantedDeviceThroughPermHandler ||
            device .deviceId !== grantedDeviceThroughPermHandler.deviceId
          );
        });
        if (deviceToReturn) {
          callback(deviceToReturn.deviceId);
        } else {
          callback();
        }
      }
    }
  );

  (webContents: Electron.WebContents | null, permission: string, _requestingOrigin: string, details: PermissionCheckHandlerHandlerDetails) => {
    if (permission === "usb" && details.securityOrigin === "file:///") {
      return true;
    }
  };

  (win.webContents.session as Session).setDevicePermissionHandler((details:DevicePermissionHandlerHandlerDetails) => {
    if (details.deviceType === "usb" && details.origin === "file://") {
      if (!grantedDeviceThroughPermHandler) {
        grantedDeviceThroughPermHandler = details.device as USBDevice;
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
  });

  win.webContents.session.setUSBProtectedClassesHandler((details) => {
    return details.protectedClasses.filter((usbClass) => {
      // Exclude classes except for audio classes
      return usbClass.indexOf("audio") === -1;
    });
  });








  // ******** WebUSB API END ********

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
