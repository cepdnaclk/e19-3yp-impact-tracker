/* eslint-disable no-constant-condition */

export async function sendData(
  message: string,
  port: SerialPort,
  encoder: TextEncoder
) {
  const writer = port.writable?.getWriter();
  try {
    await writer?.write(encoder.encode(message + "\n")); // Add newline for clarity
    console.log(`Message sent: ${message}`);
  } catch (error) {
    console.error("Error writing message:", error);
  } finally {
    writer?.releaseLock();
  }
}

export async function readData(port: SerialPort, decoder: TextDecoder) {
  let message = "";
  while (port.readable) {
    const reader = port.readable.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // |reader| has been canceled.
          break;
        }
        message += decoder.decode(value.buffer);
        // console.log(message);
        return message.trim();
        // console.log(decoder.decode(value.buffer));
        // Do something with |value|...
      }
    } catch (error) {
      // Handle |error|...
    } finally {
      reader.releaseLock();
    }
  } // Remove potential trailing newline
  return message;
}

export const syncDevice = async (ssid: string, password: string) => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  // const filters = [
  //   { usbVendorId: 0x2341, usbProductId: 0x0043 },
  //   { usbVendorId: 0x2341, usbProductId: 0x0001 },
  // ];
  const filtersESP = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }];
  if ("serial" in navigator) {
    // console.log("Yahooo Serial is supported");
    const port = await (navigator.serial as Serial).requestPort({
      filters: filtersESP,
    });
    console.log(port);
    await port.open({ baudRate: 9600 });

    await new Promise((resolve) => setTimeout(resolve, 3000));
    // const reqMessage = "{impax,impax12345678,impax,impax}";
    const reqMessage = `{${ssid},${password},impax,impax}`;

    try {
      await sendData("request", port, encoder);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const ackMessage = await readData(port, decoder);
      console.log("First Reply" + ackMessage);
      if (ackMessage === "ack") {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await sendData(reqMessage, port, encoder);
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const secondreply = await readData(port, decoder);
        console.log("Second reply " + secondreply);
        if (secondreply === "ack") {
          return true;
          
        } else {
          return false;
          
        }
      } else {
        throw new Error("Handshake failed: ACK not received");
        // console.error("Handshake failed: ACK not received");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await port.close();
      console.log("Port closed");
    }
  } else {
    throw new Error("Serial not supported");
    // console.log("its not");
  }
};
