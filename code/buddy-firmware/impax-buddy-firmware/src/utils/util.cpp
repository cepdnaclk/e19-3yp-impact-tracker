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
    int val = (batteryVoltage / Vmax) * 100;

    // Calculate the percentage
    return map(val, 0, 160, 0, 100);
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

void blink_LED_ON()
{
    static unsigned long lastTime = 0;
    static bool state = false;

    if (millis() - lastTime > LED_WIFI_BLINK)
    {
        lastTime = millis();
        state = !state;
        digitalWrite(LED_ON, state);
    }
}

void led(int LED_STATE)
{
    if (LED_STATE == LED_OFF)
    {
        turnOff_LED_ON();
        turnOff_LED_WIFI();
    }
    else if (LED_STATE == LED_BLINK)
    {
        turnOn_LED_ON();
        blink_LED_WIFI();
    }
    else if (LED_STATE == LED_ON)
    {
        turnOn_LED_ON();
        turnOn_LED_WIFI();
    }
    else if (LED_STATE == LED_BATTERY_LOW)
    {
        blink_LED_ON();
        turnOn_LED_WIFI();
    }
}