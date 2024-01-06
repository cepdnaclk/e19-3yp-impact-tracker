#ifndef HIGHGCALIBRATED_H
#define HIGHGCALIBRATED_H

#include <Arduino.h>
#include <Wire.h>
#include <DFRobot_LIS.h>

class HighGCalibrated
{
public:
    HighGCalibrated();
    void begin();
    float readAccX();
    float readAccY();
    float readAccZ();
    float readMagnitude();
    bool isAnImpact();
    String getDirection();
    void calibrate();

private:
    DFRobot_H3LIS200DL_I2C acce = DFRobot_H3LIS200DL_I2C(&Wire, 0x18);
    float ax, ay, az;
    float resultant;
};

#endif // HIGHG_H