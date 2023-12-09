#ifndef WIFI_H
#define WIFI_H

#include <Arduino.h>
#include <WiFi.h>

#define DELAY_WIFI_RECONNECT 100

class BuddyWIFI
{
public:
    BuddyWIFI(const char*, const char*);

    const char* ssid;
    const char* password;
    const char* localIP;

    void setSsidPassword(const char*, const char*);
    void init();

private:


};



#endif