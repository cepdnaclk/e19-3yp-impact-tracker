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

    // Serial.println("\nConnecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        led(LED_BLINK);
        // Serial.print(".");
        delay(DELAY_WIFI_RECONNECT);
    }

    // Serial.println("\nConnected to the WiFi network");
    // Serial.print("Local ESP32 IP: ");
    // Serial.println(WiFi.localIP());
}

// Initialize Wi-Fi in single mode
void BuddyWIFI::init(bool (*communicationDashboard)(), void (*turnOffHandler)())
{
    WiFi.mode(WIFI_STA); // Set Wi-Fi mode to station (client)

    WiFi.begin(ssid, password);

    // Serial.println("\nConnecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        led(LED_BLINK);

        if (communicationDashboard())
            WiFi.begin(ssid, password);

        // check if turn off
        turnOffHandler();

        delay(DELAY_WIFI_RECONNECT);
    }

    // Serial.println("\nConnected to the WiFi network");
    // Serial.print("Local ESP32 IP: ");
    // Serial.println(WiFi.localIP());
}
