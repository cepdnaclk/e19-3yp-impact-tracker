#include "mqtt.h"

BuddyMQTT::BuddyMQTT(const char* mqtt_broker, const char* mqtt_username, const char* mqtt_password, int mqtt_port){
    this->mqtt_broker = mqtt_broker;
    this->mqtt_username = mqtt_username;
    this->mqtt_password = mqtt_password;
    this->mqtt_port = mqtt_port;
}

void BuddyMQTT::init(){
    client.setServer(mqtt_broker, mqtt_port);

    reconnect();
}

void BuddyMQTT::reconnect(){

    while (!client.connected()) {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
        
        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
            Serial.println("Public EMQX MQTT broker connected");
        } else {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(TIME_DELAY_RECONNECT);
        }
    }
}

void BuddyMQTT::publish(const char * topic, const char * msg){
    client.publish(topic, msg);
}

void BuddyMQTT::subscribe(const char * topic){
    client.subscribe(topic);
}