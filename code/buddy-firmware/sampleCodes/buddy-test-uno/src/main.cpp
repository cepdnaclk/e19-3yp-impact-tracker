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