#ifndef TOPIC_H
#define TOPIC_H

#include <Arduino.h>

struct Topics
{
    String TEST = "/test";
    String SAY_HELLO = "/sayHello";
    String BATTERY = "/status";
    String IMPACT = "/impact";
};

#endif