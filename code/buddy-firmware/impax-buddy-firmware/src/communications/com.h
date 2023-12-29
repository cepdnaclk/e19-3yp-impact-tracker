#ifndef COM_H
#define COM_H

#include <Arduino.h>

#define REQUEST "request"
#define ACK "ack"
#define NACK "nack"
#define WRONG "wrong"

#define DONE 1
#define DISCONNECTED 0
#define HANDSHAKE 2

#define DELAY_TIME 100
#define ACK_COUNT 100

class Com
{
public:
    int state;
    String data;

    void checkCom();

    void communicate();

    void comInit();

    bool dataDecode(String *ssid, String *password, String *key);
};

bool validateStringFormat(const char *);

#endif
