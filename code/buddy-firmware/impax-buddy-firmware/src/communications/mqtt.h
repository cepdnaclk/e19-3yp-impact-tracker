#ifndef MQTT_H
#define MQTT_H

#include <Arduino.h>
#include <PubSubClient.h>
#include "wifi.h"

class BuddyMQTT
{
public:
    BuddyMQTT(const char*, const char*, const char*, int);

    const char *mqtt_broker;
    const char *topic;
    const char *mqtt_username;
    const char *mqtt_password;
    int mqtt_port;

    WiFiClient espClient = WiFiClient();
    PubSubClient client = PubSubClient(espClient);

    void init();
    // void callback(char *, byte *, unsigned int);

private:


};



#endif