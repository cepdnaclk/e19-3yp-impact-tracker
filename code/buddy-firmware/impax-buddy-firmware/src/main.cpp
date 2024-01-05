#include "define.h"
#include "combinedOutput.h"

// initialize the library instance
BuddyWIFI buddyWIFI;
HighGCalibrated highGCalibrated;
MPU6050Calibrated mpu6050calibrated;
CombinedOutput combinedOutput;
BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username, mqtt_password, mqtt_port, CA_cert.c_str(), ESP_CA_cert.c_str(), ESP_RSA_key.c_str());
Com com;

bool communicationDashboardWFIFI()
{
    if (com.comInit() && com.dataDecode(&ssid, &password, &ESP_RSA_key))
    {
        WiFi.disconnect();
        setCustomeSSIDAndPasswordEEPROM(ssid, password);
        writeMQTTPrivateKeyEEPROM(ESP_RSA_key);
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());
        buddyMQTT.setCertificates(CA_cert.c_str(), ESP_CA_cert.c_str(), ESP_RSA_key.c_str());

        return true;
    }

    return false;
}

bool communicationDashboard()
{
    if (com.comInit() && com.dataDecode(&ssid, &password, &ESP_RSA_key))
    {
        WiFi.disconnect();
        setCustomeSSIDAndPasswordEEPROM(ssid, password);
        writeMQTTPrivateKeyEEPROM(ESP_RSA_key);
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());
        buddyMQTT.setCertificates(CA_cert.c_str(), ESP_CA_cert.c_str(), ESP_RSA_key.c_str());
        buddyWIFI.initWIFIMulti(communicationDashboardWFIFI);

        return true;
    }

    return false;
}

void connect()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        blink_LED_WIFI();

        buddyWIFI.initWIFIMulti(communicationDashboardWFIFI);
    }
    else
    {
        turnOn_LED_WIFI();
    }

    if (!buddyMQTT.client.connected())
    {
        buddyMQTT.reconnect(communicationDashboard);
        buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    }

    buddyMQTT.client.loop();
}

void batteryStatusSend()
{
    buddyMQTT.publish(buddyMQTT.topics.BATTERY.c_str(), ((String)getBatteryStatus()).c_str());
}

void setup()
{
    Wire.begin(23, 19);

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

    buddyWIFI.initWIFIMulti(communicationDashboardWFIFI);

    // get the certificates from EEPROM
    if (readMQTTPrivateKeyEEPROM(ESP_RSA_key))
        buddyMQTT.setCertificates(CA_cert.c_str(), ESP_CA_cert.c_str(), ESP_RSA_key.c_str());

    // MQTT
    buddyMQTT.client.setCallback(callback);
    buddyMQTT.init(BUDDY_ID, communicationDashboard);

    // buddyMQTT.client.setCallback(callback);
    // buddyMQTT.init(BUDDY_ID);

    buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    buddyMQTT.subscribe(buddyMQTT.topics.SAY_HELLO.c_str());
    buddyMQTT.subscribe(buddyMQTT.topics.BATTERY.c_str());
}

void loop()
{
    // ****** Combined Output START *******
    Serial.println(combinedOutput.getImpact());
    Serial.println(combinedOutput.getDirection());

    // ****** Combined Output END *******
    connect();
    communicationDashboard();
    batteryStatusSend();

    buddyMQTT.publish(buddyMQTT.topics.TEST.c_str(), "Hello from ESP32");
    buddyMQTT.publish(buddyMQTT.topics.SAY_HELLO.c_str(), BUDDY_ID.c_str());
    delay(1000);
}