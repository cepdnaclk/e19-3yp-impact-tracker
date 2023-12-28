#include <highGCalibrated.h>
#include <Arduino.h>
#include <DFRobot_LIS.h>

HighG::HighG()
{

// When using SPI communication, use the following program to construct an object by DFRobot_H3LIS200DL_SPI
#if defined(ESP32) || defined(ESP8266)
#define H3LIS200DL_CS D3
#elif defined(__AVR__) || defined(ARDUINO_SAM_ZERO)
#define H3LIS200DL_CS 3
#elif (defined NRF5)
#define H3LIS200DL_CS 2 // The pin on the development board with the corresponding silkscreen printed as P2
#endif
}

void HighG::begin()
{
    Serial.begin(9600);
    // Chip initialization
    while (!acce.begin())
    {
        Serial.println("Initialization failed, please check the connection and I2C address settings");
        delay(1000);
    };
    // Get chip id
    Serial.print("chip id : ");
    Serial.println(acce.getID(), HEX);

    /**
      set range:Range(g)
                eH3lis200dl_100g,/< ±100g>/
                eH3lis200dl_200g,/< ±200g>/
    */
    acce.setRange(/*Range = */ DFRobot_LIS::eH3lis200dl_100g);

    /**
      Set data measurement rate：
        ePowerDown_0HZ = 0,
        eLowPower_halfHZ,
        eLowPower_1HZ,
        eLowPower_2HZ,
        eLowPower_5HZ,
        eLowPower_10HZ,
        eNormal_50HZ,
        eNormal_100HZ,
        eNormal_400HZ,
        eNormal_1000HZ,
    */
    acce.setAcquireRate(/*Rate = */ DFRobot_LIS::eNormal_50HZ);
}

void HighG::calibrate()
{
    // The measurement range can be ±100g or ±200g set by the setRange() function

    // Bias Vector
    float offsetX = -1.025, offsetY = -0.946, offsetZ = 1.204;

    ax = (float)acce.readAccX() - offsetX; // Get the acceleration in the x direction
    ay = (float)acce.readAccY() - offsetY; // Get the acceleration in the y direction
    az = (float)acce.readAccZ() - offsetZ; // Get the acceleration in the z direction

    // Scale Matrix
    float s11, s12, s13, s21, s22, s23, s31, s32, s33;

    s11 = 1.123;
    s12 = 0.002;
    s13 = -0.058;
    s21 = 0.002;
    s22 = 1.223;
    s23 = 0.104;
    s31 = -0.058;
    s32 = 0.104;
    s33 = 0.918;

    float cx, cy, cz;

    cx = s11 * ax + s12 * ay + s13 * az;
    cy = s21 * ax + s22 * ay + s23 * az;
    cz = s31 * ax + s32 * ay + s33 * az;

    ax = cx;
    ay = cy;
    az = cz;
}

float HighG::readAccX()
{
    return ax;
}

float HighG::readAccY()
{
    return ay;
}

float HighG::readAccZ()
{
    return az;
}