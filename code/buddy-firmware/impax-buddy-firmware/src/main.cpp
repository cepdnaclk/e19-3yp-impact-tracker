#include "define.h"

// initialize the library instance
BuddyWIFI buddyWIFI;
HighGCalibrated highGCalibrated;
MPU6050Calibrated mpu6050calibrated;
CombinedOutput combinedOutput;
BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username.c_str(), mqtt_password.c_str(), mqtt_port, CA_cert.c_str(), ESP_CA_cert.c_str(), ESP_RSA_key.c_str());
Com com;

bool buddyCheckTurnOnHandle()
{
    delay(100);

    int val = digitalRead(GPIO_NUM_32);

    if (val == 1)
    {
        return true;
    }

    return false;
}

void buddyCheckTurnOffHandle()
{
    int val = digitalRead(GPIO_NUM_32);

    if (val == 0)
    {
        // set state
        buddyState = BUDDY_OFF;
        ledStatus = LED_OFF;
        led(ledStatus);

        delay(1000);
        gpio_hold_en(GPIO_NUM_0);
        gpio_hold_en(GPIO_NUM_2);

        // Go to sleep now
        Serial.println("Going to sleep now");
        esp_deep_sleep_start();
    }
}

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
        buddyWIFI.init(communicationDashboardWFIFI, buddyCheckTurnOffHandle);

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
        buddyWIFI.init(communicationDashboardWFIFI, buddyCheckTurnOffHandle);
    }

    if (!buddyMQTT.client.connected())
    {
        ledStatus = LED_BLINK;
        led(ledStatus);
        buddyMQTT.setUserName(mqtt_username.c_str());
        buddyMQTT.setPassword(mqtt_password.c_str());
        buddyMQTT.reconnect(communicationDashboard, buddyCheckTurnOffHandle);
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

        if (batteryStatus == CHARGIN_STATE)
        {
            ledStatus = LED_CHARGIN;
        }
        else if (batteryStatus < BATTERY_LIMIT)
        {
            ledStatus = LED_BATTERY_LOW;
        }
        else
        {
            ledStatus = LED_ON;
        }

        // Serial.println(batteryStatus);

        batteryStatusTimer = millis();
    }

    if (MEASURE_DELAY < millis() - measuringTimer)
    {
        measureSensors();
        measuringTimer = millis();
    }
}

void buddyInit()
{
    gpio_hold_dis(GPIO_NUM_0);
    gpio_hold_dis(GPIO_NUM_2);

    initLED();

    // leds
    ledStatus = LED_OFF;
    led(ledStatus);
    ledStatus = LED_BLINK;
    led(ledStatus);

    // EEPROM
    initEEPROM(ssid, password, mqtt_username, mqtt_password, BUDDY_ID, ID);

    // Initial sensors
    combinedOutput.init();

    buddyWIFI.setSsidPassword(ssid.c_str(), password.c_str());
    buddyWIFI.init(communicationDashboardWFIFI, buddyCheckTurnOffHandle);

    Serial.println("Wifi Done");

    // MQTT
    buddyMQTT.setUserName(mqtt_username.c_str());
    buddyMQTT.setPassword(mqtt_password.c_str());
    buddyMQTT.client.setCallback(callback);
    buddyMQTT.init(BUDDY_ID, communicationDashboard, buddyCheckTurnOffHandle);

    Serial.println("MQTT Done");

    // Timers
    batteryStatusTimer = millis();
    measuringTimer = millis();

    // buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    Serial.println("Setup done");
    Serial.println(WiFi.SSID());

    batteryInit();

    ledStatus = LED_ON;
}

void setup()
{
    // serial monitor
    Serial.begin(BAUD_RATE);

    // define off button
    pinMode(GPIO_NUM_32, INPUT);

    esp_sleep_enable_ext0_wakeup(GPIO_NUM_32, 1);

    // Increment boot number and print it every reboot
    ++bootCount;
    Serial.print("Boot number: ");
    Serial.println(bootCount);

    // esp_sleep_enable_ext0_wakeup(GPIO_NUM_32, 1); // 1 = High, 0 = Low

    int wakeUpReason = wakeup_reason();

    if (buddyState == BUDDY_OFF && buddyCheckTurnOnHandle())
    {
        buddyInit();
        buddyState = BUDDY_ON;
    }

    delay(1000);

    // check if turn off
    buddyCheckTurnOffHandle();
}

void loop()
{
    // check if turn off
    buddyCheckTurnOffHandle();

    // Create a client connection
    connect();
    communicationDashboard();

    // send data
    process();

    led(ledStatus);

    delay(CLK_SPEED);
    // Serial.println("loop");
}
