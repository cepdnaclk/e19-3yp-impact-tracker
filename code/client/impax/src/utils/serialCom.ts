
export async function sendMessage(message, port, encoder) {
    const writer = port.writable.getWriter();
    try {
      await writer.write(encoder.encode(message + "\n")); // Add newline for clarity
      console.log(`Message sent: ${message}`);
    } catch (error) {
      console.error("Error writing message:", error);
    } finally {
      writer.releaseLock();
    }
  }
  
export async function readMessage(port, decoder) {
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