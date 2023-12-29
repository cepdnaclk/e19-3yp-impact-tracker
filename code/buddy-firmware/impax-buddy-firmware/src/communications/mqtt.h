#ifndef MQTT_H
#define MQTT_H

#include <Arduino.h>
#include <PubSubClient.h>
#include "WiFiClientSecure.h"
#include "topics.h"

#define TIME_DELAY_RECONNECT 2000

class BuddyMQTT
{
public:
    BuddyMQTT(const char *, const char *, const char *, int, const char *, const char *, const char *);

    WiFiClient espClient = WiFiClient();
    // WiFiClientSecure espClient = WiFiClientSecure();
    PubSubClient client = PubSubClient(espClient);

    String id;
    Topics topics;

    const char *mqtt_broker;
    const char *topic;
    const char *mqtt_username;
    const char *mqtt_password;

    const char *CA_cert;
    const char *ESP_CA_cert;
    const char *ESP_RSA_key;

    int mqtt_port;

    void init(String id);
    void reconnect();
    void publish(const char *, const char *);
    void subscribe(const char *);

    void setBroker(const char *, const char *, const char *, int);

    void updateTopics();

    void setCertificates(const char *, const char *, const char *);

private:
};

void callback(char *topic, byte *payload, unsigned int length);

#endif