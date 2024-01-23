#include "com.h"

void Com::checkCom()
{
    if (Serial.available() > 0)
    {
        String input = Serial.readStringUntil('\n');

        if (input == REQUEST)
        {
            state = HANDSHAKE;
        }
        else
        {
            state = DISCONNECTED;
        }
    }
}

bool Com::communicate()
{
    int count = 0;
    Serial.println(ACK);

    while (state != DONE)
    {
        led(LED_BLINK);

        if (count > ACK_COUNT)
        {
            state = DISCONNECTED;
            data = "";
            break;
        }

        if (Serial.available() > 0)
        {
            String input = Serial.readStringUntil('\n');

            if (validateStringFormat(input.c_str()))
            {
                state = DONE;
                data = input;
            }
            else
            {
                Serial.println(WRONG);
            }
        }

        count++;
        delay(DELAY_TIME);
    }

    if (state == DISCONNECTED)
    {
        Serial.println(NACK);
        return false;
    }
    else if (state == DONE)
    {
        Serial.println(ACK);
        state = DISCONNECTED;
        return true;
    }

    return false;
}

bool Com::comInit()
{
    state = DISCONNECTED;

    checkCom();

    if (state == HANDSHAKE)
    {
        return communicate();
    }

    return false;
}

bool Com::dataDecode(String *ssid, String *password, String *mqtt_username, String *mqtt_password)
{
    if (data != "")
    {
        int firstComma = data.indexOf(',');
        int secondComma = data.indexOf(',', firstComma + 1);
        int thirdComma = data.indexOf(',', secondComma + 1);

        *ssid = data.substring(1, firstComma);
        *password = data.substring(firstComma + 1, secondComma);
        *mqtt_username = data.substring(secondComma + 1, thirdComma);
        *mqtt_password = data.substring(thirdComma + 1, data.length() - 1);

        return true;
    }
    else
    {
        return false;
    }
}

bool validateStringFormat(const char *str)
{
    // Check if the string is not NULL
    if (str == NULL)
    {
        return false;
    }

    // Get the length of the string
    size_t len = strlen(str);

    // Check if the string is at least "{,,,}" (minimum valid length)
    if (len < 5)
    {
        return false;
    }

    // Check if the string starts with "{"
    if (str[0] != '{')
    {
        return false;
    }

    // Check if the string ends with "}"
    if (str[len - 1] != '}')
    {
        return false;
    }

    // Count the number of commas in the string
    int commaCount = 0;
    for (size_t i = 1; i < len - 1; i++)
    {
        if (str[i] == ',')
        {
            commaCount++;
        }
    }

    // Check if there are at least two commas
    if (commaCount != MSG_PARA - 1)
    {
        return false;
    }

    // If all checks pass, the string is in the correct format
    return true;
}
