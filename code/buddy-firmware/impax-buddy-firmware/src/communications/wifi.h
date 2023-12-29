#ifndef WIFI_H
#define WIFI_H

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>

#define DELAY_WIFI_RECONNECT 100
#define DELAY_WIFI_RECONNECT_MULTI 2000

class BuddyWIFI
{
public:
    BuddyWIFI(const char *, const char *);
    BuddyWIFI();

    WiFiMulti wifiMulti = WiFiMulti();

    const char *ssid;
    const char *password;
    const char *localIP;

    void setSsidPassword(const char *, const char *);
    void init();

    void addWIFIMulti(const char *, const char *);
    void initWIFIMulti(void (*func)());
    void reconnectWIFIMulti();

private:
};

#endif