const decoder = new TextDecoder();
// async function testIt() {
//   const filters = [
//     { usbVendorId: 0x2341, usbProductId: 0x0043 },
//     { usbVendorId: 0x2341, usbProductId: 0x0001 },
//   ];
//   try {
//     // console.log(navigator.serial.getPorts()[0].getInfo());
//     const ports = await navigator.serial.getPorts();

//     // console.log(await navigator.serial.getPorts());
//     console.log(ports);
//     const port = await navigator.serial.requestPort({ filters });

//     // console.log(ports);
//     await port.open({ baudRate: 115200 });
//     console.log("Port Opened", port);
//     // Read Data
//     // while (port.readable) {
//     //   const reader = port.readable.getReader();
//     //   try {
//     //     while (true) {
//     //       const { value, done } = await reader.read();
//     //       if (done) {
//     //         // |reader| has been canceled.
//     //         break;
//     //       }
//     //       console.log(decoder.decode(value.buffer));
//     //       // Do something with |value|...
//     //     }
//     //   } catch (error) {
//     //     // Handle |error|...
//     //   } finally {
//     //     reader.releaseLock();
//     //   }
//     // }

//     // Write Data

//     // const encoder = new TextEncoder();
//     // const writer = port.writable.getWriter();
//     // await writer.write(new Uint8Array([65]));
//     // writer.releaseLock();

//     // Read Data
//     // while (port.readable) {
//     //   const reader = port.readable.getReader();
//     //   try {
//     //     while (true) {
//     //       const { value, done } = await reader.read();
//     //       if (done) {
//     //         reader.releaseLock();
//     //         // |reader| has been canceled.
//     //         break;
//     //       }
//     //       // console.log(decoder.decode(value.buffer));
//     //       // Do something with |value|...
//     //       console.log(value);
//     //     }
//     //   } catch (error) {
//     //     // Handle |error|...
//     //   } finally {
//     //     reader.releaseLock();
//     //   }
//     // }

//     const portInfo = port.getInfo();
//     // console.log(portInfo);
//     document.getElementById(
//       "device-name"
//     ).innerHTML = `vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `;
//   } catch (ex) {
//     if (ex.name === "NotFoundError") {
//       document.getElementById("device-name").innerHTML = "Device NOT found";
//     } else {
//       document.getElementById("device-name").innerHTML = ex;
//     }
//   }
// }

// document.getElementById("clickme").addEventListener("click", testIt);

async function testIt() {
  const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 },
  ];

  try {
    const port = await navigator.serial.requestPort({ filters });
    // console.log(port);
    await port.open({ baudRate: 115200 });
    console.log("Port Opened");

    while (port.readable) {
      const reader = port.readable.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            reader.releaseLock();
            // |reader| has been canceled.
            break;
          }
          console.log(decoder.decode(value.buffer));
          // Do something with |value|...
          // console.log(value);
        }
      } catch (error) {
        // Handle |error|...
      } finally {
        reader.releaseLock();
      }
    }

    const portInfo = port.getInfo();
    document.getElementById(
      "device-name"
    ).innerHTML = `vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `;
  } catch (ex) {
    if (ex.name === "NotFoundError") {
      document.getElementById("device-name").innerHTML = "Device NOT found";
    } else {
      document.getElementById("device-name").innerHTML = ex;
    }
  }
}

document.getElementById("clickme").addEventListener("click", testIt);
