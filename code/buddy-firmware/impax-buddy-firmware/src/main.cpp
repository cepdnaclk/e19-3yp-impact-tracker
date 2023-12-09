#include "define.h"

BuddyWIFI buddyWIFI;
BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username, mqtt_password, mqtt_port);
Topics topics;

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

// void setSsidPasswordE
void updateTopics()
{
    topics.TEST = "/" + BUDDY_ID + topics.TEST;
}

void setup()
{
    Serial.begin(BAUD_RATE);

    initEEPROM(ssid_default, password_defalt, BUDDY_ID, ID);
    setCustomeSSIDAndPasswordEEPROM(ssid, password);

    // buddyWIFI.init();
    // buddyWIFI.setSsidPassword(ssid_default.c_str(), password_defalt.c_str());

    buddyWIFI.addWIFIMulti(ssid_default.c_str(), password_defalt.c_str());
    if (getCustomeSSIDAndPasswordEEPROM(ssid, password))
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());

    buddyWIFI.initWIFIMulti();

    buddyMQTT.client.setCallback(callback);

    buddyMQTT.init();
    updateTopics();
    buddyMQTT.subscribe(topics.TEST.c_str());

    Serial.println("Buddy ID: " + BUDDY_ID);
    Serial.println("Setup done");
}

void loop()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        buddyWIFI.initWIFIMulti();
    }

    if (!buddyMQTT.client.connected())
    {
        buddyMQTT.reconnect();
        buddyMQTT.subscribe(topics.TEST.c_str());
    }

    buddyMQTT.client.loop();

    buddyMQTT.publish(topics.TEST.c_str(), "test");
    delay(1000);

    Serial.println("Loop");
}