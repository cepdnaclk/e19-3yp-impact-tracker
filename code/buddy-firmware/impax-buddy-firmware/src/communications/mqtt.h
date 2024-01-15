#ifndef MQTT_H
#define MQTT_H

#include <Arduino.h>
#include <PubSubClient.h>
#include "WiFiClientSecure.h"
#include "topics.h"
#include "../utils/util.h"

#define TIME_DELAY_RECONNECT 100

// Declaration of the BuddyMQTT class
class BuddyMQTT
{
public:
    // Constructor with parameters for MQTT configuration
    BuddyMQTT(const char *, const char *, const char *, int, const char *, const char *, const char *);

    // Public data members
    WiFiClient espClient = WiFiClient(); // WiFi client for MQTT
    // WiFiClientSecure espClient = WiFiClientSecure(); // WiFi client for MQTT
    PubSubClient client = PubSubClient(espClient); // MQTT client
    String id;                                     // Identifier for the MQTT client
    Topics topics;                                 // Object for storing MQTT topics

    const char *mqtt_broker;   // MQTT broker address
    const char *topic;         // MQTT topic (unused in the code)
    const char *mqtt_username; // MQTT username
    const char *mqtt_password; // MQTT password

    const char *CA_cert;     // Root certificate for MQTT
    const char *ESP_CA_cert; // Client certificate for ESP32
    const char *ESP_RSA_key; // RSA private key for ESP32

    int mqtt_port; // MQTT broker port

    // Public member functions
    void init(String id, bool (*communicationDashboard)());         // Initialize the MQTT client
    void reconnect(bool (*communicationDashboard)());               // Reconnect to the MQTT broker
    void publish(const char *, const char *);                       // Publish a message to an MQTT topic
    void publish(const char *, int);                                // Publish a message to an MQTT topic
    void subscribe(const char *);                                   // Subscribe to an MQTT topic
    void setBroker(const char *, const char *, const char *, int);  // Set MQTT broker details
    void updateTopics();                                            // Update MQTT topics based on the device ID
    void setCertificates(const char *, const char *, const char *); // Set MQTT certificates
    void setUserName(String);
    void setPassword(String);

private:
};

// MQTT message callback function
void callback(char *topic, byte *payload, unsigned int length);

#endif
