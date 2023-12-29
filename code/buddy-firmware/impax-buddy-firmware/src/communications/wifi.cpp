#include "wifi.h"

BuddyWIFI::BuddyWIFI(const char *ssid, const char *password)
{
    this->ssid = ssid;
    this->password = password;
}

BuddyWIFI::BuddyWIFI()
{
}

void BuddyWIFI::setSsidPassword(const char *ssid, const char *password)
{
    this->ssid = ssid;
    this->password = password;
}

void BuddyWIFI::init()
{
    WiFi.mode(WIFI_STA); // Optional

    WiFi.begin(ssid, password);

    Serial.println("\nConnecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(DELAY_WIFI_RECONNECT);
    }

    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}

void BuddyWIFI::addWIFIMulti(const char *ssid, const char *password)
{
    wifiMulti.addAP(ssid, password);
}

void BuddyWIFI::initWIFIMulti(void (*func)())
{
    WiFi.mode(WIFI_STA);

    Serial.println("\nConnecting");
    while (wifiMulti.run() != WL_CONNECTED)
    {
        func();
        Serial.print(".");
        delay(DELAY_WIFI_RECONNECT);
    }

    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}

void BuddyWIFI::reconnectWIFIMulti()
{
    if (wifiMulti.run(DELAY_WIFI_RECONNECT_MULTI) == WL_CONNECTED)
    {
        Serial.print("WiFi connected: ");
        Serial.print(WiFi.SSID());
        Serial.print(" ");
        Serial.println(WiFi.RSSI());
    }
    else
    {
        Serial.println("WiFi not connected!");
    }
}
