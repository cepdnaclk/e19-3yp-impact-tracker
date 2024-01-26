#include "eeprom.h"

void initEEPROM(String &ssid, String &password, String &mqtt_username, String &mqtt_password, String &BUDDY_ID, int ID)
{
    EEPROM.begin(EEPROM_SIZE);

    // setBuddyIdEEPROM(ID);
    BUDDY_ID += EEPROM.read(EEPROM_ID_ADDRESS);
    Serial.println(BUDDY_ID);

    setSSIDAndPasswordEEPROM(ssid, password);
    getSSIDAndPasswordEEPROM(ssid, password);

    writeMQTTUserNameEEPROM(mqtt_username);
    readMQTTUserNameEEPROM(mqtt_username);

    writeMQTTPasswordEEPROM(mqtt_password);
    readMQTTPasswordEEPROM(mqtt_password);
}

bool setBuddyIdEEPROM(int ID)
{
    EEPROM.write(EEPROM_ID_ADDRESS, ID);
    EEPROM.commit();
    return true;
}

// Function to write a string to EEPROM
void writeEEPROMString(int startAddr, String data)
{
    for (int i = 0; i < data.length(); i++)
    {
        EEPROM.write(startAddr + i, data[i]);
    }
    EEPROM.write(startAddr + data.length(), '\0'); // Null-terminate the string
    EEPROM.commit();
}

// Function to read a string from EEPROM
String readEEPROMString(int startAddr)
{
    String data = "";
    char character;
    int i = 0;

    while ((character = EEPROM.read(startAddr + i)) != '\0' && i < EEPROM_SIZE)
    {
        data += character;
        i++;
    }

    return data;
}

bool getSSIDAndPasswordEEPROM(String &ssid, String &password)
{
    if (EEPROM.read(EEPROM_SSID_ADDRESS) == 1)
    {
        ssid = readEEPROMString(EEPROM_SSID_ADDRESS + 1);
        password = readEEPROMString(EEPROM_PASSWORD_ADDRESS + 1);
        return true;
    }
    return false;
}

bool setSSIDAndPasswordEEPROM(String &ssid, String &password)
{
    writeEEPROMString(EEPROM_SSID_ADDRESS + 1, ssid);
    writeEEPROMString(EEPROM_PASSWORD_ADDRESS + 1, password);
    EEPROM.write(EEPROM_SSID_ADDRESS, 1);
    EEPROM.commit();
    return true;
}

bool writeMQTTUserNameEEPROM(String &data)
{
    writeEEPROMString(EEPROM_USER_NAME + 1, data);
    EEPROM.write(EEPROM_USER_NAME, 1);
    EEPROM.commit();
    return true;
}

bool readMQTTUserNameEEPROM(String &data)
{
    if (EEPROM.read(EEPROM_USER_NAME) == 1)
    {
        data = readEEPROMString(EEPROM_USER_NAME + 1);
        return true;
    }
    return false;
}

bool writeMQTTPasswordEEPROM(String &data)
{
    writeEEPROMString(EEPROM_PASSWORD + 1, data);
    EEPROM.write(EEPROM_PASSWORD, 1);
    EEPROM.commit();
    return true;
}

bool readMQTTPasswordEEPROM(String &data)
{
    if (EEPROM.read(EEPROM_PASSWORD) == 1)
    {
        data = readEEPROMString(EEPROM_PASSWORD + 1);
        return true;
    }
    return false;
}
