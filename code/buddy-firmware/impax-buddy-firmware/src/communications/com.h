#ifndef COM_H
#define COM_H

#include <Arduino.h>
#include "../utils/util.h"

#define REQUEST "request"
#define ACK "ack"
#define NACK "nack"
#define WRONG "wrong"

#define DONE 1
#define DISCONNECTED 0
#define HANDSHAKE 2

#define DELAY_TIME 100
#define ACK_COUNT 100

#define MSG_PARA 4

// Format string
// {ssid,password,mqtt_username,mqtt_password,key})

class Com
{
public:
    int state;
    String data;

    void checkCom();

    bool communicate();

    bool comInit();

    bool dataDecode(String *ssid, String *password, String *mqtt_username, String *mqtt_password);
};

bool validateStringFormat(const char *);

#endif
