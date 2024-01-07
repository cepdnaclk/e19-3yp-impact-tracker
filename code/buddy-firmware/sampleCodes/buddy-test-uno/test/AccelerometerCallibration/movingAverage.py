"""

RECORD ACCELEROMETER MEASUREMENTS FOR ACCELEROMETER CALIBRATION 
VIA MAGNETO

Code By: Michael Wrona
Created: 17 Aug 2021

This code reads acceleroemter measurements in G's over a serial connection 
and logs them to a tab-delimited text file. It also pauses between each 
reading and averages a few measurements.

"""

import serial
import traceback

# global variables
MAX_MEAS = 200  # max number of readings in the session, so that we don't create an infinite loop
AVG_MEAS = 25  # for each reading, take this many measurements and average them
SER_PORT = 'COM5'  # serial port the device is connected to
SER_BAUD = 115200  # serial port baud rate

window_size = 20  # Choose an appropriate window size
filter_window = [(0.0, 0.0, 0.0)] * window_size
filtered_output = 0
threshold = 14  # Set the threshold for impact detection in g units


class SerialPort:
    """Create and read data from a serial port.

    Attributes:
        read(**kwargs): Read and decode data string from serial port.
    """

    def __init__(self, port, baud=9600):
        """Create and read serial data.

        Args:
            port (str): Serial port name. Example: 'COM4'
            baud (int): Serial baud rate, default 9600.
        """
        if isinstance(port, str) == False:
            raise TypeError('port must be a string.')

        if isinstance(baud, int) == False:
            raise TypeError('Baud rate must be an integer.')

        self.port = port
        self.baud = baud

        # Initialize serial connection
        self.ser = serial.Serial(
            self.port, self.baud, timeout=None, xonxoff=False, rtscts=False, dsrdtr=False)
        self.ser.flushInput()
        self.ser.flushOutput()

    def Read(self, clean_end=True) -> str:
        """
        Read and decode data string from serial port.

        Args:
            clean_end (bool): Strip '\\r' and '\\n' characters from string. Common if used Serial.println() Arduino function. Default true

        Returns:
            (str): utf-8 decoded message.
        """
        self.ser.flushInput()
        bytesToRead = self.ser.readline()
        decodedMsg = bytesToRead.decode('utf-8')

        if clean_end == True:
            decodedMsg = decodedMsg.rstrip()  # Strip extra chars at the end

        return decodedMsg

    def Close(self) -> None:
        """Close serial connection."""
        self.ser.close()




def main():
    ser = SerialPort(SER_PORT, baud=SER_BAUD)
      
    input('[INPUT]: Press any key to continue...')
    ax_now = ay_now = az_now = 0

    for _ in range(10):
        ser.Read()

    while(True):
        try:
            raw_acceleration = list(map(float, ser.Read().split(',')))
            # print(filter_window)
            filter_window.pop(0)  # Remove oldest value from the window
            filter_window.append(raw_acceleration)  # Add latest value to the window
            
            avg_x = sum([filter_window[i][0] for i in range(window_size)])/window_size
            avg_y = sum([filter_window[i][1] for i in range(window_size)])/window_size
            avg_z = sum([filter_window[i][2] for i in range(window_size)])/window_size
            
            filtered_output = (avg_x, avg_y, avg_z) # Calculate the average
            raw_resultant = sum([raw_acceleration[i] ** 2 for i in range(3)]) ** 0.5
            filtered_resultant = sum([filtered_output[i] ** 2 for i in range(3)]) ** 0.5
            print(f"Measured: {raw_acceleration} R: {raw_resultant:.2} \t Averaged: {filtered_output} R:{filtered_resultant:.2}")

        except:
            ser.Close()
            traceback.print_exc()
            raise SystemExit("[ERROR]: Error reading serial connection.")


if __name__ == '__main__':
    main()