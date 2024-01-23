#ifndef EEPROM_H
#define EEPROM_H

#include <Arduino.h>
#include <EEPROM.h>

#define WORD_LENGTH 32

// Define the total size of the EEPROM and starting addresses for different data types
#define EEPROM_ID_ADDRESS 0
#define EEPROM_SSID_ADDRESS EEPROM_ID_ADDRESS + 1
#define EEPROM_PASSWORD_ADDRESS EEPROM_SSID_ADDRESS + WORD_LENGTH
#define EEPROM_USER_NAME EEPROM_PASSWORD_ADDRESS + WORD_LENGTH
#define EEPROM_PASSWORD EEPROM_USER_NAME + WORD_LENGTH
#define EEPROM_SIZE EEPROM_PASSWORD + WORD_LENGTH

// Function declarations
void initEEPROM(String &ssid, String &password, String &mqtt_username, String &mqtt_password, String &BUDDY_ID, int ID);
void writeEEPROMString(int startAddr, String data);
String readEEPROMString(int startAddr);
bool getSSIDAndPasswordEEPROM(String &ssid, String &password);
bool setSSIDAndPasswordEEPROM(String &ssid, String &password);
bool writeMQTTUserNameEEPROM(String &data);
bool readMQTTUserNameEEPROM(String &data);
bool writeMQTTPasswordEEPROM(String &data);
bool readMQTTPasswordEEPROM(String &data);
bool setBuddyIdEEPROM(int ID);

#endif
