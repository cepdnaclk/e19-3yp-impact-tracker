#include "mpu6050calibrated.h"
#include <Arduino.h>
#include <MPU6050_light.h>
#include "Wire.h"
MPU6050Calibrated::MPU6050Calibrated() : mpu(Wire)
{
}

int MPU6050Calibrated::begin()
{
    byte status = mpu.begin();
    Serial.print(F("MPU6050Calibrated status: "));
    Serial.println(status);
    return status == 0; // Return true if initialization succeeded
}

void MPU6050Calibrated::calibrate()
{
    Serial.println(F("Calculating offsets, do not move MPU6050Calibrated"));
    delay(1000);
    // mpu.upsideDownMounting = true; // Uncomment if the MPU6050Calibrated is mounted upside-down
    mpu.calcOffsets(); // Gyro and accelero
    Serial.println("Done!\n");
}

void MPU6050Calibrated::update()
{
    mpu.update();
}

float MPU6050Calibrated::getAngleX()
{
    return mpu.getAngleX();
}

float MPU6050Calibrated::getAngleY()
{
    return mpu.getAngleY();
}

float MPU6050Calibrated::getAngleZ()
{
    return mpu.getAngleZ();
}
