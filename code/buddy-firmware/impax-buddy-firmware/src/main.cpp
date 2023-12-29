#include "define.h"

BuddyWIFI buddyWIFI;
BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username, mqtt_password, mqtt_port);

Com com;

String key = "";

void communicationForWifiMQTT()
{
    com.comInit();
    if (com.dataDecode(&ssid, &password, &key))
    {
        setCustomeSSIDAndPasswordEEPROM(ssid, password);
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());
    }
}

void connect()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        buddyWIFI.initWIFIMulti(communicationForWifiMQTT);
    }

    if (!buddyMQTT.client.connected())
    {
        buddyMQTT.reconnect();
        buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    }

    buddyMQTT.client.loop();
}

void setup()
{
    Serial.begin(BAUD_RATE);

    initEEPROM(ssid_default, password_defalt, BUDDY_ID, ID);
    // setCustomeSSIDAndPasswordEEPROM(ssid, password);

    // Direct WIFI connection
    // buddyWIFI.init();
    // buddyWIFI.setSsidPassword(ssid_default.c_str(), password_defalt.c_str());

    // Multi WIFI connection
    buddyWIFI.addWIFIMulti(ssid_default.c_str(), password_defalt.c_str());
    if (getCustomeSSIDAndPasswordEEPROM(ssid, password))
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());

    buddyWIFI.initWIFIMulti(communicationForWifiMQTT);

    buddyMQTT.client.setCallback(callback);
    buddyMQTT.init(BUDDY_ID);

    Serial.println("Buddy ID: " + BUDDY_ID);
    Serial.println("Setup done");

    buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    buddyMQTT.subscribe(buddyMQTT.topics.SAY_HELLO.c_str());
}

void loop()
{
    com.comInit();
    com.dataDecode(&ssid, &password, &key);

    // Serial.println(ssid + ": " + password + ": " + key);
    delay(100);
}