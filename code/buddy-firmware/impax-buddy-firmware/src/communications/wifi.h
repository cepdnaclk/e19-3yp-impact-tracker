#ifndef WIFI_H
#define WIFI_H

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>

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