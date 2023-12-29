#include "util.h"

// init leds
void initLED()
{
    pinMode(LED_ON, OUTPUT);
    pinMode(LED_WIFI, OUTPUT);
}

// // turn on LED_ON
void turnOn_LED_ON()
{
    digitalWrite(LED_ON, HIGH);
}

void turnOff_LED_ON()
{
    digitalWrite(LED_ON, LOW);
}

// turn on LED_WIFI
void turnOn_LED_WIFI()
{
    digitalWrite(LED_WIFI, HIGH);
}

void turnOff_LED_WIFI()
{
    digitalWrite(LED_WIFI, LOW);
}

int getBatteryStatus()
{
    int rawValue = analogRead(BATTERY_READ);

    // Convert the raw value to voltage (assuming a voltage divider)
    float voltage = rawValue * (3.3 / 4095.0); // Adjust 3.3 to your actual reference voltage

    // Assuming a voltage divider with equal resistors, adjust the divisor accordingly
    float batteryVoltage = voltage * 2.0;

    // Calculate the percentage
    return (batteryVoltage / Vmax) * 100;
}

void blink_LED_WIFI()
{
    static unsigned long lastTime = 0;
    static bool state = false;

    if (millis() - lastTime > LED_WIFI_BLINK)
    {
        lastTime = millis();
        state = !state;
        digitalWrite(LED_WIFI, state);
    }
}