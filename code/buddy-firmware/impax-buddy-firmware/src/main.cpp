#include "define.h"

const char* ssid = "Dialog 4G 629";
const char* password = "189FFF07";

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "emqx/esp32";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;

BuddyWIFI buddyWIFI(ssid, password);
BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username, mqtt_password, mqtt_port);


void callback(char *topic, byte *payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message:");
    for (int i = 0; i < length; i++) {
        Serial.print((char) payload[i]);
    }
    Serial.println();
    Serial.println("-----------------------");
}

void setup(){
    Serial.begin(BAUD_RATE);

    buddyWIFI.init();

    buddyMQTT.client.setCallback(callback);
    buddyMQTT.init();
}

void loop() {
    if (!buddyMQTT.client.connected()) {
        buddyMQTT.reconnect();
    }
    
    buddyMQTT.client.loop();



}