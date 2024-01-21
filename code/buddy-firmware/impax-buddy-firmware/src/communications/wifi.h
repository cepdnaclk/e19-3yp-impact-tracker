#ifndef WIFI_H
#define WIFI_H

#include <Arduino.h>
#include "WiFiClientSecure.h"
#include <WiFi.h>
#include "util.h"

// Define delays for Wi-Fi reconnection attempts
#define DELAY_WIFI_RECONNECT 100

// Declaration of the BuddyWIFI class
class BuddyWIFI
{
public:
    // Constructors
    BuddyWIFI(const char *, const char *); // Constructor with parameters for setting Wi-Fi credentials
    BuddyWIFI();                           // Default constructor

    // Public data members
    const char *ssid;     // Wi-Fi SSID
    const char *password; // Wi-Fi password
    const char *localIP;  // Local IP address (unused in the code)

    void setSsidPassword(const char *, const char *);
    void init();
    void init(bool (*communicationDashboard)(), void (*turnOffHandler)());

private:
};

#endif
