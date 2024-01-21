#include "mqtt.h"

// Constructor for BuddyMQTT class
BuddyMQTT::BuddyMQTT(const char *mqtt_broker, const char *mqtt_username, const char *mqtt_password, int mqtt_port, const char *CA_cert, const char *ESP_CA_cert, const char *ESP_RSA_key)
{
    // Initialize MQTT parameters
    this->mqtt_broker = mqtt_broker;
    this->mqtt_username = mqtt_username;
    this->mqtt_password = mqtt_password;
    this->mqtt_port = mqtt_port;
    this->CA_cert = CA_cert;
    this->ESP_CA_cert = ESP_CA_cert;
    this->ESP_RSA_key = ESP_RSA_key;
}

// Initialize the BuddyMQTT instance
void BuddyMQTT::init(String id, bool (*communicationDashboard)(), void (*turnOffHandler)())
{
    this->id = id;

    // Attempt to connect to the MQTT broker
    reconnect(communicationDashboard, turnOffHandler);
    // Update MQTT topics based on the device ID
    updateTopics();
}

// Attempt to reconnect to the MQTT broker
void BuddyMQTT::reconnect(bool (*communicationDashboard)(), void (*turnOffHandler)())
{
    // Set MQTT certificates
    setCertificates(CA_cert, ESP_CA_cert, ESP_RSA_key);
    // Set MQTT server (broker) and port
    client.setServer(mqtt_broker, mqtt_port);

    // Attempt to connect to the MQTT broker
    while (!client.connected())
    {
        led(LED_BLINK);
        communicationDashboard();
        turnOffHandler();
        // Generate a client ID based on ESP32 MAC address
        String client_id = "buddy-client-";
        client_id += String(WiFi.macAddress());

        // Attempt to connect to the MQTT broker
        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password))
        {
            Serial.println("MQTT broker connected");
        }
        else
        {
            // Print error message and wait before retrying
            // Serial.print("failed with state ");
            // Serial.print(client.state());
            delay(TIME_DELAY_RECONNECT);
        }
    }
}

// Publish a message to a specified MQTT topic
void BuddyMQTT::publish(const char *topic, const char *msg)
{
    client.publish(topic, msg, true);
}

void BuddyMQTT::publish(const char *topic, int msg)
{
    // Convert the integer to a string before publishing
    String msgString = String(msg);

    // Publish the message
    client.publish(topic, msgString.c_str(), true);
}

void BuddyMQTT::publish(const char *topic, float msg)
{
    // Convert the integer to a string before publishing
    String msgString = String(msg);

    // Publish the message
    client.publish(topic, msgString.c_str(), true);
}

// Subscribe to a specified MQTT topic
void BuddyMQTT::subscribe(const char *topic)
{
    client.subscribe(topic);
}

// Update MQTT topics based on the device ID
void BuddyMQTT::updateTopics()
{
    topics.TEST = id + topics.TEST;
    topics.BATTERY = id + topics.BATTERY;
    topics.IMPACT = id + topics.IMPACT;
}

// Set MQTT broker and authentication details
void BuddyMQTT::setBroker(const char *mqtt_broker, const char *mqtt_username, const char *mqtt_password, int mqtt_port)
{
    this->mqtt_broker = mqtt_broker;
    this->mqtt_username = mqtt_username;
    this->mqtt_password = mqtt_password;
    this->mqtt_port = mqtt_port;
}

// Set MQTT certificates
void BuddyMQTT::setCertificates(const char *root_ca, const char *client_ca, const char *client_key)
{
    this->CA_cert = root_ca;
    this->ESP_CA_cert = client_ca;
    this->ESP_RSA_key = client_key;

    // Uncomment the following lines if you are using a specific library for MQTT and certificates
    // espClient.setCACert(root_ca);
    // espClient.setCertificate(client_ca);
    // espClient.setPrivateKey(client_key);
}

// Callback function executed when a new MQTT message is received
void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message:");
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
    Serial.println();
    Serial.println("-----------------------");
}

// Set MQTT username
void BuddyMQTT::setUserName(const char *username)
{
    this->mqtt_username = username;
}

// Set MQTT password
void BuddyMQTT::setPassword(const char *password)
{
    this->mqtt_password = password;
}
