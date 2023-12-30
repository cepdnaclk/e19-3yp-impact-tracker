// import SerialPort from "serialport";
// function testIt() {
//   console.log("HELLOO");
//   SerialPort.list().then((ports, err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(ports[0]);
//     }
//   });

//   //   // Specify the port name of your Arduino board

//   //   // Create a new SerialPort instance
//   //   const port = new SerialPort({
//   //     path: "/dev/ttyACM0",
//   //     baudRate: 115200, // Replace with the appropriate baud rate
//   //   });

//   //   // Open the serial port
//   //   // await port.open();
//   //   console.log("Port Opened");
//   //   // Reading DATA
//   //   // const parser = port.pipe(new Readline({ delimiter: "\r\n" }));
//   //   // console.log(parser);
//   //   // port.write(Buffer.from("Hi Mom! "));

//   //   port.on("data", function (data) {
//   //     console.log("Data:", data.toString());
//   //   });

//   //   // Writing Data
// }

// // // testIt();
// document.getElementById("clickme").addEventListener("click", testIt);

// // // OLD CODE

// // // const filters = [
// // //   { usbVendorId: 0x2341, usbProductId: 0x0043 },
// // //   { usbVendorId: 0x2341, usbProductId: 0x0001 },
// // // ];
// // // try {

// // // Close the port when finished
// // // const portInfo = port.getInfo();
// // // console.log(portInfo);
// // // document.getElementById(
// // //   "device-name"
// // // ).innerHTML = `vendorId: ${portInfo.usbVendorId} | productId: ${portInfo.usbProductId} `;
// // // } catch (ex) {
// // //   if (ex.name === "NotFoundError") {
// // //     document.getElementById("device-name").innerHTML = "Device NOT found";
// // //   } else {
// // //     document.getElementById("device-name").innerHTML = ex;
// // //   }
// // // }

const decoder = new TextDecoder();

async function testIt() {
  const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 },
  ];
  try {
    // console.log(navigator.serial.getPorts()[0].getInfo());
    // const ports = await navigator.serial.getPorts();

    // console.log(ports);
    const port = await navigator.serial.requestPort({ filters });
    // console.log(await navigator.serial.getPorts());

    // console.log(ports);
    await port.open({ baudRate: 115200 });
    console.log("Port Opened");
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
    const portInfo = port.getInfo();
    // console.log(portInfo);
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
