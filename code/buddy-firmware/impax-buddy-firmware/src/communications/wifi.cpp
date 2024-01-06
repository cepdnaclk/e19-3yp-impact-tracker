#include "wifi.h"

// Constructor with parameters for setting Wi-Fi credentials
BuddyWIFI::BuddyWIFI(const char *ssid, const char *password)
{
    this->ssid = ssid;
    this->password = password;
}

// Default constructor
BuddyWIFI::BuddyWIFI()
{
}

// Set Wi-Fi credentials
void BuddyWIFI::setSsidPassword(const char *ssid, const char *password)
{
    this->ssid = ssid;
    this->password = password;
}

// Initialize Wi-Fi in single mode
void BuddyWIFI::init()
{
    WiFi.mode(WIFI_STA); // Set Wi-Fi mode to station (client)

    WiFi.begin(ssid, password);

    Serial.println("\nConnecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        led(LED_BLINK);
        Serial.print(".");
        delay(DELAY_WIFI_RECONNECT);
    }

    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}

// Add Wi-Fi credentials to the multi-mode Wi-Fi manager
void BuddyWIFI::addWIFIMulti(const char *ssid, const char *password)
{
    wifiMulti.addAP(ssid, password);
}

void BuddyWIFI::initWIFIMulti(bool (*communicationDashboard)())
{
    WiFi.mode(WIFI_STA);

    Serial.println("\nConnecting");
    while (wifiMulti.run() != WL_CONNECTED)
    {
        led(LED_BLINK);
        communicationDashboard();
        Serial.print(".");
        delay(DELAY_WIFI_RECONNECT);
    }

    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}

// Reconnect to Wi-Fi in multi-mode
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
