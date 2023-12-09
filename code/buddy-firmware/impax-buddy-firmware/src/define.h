#pragma once

#include <Arduino.h>

#include "communications/wifi.h"
#include "communications/mqtt.h"
#include "utils/eeprom.h"

#define BAUD_RATE 9600
#define ID 1

String ssid = "SLT-Fiber";
String password = "5CF@606a";

String ssid_default = "Dialog 4G 629";
String password_defalt = "189FFF07";

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "emqx/esp32";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;

String BUDDY_ID = "buddy-";