#ifndef TOPIC_H
#define TOPIC_H

#include <Arduino.h>

struct Topics
{
    String TEST = "/test";
    String BATTERY = "/status";
    String IMPACT = "/impact";
};

#endif