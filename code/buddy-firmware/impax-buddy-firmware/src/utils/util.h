#pragma once

#ifndef LED_H
#define LED_H

#include <Arduino.h>

// Define LED pins and blink interval
#define LED_BLINK_DELAY 100
#define LED_BATTERY_LOW 5
#define LED_ON 2
#define LED_ON_PIN 2
#define LED_WIFI_PIN 4
#define LED_BLINK 1
#define LED_OFF 0

// Define battery-related constants
#define BATTERY_READ 33
const float Vmax = 4.2;
const int MOVING_AVERAGE_SIZE = 6; // Adjust the size of the moving average window

// Function declarations
void initLED();            // Initialize LED pins
void onLedOn();            // Turn on the ON LED
void offLedOn();           // Turn off the ON LED
void onLedWifi();          // Turn on the WiFi LED
void offLedWifi();         // Turn off the WiFi LED
void blinkLedWifi();       // Blink the WiFi LED
void blinkLedOn();         // Blink the ON LED
int getBatteryStatus();    // Get battery status based on voltage
float getBatteryVoltage(); // Get the voltage of the battery
void batteryInit();
void led(int);

#endif
