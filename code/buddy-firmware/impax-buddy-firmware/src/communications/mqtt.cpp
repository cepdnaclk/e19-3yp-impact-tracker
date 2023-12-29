#include "mqtt.h"

BuddyMQTT::BuddyMQTT(const char *mqtt_broker, const char *mqtt_username, const char *mqtt_password, int mqtt_port, const char *CA_cert, const char *ESP_CA_cert, const char *ESP_RSA_key)
{
    this->mqtt_broker = mqtt_broker;
    this->mqtt_username = mqtt_username;
    this->mqtt_password = mqtt_password;
    this->mqtt_port = mqtt_port;
    this->CA_cert = CA_cert;
    this->ESP_CA_cert = ESP_CA_cert;
    this->ESP_RSA_key = ESP_RSA_key;
}

void BuddyMQTT::init(String id)
{
    this->id = id;

    reconnect();
    updateTopics();
}

void BuddyMQTT::reconnect()
{
    setCertificates(CA_cert, ESP_CA_cert, ESP_RSA_key);
    client.setServer(mqtt_broker, mqtt_port);

    while (!client.connected())
    {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());

        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password))
        {
            Serial.println("Public EMQX MQTT broker connected");
        }
        else
        {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(TIME_DELAY_RECONNECT);
        }
    }
}

void BuddyMQTT::publish(const char *topic, const char *msg)
{
    client.publish(topic, msg);
}

void BuddyMQTT::subscribe(const char *topic)
{
    client.subscribe(topic);
}

void BuddyMQTT::updateTopics()
{
    topics.TEST = "/" + id + topics.TEST;
}

void BuddyMQTT::setBroker(const char *mqtt_broker, const char *mqtt_username, const char *mqtt_password, int mqtt_port)
{
    this->mqtt_broker = mqtt_broker;
    this->mqtt_username = mqtt_username;
    this->mqtt_password = mqtt_password;
    this->mqtt_port = mqtt_port;
}

void BuddyMQTT::setCertificates(const char *root_ca, const char *client_ca, const char *client_key)
{
    this->CA_cert = root_ca;
    this->ESP_CA_cert = client_ca;
    this->ESP_RSA_key = client_key;

    // espClient.setCACert(root_ca);
    // espClient.setCertificate(client_ca);
    // espClient.setPrivateKey(client_key);
}

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