#include "define.h"

BuddyWIFI buddyWIFI(ssid, password);
BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username, mqtt_password, mqtt_port);
Topics topics;


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

void initEEPROM(){
    EEPROM.begin(EEPROM_SIZE);
    // EEPROM.write(EEPROM_START_ADDRESS, ID);
    // EEPROM.commit();
    BUDDY_ID += EEPROM.read(EEPROM_START_ADDRESS);
}

void updateTopics(){
    topics.TEST = "/" + BUDDY_ID + topics.TEST;
}

void setup(){
    Serial.begin(BAUD_RATE);

    initEEPROM();
    updateTopics();

    buddyWIFI.init();
    buddyMQTT.client.setCallback(callback);

    buddyMQTT.init();
    buddyMQTT.subscribe(topics.TEST.c_str());

    Serial.println("Buddy ID: " + BUDDY_ID);
    Serial.println("Setup done");
}

void loop() {
    if (!buddyMQTT.client.connected()) {
        buddyMQTT.reconnect();
    }

    buddyMQTT.client.loop();

    buddyMQTT.publish(topics.TEST.c_str(), "test");
    delay(1000);
}