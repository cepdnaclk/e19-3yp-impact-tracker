#include <highG.h>
#include <highGCalibrated.h>
#include <Arduino.h>
// HighG highG;w
HighGCalibrated highGCalibrated;

void setup()
{
  // highG.begin();
  highGCalibrated.begin();
  highGCalibrated.calibrate();
}

void loop()
{
  // Read acceleration values
  float ax = highGCalibrated.readAccX();
  float ay = highGCalibrated.readAccY();
  float az = highGCalibrated.readAccZ();

  // TODO: Calibrate the MPU6050
  // TODO: Read yaw, pitch, roll from the MPU6050
  //  TODO: Rotate the vector to the earth frame of reference
  //  TODO: Deduct the gravitational acceleration component
  //  TODO: Caculate the direction of the acceleration vector
  //  TODO: Calculate the magnitude of the acceleration vector
  //  TODO: Compare the magnitude with the threshold

  // Print acceleration values
  Serial.print("x: ");
  Serial.print(ax);
  Serial.print(" g\t  y: ");
  Serial.print(ay);
  Serial.print(" g\t  z: ");
  Serial.print(az);
  Serial.println(" g");

  delay(300);
}