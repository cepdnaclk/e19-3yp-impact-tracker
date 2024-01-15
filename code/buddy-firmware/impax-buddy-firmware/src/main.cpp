#include "define.h"

// initialize the library instance
BuddyWIFI buddyWIFI;
HighGCalibrated highGCalibrated;
MPU6050Calibrated mpu6050calibrated;
CombinedOutput combinedOutput;
BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username.c_str(), mqtt_password.c_str(), mqtt_port, CA_cert.c_str(), ESP_CA_cert.c_str(), ESP_RSA_key.c_str());
Com com;

bool communicationDashboardWFIFI()
{
    if (com.comInit() && com.dataDecode(&ssid, &password, &mqtt_username, &mqtt_password))
    {
        WiFi.disconnect();
        setCustomeSSIDAndPasswordEEPROM(ssid, password);
        writeMQTTUserNameEEPROM(mqtt_username);
        writeMQTTPasswordEEPROM(mqtt_password);
        buddyMQTT.setUserName(mqtt_username.c_str());
        buddyMQTT.setPassword(mqtt_password.c_str());
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());

        return true;
    }

    return false;
}

bool communicationDashboard()
{
    if (com.comInit() && com.dataDecode(&ssid, &password, &mqtt_username, &mqtt_password))
    {
        WiFi.disconnect();
        setCustomeSSIDAndPasswordEEPROM(ssid, password);
        writeMQTTUserNameEEPROM(mqtt_username);
        writeMQTTPasswordEEPROM(mqtt_password);
        buddyMQTT.setUserName(mqtt_username.c_str());
        buddyMQTT.setPassword(mqtt_password.c_str());
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());
        buddyWIFI.initWIFIMulti(communicationDashboardWFIFI);

        return true;
    }

    return false;
}

void connect()
{
    if (WiFi.status() != WL_CONNECTED)
    {
        ledStatus = LED_BLINK;
        led(ledStatus);
        buddyWIFI.initWIFIMulti(communicationDashboardWFIFI);
    }

    if (!buddyMQTT.client.connected())
    {
        ledStatus = LED_BLINK;
        led(ledStatus);
        buddyMQTT.reconnect(communicationDashboard);
        // buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    }

    buddyMQTT.client.loop();
}

void measureSensors()
{
    int value = combinedOutput.getImpact();

    if (value != 0)
    {
        String data = String(value) + " " + String(combinedOutput.getDirection());
        buddyMQTT.publish(buddyMQTT.topics.IMPACT.c_str(), data.c_str());
    }
}

void process()
{

    if (BATTER_STATUS_DELAY < millis() - batteryStatusTimer)
    {
        int batteryStatus = getBatteryStatus();
        buddyMQTT.publish(buddyMQTT.topics.BATTERY.c_str(), batteryStatus);

        float vol = getBatteryVoltage();
        buddyMQTT.publish(buddyMQTT.topics.TEST.c_str(), vol);

        if (batteryStatus < BATTERY_LIMIT)
        {
            ledStatus = LED_BATTERY_LOW;
        }
        else
        {
            ledStatus = LED_ON;
        }

        batteryStatusTimer = millis();
    }

    if (MEASURE_DELAY < millis() - measuringTimer)
    {
        measureSensors();
        measuringTimer = millis();
    }
}

void setup()
{
    // serial monitor
    Serial.begin(BAUD_RATE);

    // leds
    initLED();
    ledStatus = LED_BLINK;
    led(ledStatus);

    // battery status init
    batteryInit();

    // EEPROM
    initEEPROM(ssid_default, password_defalt, BUDDY_ID, ID);
    setCustomeSSIDAndPasswordEEPROM(ssid, password);
    writeMQTTUserNameEEPROM(mqtt_username);
    writeMQTTPasswordEEPROM(mqtt_password);

    // Initial sensors
    combinedOutput.init();

    // Multi WIFI connection
    buddyWIFI.addWIFIMulti(ssid_default.c_str(), password_defalt.c_str());

    if (getCustomeSSIDAndPasswordEEPROM(ssid, password))
        buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());

    buddyWIFI.initWIFIMulti(communicationDashboardWFIFI);

    if (readMQTTUserNameEEPROM(mqtt_username))
        buddyMQTT.setUserName(mqtt_username.c_str());
    if (readMQTTPasswordEEPROM(mqtt_password))
        buddyMQTT.setPassword(mqtt_password.c_str());

    // MQTT
    buddyMQTT.client.setCallback(callback);
    buddyMQTT.init(BUDDY_ID, communicationDashboard);

    // Timers
    batteryStatusTimer = millis();
    measuringTimer = millis();

    // buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    Serial.println("Setup done");
    Serial.println(WiFi.SSID());

    ledStatus = LED_ON;
}

void loop()
{
    // Create a client connection
    connect();
    communicationDashboard();

    // send data
    process();

    led(ledStatus);
    delay(CLK_SPEED);
}