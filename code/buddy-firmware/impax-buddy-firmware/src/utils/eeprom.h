#ifndef EEPROM_H
#define EEPROM_H

#include <Arduino.h>
#include <EEPROM.h>

// Define the total size of the EEPROM and starting addresses for different data types
#define EEPROM_SIZE 500
#define EEPROM_ID_ADDRESS 0
#define EEPROM_SSID_ADDRESS 1
#define EEPROM_PASSWORD_ADDRESS 33
#define EEPROM_SSID_CUSTOM_ADDRESS 65
#define EEPROM_PASSWORD_CUSTOM_ADDRESS 97
#define MQTT_PRIVATE_KEY_ADDRESS 129

// Function declarations
void initEEPROM(String &ssid, String &password, String &BUDDY_ID, int ID);
void writeEEPROMString(int startAddr, String data);
String readEEPROMString(int startAddr);
bool getCustomeSSIDAndPasswordEEPROM(String &ssid, String &password);
bool setCustomeSSIDAndPasswordEEPROM(String &ssid, String &password);
bool writeMQTTPrivateKeyEEPROM(String &data);
bool readMQTTPrivateKeyEEPROM(String &data);

#endif
