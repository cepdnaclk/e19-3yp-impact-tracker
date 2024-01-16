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
        setSSIDAndPasswordEEPROM(ssid, password);
        writeMQTTUserNameEEPROM(mqtt_username);
        writeMQTTPasswordEEPROM(mqtt_password);
        buddyMQTT.setUserName(mqtt_username.c_str());
        buddyMQTT.setPassword(mqtt_password.c_str());
        buddyWIFI.setSsidPassword(ssid.c_str(), password.c_str());

        return true;
    }

    return false;
}

bool communicationDashboard()
{
    if (com.comInit() && com.dataDecode(&ssid, &password, &mqtt_username, &mqtt_password))
    {
        WiFi.disconnect();
        setSSIDAndPasswordEEPROM(ssid, password);
        writeMQTTUserNameEEPROM(mqtt_username);
        writeMQTTPasswordEEPROM(mqtt_password);
        buddyMQTT.setUserName(mqtt_username.c_str());
        buddyMQTT.setPassword(mqtt_password.c_str());
        buddyWIFI.setSsidPassword(ssid.c_str(), password.c_str());
        buddyWIFI.init(communicationDashboardWFIFI);

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
        buddyWIFI.setSsidPassword(ssid.c_str(), password.c_str());
        buddyWIFI.init(communicationDashboardWFIFI);
    }

    if (!buddyMQTT.client.connected())
    {
        ledStatus = LED_BLINK;
        led(ledStatus);
        buddyMQTT.setUserName(mqtt_username.c_str());
        buddyMQTT.setPassword(mqtt_password.c_str());
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
    initEEPROM(ssid, password, mqtt_username, mqtt_password, BUDDY_ID, ID);

    // Initial sensors
    combinedOutput.init();

    buddyWIFI.setSsidPassword(ssid.c_str(), password.c_str());
    buddyWIFI.init(communicationDashboardWFIFI);

    Serial.println("Wifi Done");

    // MQTT
    buddyMQTT.setUserName(mqtt_username.c_str());
    buddyMQTT.setPassword(mqtt_password.c_str());
    buddyMQTT.client.setCallback(callback);
    buddyMQTT.init(BUDDY_ID, communicationDashboard);

    Serial.println("MQTT Done");

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