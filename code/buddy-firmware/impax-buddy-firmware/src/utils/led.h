#ifndef LED_H
#define LED_H

#include <Arduino.h>

#define LED_ON 2
#define LED_WIFI 4

void initLED();
void turnOn_LED_ON();
void turnOff_LED_ON();
void turnOn_LED_WIFI();
void turnOff_LED_WIFI();

#endif