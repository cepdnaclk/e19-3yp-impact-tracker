#ifndef MQTT_H
#define MQTT_H

#include <Arduino.h>
#include <PubSubClient.h>
#include "wifi.h"
#include "topics.h"

#define TIME_DELAY_RECONNECT 2000

class BuddyMQTT
{
public:
    BuddyMQTT(const char *, const char *, const char *, int);

    WiFiClient espClient = WiFiClient();
    PubSubClient client = PubSubClient(espClient);

    String id;
    Topics topics;

    const char *mqtt_broker;
    const char *topic;
    const char *mqtt_username;
    const char *mqtt_password;
    int mqtt_port;

    void init(String id);
    void reconnect();
    void publish(const char *, const char *);
    void subscribe(const char *);
    void setBroker(const char *, const char *, const char *, int);

    void updateTopics();

private:
};

void callback(char *topic, byte *payload, unsigned int length);

#endif