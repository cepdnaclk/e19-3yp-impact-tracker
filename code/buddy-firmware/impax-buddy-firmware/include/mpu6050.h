#ifndef MPU6050_H
#define MPU6050_H

#include <Arduino.h>

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
    DFRobot_H3LIS200DL_I2C acce;
    float ax, ay, az;
    float resultant;
};

#endif // HIGHG_H