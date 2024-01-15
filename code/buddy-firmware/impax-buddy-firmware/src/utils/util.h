#pragma once

#ifndef LED_H
#define LED_H

#include <Arduino.h>

// Define LED pins and blink interval
#define LED_WIFI_BLINK 100
#define LED_BATTERY_LOW 5
#define LED_ON 2
#define LED_WIFI 4
#define LED_BLINK 1
#define LED_OFF 0

// Define battery-related constants
#define BATTERY_READ 33
const float Vmax = 4.2;

// Function declarations
void initLED();          // Initialize LED pins
void turnOn_LED_ON();    // Turn on the ON LED
void turnOff_LED_ON();   // Turn off the ON LED
void turnOn_LED_WIFI();  // Turn on the WiFi LED
void turnOff_LED_WIFI(); // Turn off the WiFi LED
void blink_LED_WIFI();   // Blink the WiFi LED
void blink_LED_ON();     // Blink the ON LED
int getBatteryStatus();  // Get battery status based on voltage
void led(int);

#endif
