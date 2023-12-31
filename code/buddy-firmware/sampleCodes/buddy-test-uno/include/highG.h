#ifndef HIGHG_H
#define HIGHG_H

#include <Arduino.h>
#include <DFRobot_LIS.h>

class HighG
{
public:
    HighG();
    void begin();
    float readAccX();
    float readAccY();
    float readAccZ();

private:
    DFRobot_H3LIS200DL_I2C acce;
};

#endif // HIGHG_H