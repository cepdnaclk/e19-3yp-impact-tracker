#ifndef MPU6050CALIBRATED_H
#define MPU6050CALIBRATED_H

#include <Arduino.h>
#include <MPU6050_light.h>
#include <Wire.h>

class MPU6050Calibrated
{
public:
    MPU6050Calibrated();
    int begin();
    void calibrate();
    void update();
    float getAngleX();
    float getAngleY();
    float getAngleZ();

private:
    MPU6050 mpu;
};

#endif // HIGHG_H