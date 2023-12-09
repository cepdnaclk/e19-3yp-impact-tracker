#include "wifi.h"


BuddyWIFI::BuddyWIFI(const char * ssid, const char * password){
    this->ssid = ssid;
    this->password = password;
}

void BuddyWIFI::setSsidPassword(const char* ssid, const char* password){
    this->ssid = ssid;
    this->password = password;
}

void BuddyWIFI::init(){
    WiFi.mode(WIFI_STA); //Optional

    WiFi.begin(ssid, password);

    Serial.println("\nConnecting");
    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
        delay(DELAY_WIFI_RECONNECT);
    }

    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());

}