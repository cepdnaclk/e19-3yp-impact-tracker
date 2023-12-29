#include "define.h"

// initialize the library instance
BuddyWIFI buddyWIFI;
BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username, mqtt_password, mqtt_port, CA_cert.c_str(), ESP_CA_cert.c_str(), ESP_RSA_key.c_str());

// connect to wifi and mqtt
void connect()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        turnOff_LED_WIFI();
        buddyWIFI.initWIFIMulti();
    }
    else
    {
        turnOn_LED_WIFI();
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
    // leds
    initLED();
    turnOn_LED_ON();
    blink_LED_WIFI();

    // serial monitor
    Serial.begin(BAUD_RATE);

    // EEPROM
    initEEPROM(ssid_default, password_defalt, BUDDY_ID, ID);
    // setCustomeSSIDAndPasswordEEPROM(ssid, password);

    // Multi WIFI connection
    buddyWIFI.addWIFIMulti(ssid_default.c_str(), password_defalt.c_str());

    if (getCustomeSSIDAndPasswordEEPROM(ssid, password))
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());

    // connect to wifi
    buddyWIFI.initWIFIMulti();

    // MQTT
    buddyMQTT.client.setCallback(callback);
    buddyMQTT.init(BUDDY_ID);

    // get the certificates from EEPROM
    if (readMQTTPrivateKeyEEPROM(ESP_RSA_key))
        buddyMQTT.setCertificates(CA_cert.c_str(), ESP_CA_cert.c_str(), ESP_RSA_key.c_str());

    Serial.println("Buddy ID: " + BUDDY_ID);
    Serial.println("Setup done");

    buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    buddyMQTT.subscribe(buddyMQTT.topics.SAY_HELLO.c_str());
}

void loop()
{
    connect();

    buddyMQTT.publish(buddyMQTT.topics.TEST.c_str(), "test");
    buddyMQTT.publish(buddyMQTT.topics.SAY_HELLO.c_str(), BUDDY_ID.c_str());
    delay(1000);

    Serial.println("Loop");
}