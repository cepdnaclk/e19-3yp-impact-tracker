#ifndef WIFI_H
#define WIFI_H

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include "../utils/util.h"

// Define delays for Wi-Fi reconnection attempts
#define DELAY_WIFI_RECONNECT 100
#define DELAY_WIFI_RECONNECT_MULTI 2000

// Declaration of the BuddyWIFI class
class BuddyWIFI
{
public:
    // Constructors
    BuddyWIFI(const char *, const char *); // Constructor with parameters for setting Wi-Fi credentials
    BuddyWIFI();                           // Default constructor

    // Wi-FiMulti object for managing multiple Wi-Fi connections
    WiFiMulti wifiMulti = WiFiMulti();

    // Public data members
    const char *ssid;     // Wi-Fi SSID
    const char *password; // Wi-Fi password
    const char *localIP;  // Local IP address (unused in the code)

    void setSsidPassword(const char *, const char *);
    void init();

    void addWIFIMulti(const char *, const char *);
    void initWIFIMulti(bool (*communicationDashboard)());
    void reconnectWIFIMulti();

private:
};

#endif
