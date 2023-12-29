#include "led.h"

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