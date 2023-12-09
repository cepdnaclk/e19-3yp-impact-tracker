#pragma once

#include <Arduino.h>
#include <EEPROM.h>

#include "communications/wifi.h"
#include "communications/mqtt.h"

#define BAUD_RATE 9600
// define the number of bytes you want to access
#define EEPROM_SIZE 1
#define EEPROM_START_ADDRESS 0
#define ID 1

const char* ssid = "Dialog 4G 629";
const char* password = "189FFF07";

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "emqx/esp32";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;

String BUDDY_ID = "buddy-";