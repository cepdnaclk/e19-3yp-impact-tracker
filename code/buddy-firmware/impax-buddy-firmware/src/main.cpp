#include "define.h"
#include "highGCalibrated.h"
#include "mpu6050.h"

// BuddyWIFI buddyWIFI;
// BuddyMQTT buddyMQTT(mqtt_broker, mqtt_username, mqtt_password, mqtt_port);
// HighGCalibrated highGCalibrated;
MPU6050Calibrated mpu6050calibrated;

// void connect()
// {
//     if (WiFi.status() != WL_CONNECTED)
//     {
//         buddyWIFI.initWIFIMulti();
//     }

//     if (!buddyMQTT.client.connected())
//     {
//         buddyMQTT.reconnect();
//         buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
//     }

//     buddyMQTT.client.loop();
// }

void setup()
{
    Serial.begin(BAUD_RATE);
    Wire.begin(23, 19);

    // ****** High G  Start ****
    // highGCalibrated.begin();
    // ****** High G  END ****

    // ****** MPU 6050 Sensor START *******
    if (!mpu6050calibrated.begin())
    {
        Serial.println("Failed to initialize MPU6050");
        while (true)
        {
        } // Stop execution if initialization fails
    }

    mpu6050calibrated.calibrate();

    // ****** MPU 6050 Sensor END *******

    // Serial.begin(BAUD_RATE);

    // initEEPROM(ssid_default, password_defalt, BUDDY_ID, ID);
    // // setCustomeSSIDAndPasswordEEPROM(ssid, password);

    // // Direct WIFI connection
    // // buddyWIFI.init();
    // // buddyWIFI.setSsidPassword(ssid_default.c_str(), password_defalt.c_str());

    // // Multi WIFI connection
    // buddyWIFI.addWIFIMulti(ssid_default.c_str(), password_defalt.c_str());
    // if (getCustomeSSIDAndPasswordEEPROM(ssid, password))
    //     buddyWIFI.addWIFIMulti(ssid.c_str(), password.c_str());

    // buddyWIFI.initWIFIMulti();

    // buddyMQTT.client.setCallback(callback);
    // buddyMQTT.init(BUDDY_ID);

    // Serial.println("Buddy ID: " + BUDDY_ID);
    // Serial.println("Setup done");

    // buddyMQTT.subscribe(buddyMQTT.topics.TEST.c_str());
    // buddyMQTT.subscribe(buddyMQTT.topics.SAY_HELLO.c_str());
}

void loop()
{

    // ****** MPU 6050 Sensor START *******
    mpu6050calibrated.update();
    Serial.print("X: ");
    Serial.print(mpu6050calibrated.getAngleX());
    Serial.print("\tY: ");
    Serial.print(mpu6050calibrated.getAngleY());
    Serial.print("\tZ: ");
    Serial.println(mpu6050calibrated.getAngleZ());

    delay(10); // Adjust delay as needed

    // ********* MPU 6050 Sensor END *********

    // ****** High G  Start ****
    // highGCalibrated.calibrate();
    // Serial.println(highGCalibrated.readAccX());
    // delay(1000);
    // ****** High G  END ****

    // connect();

    // buddyMQTT.publish(buddyMQTT.topics.TEST.c_str(), "test");
    // buddyMQTT.publish(buddyMQTT.topics.SAY_HELLO.c_str(), BUDDY_ID.c_str());
    // delay(1000);

    // Serial.println("Loop");
}