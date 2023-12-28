#include <highG.h>
#include <Arduino.h>
#include <DFRobot_LIS.h>

HighG::HighG()
{
    DFRobot_H3LIS200DL_I2C acce;

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

float HighG::readAccX()
{
    return acce.readAccX();
}

float HighG::readAccY()
{
    return acce.readAccY();
}

float HighG::readAccZ()
{
    return acce.readAccZ();
}