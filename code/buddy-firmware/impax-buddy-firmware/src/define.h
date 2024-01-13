#pragma once

#include <Arduino.h>
#include "communications/wifi.h"
#include "communications/mqtt.h"
#include "utils/eeprom.h"
#include "utils/util.h"
#include "communications/com.h"
#include "combinedOutput.h"

#define BAUD_RATE 9600
#define ID 1
String BUDDY_ID = "buddy/";

// WIFI
// String ssid = "";
// String password = "";
// String ssid_default = "";
// String password_defalt = "";
String ssid = "impax";
String password = "impax12345678";
String ssid_default = "";
String password_defalt = "";
// {Dialog 4G 629,189FFF07,emqx,public,abcd}

// MQTT Broker
const char *mqtt_broker = "192.168.4.1";
String mqtt_username = "impax";
String mqtt_password = "impax";
const int mqtt_port = 1883;

// const char *mqtt_broker = "broker.emqx.io";
// const char *topic = "emqx/esp32";
// String mqtt_username = "emqx";
// String mqtt_password = "public";
// const int mqtt_port = 1883;

String CA_cert =
    "-----BEGIN CERTIFICATE-----\n"
    "MIIDJzCCAg+gAwIBAgIUPKKmid6OdQ5kxFZQxDI0tTTMOwgwDQYJKoZIhvcNAQEL\n"
    "BQAwIzELMAkGA1UEBhMCTEsxFDASBgNVBAMMC3Jhc3BiZXJyeXBpMB4XDTI0MDEw\n"
    "NTIwMzcxMloXDTI5MDEwNDIwMzcxMlowIzELMAkGA1UEBhMCTEsxFDASBgNVBAMM\n"
    "C3Jhc3BiZXJyeXBpMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoGFZ\n"
    "wBM2nEKyNpliS+54o2AJEW5nB0T42HCgTWGpxltKFrwdW8wG2l6MkbjYYOHM+LuK\n"
    "VGOdflj+s1xc0ne2Dlb3T7ezWeKvw+6y/T5lH9rHGfcZWt8+/Xo2zv+I8XvTKmtj\n"
    "eIDkZwCXxjcEWFq1HMiAAwQY9gcn+gLcVD9j3QPJK+v1oEziIHMB7mJoTCAZ6XcY\n"
    "6BsSGtU1QLwk3etBjTQlUT/aTYQZ2h7K/UYrsyz/AIG71dHSsfWyzRndvyPgZFqc\n"
    "QWVVOvO0RpTVRG/01dmeY0En6B1uGKpLqEnEO7QGgAjop79ed5tVRKY4Atl/w7bc\n"
    "HBcIHC7/IsFmlZQdoQIDAQABo1MwUTAdBgNVHQ4EFgQUCI93NzYADrR+oCVuwVW6\n"
    "+oCy/AUwHwYDVR0jBBgwFoAUCI93NzYADrR+oCVuwVW6+oCy/AUwDwYDVR0TAQH/\n"
    "BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAJFt1BKPyMFYTRp6jdElkwTtiLhg7\n"
    "u8LpuclYa18Dbf4vLmB0OksovrY7RURN1vKwYdB77MzPAr/QmDV/v9u5yR7GvBl2\n"
    "RHFzbxdtQJZLLmYhmPym6bTfyt9bNENEyP1ylKNqCe+SuAerIqVtZfALvCiHGtiM\n"
    "KP+unHof5qOjQC/dIAxX1uAbUyg8Z30AMK0NsvnxmOVKnQ8wCSYXqNue9neoM0Jj\n"
    "6p+BpazHm/tRz/vycytdZ40kEbJDk8vZKlrWm+rrAlwVjhPjceEmI2N/gPxesb/1\n"
    "lroQ5wSKJxpQjMPUfgupnChzG/zfdEJCgEAkN+UCTgA/ZZV/Xq5osrfBpg==\n"
    "-----END CERTIFICATE-----";

String ESP_CA_cert =
    "-----BEGIN CERTIFICATE-----\n"
    "################################################################\n"
    "################################################################\n"
    "################################################################\n"
    "-----END CERTIFICATE-----";

String ESP_RSA_key =
    "-----BEGIN RSA PRIVATE KEY-----\n"
    "################################################################\n"
    "################################################################\n"
    "################################################################\n"
    "-----END RSA PRIVATE KEY-----";

#define SAYHELLO_DELAY 20000
#define BATTER_STATUS_DELAY 10000
#define MEASURE_DELAY 100
#define CLK_SPEED 10

unsigned long sayHelloTimer = 0;
unsigned long batteryStatusTimer = 0;
unsigned long systemTimer = 0;

// -----BEGIN CERTIFICATE-----
// MIIDJzCCAg+gAwIBAgIUPKKmid6OdQ5kxFZQxDI0tTTMOwgwDQYJKoZIhvcNAQEL
// BQAwIzELMAkGA1UEBhMCTEsxFDASBgNVBAMMC3Jhc3BiZXJyeXBpMB4XDTI0MDEw
// NTIwMzcxMloXDTI5MDEwNDIwMzcxMlowIzELMAkGA1UEBhMCTEsxFDASBgNVBAMM
// C3Jhc3BiZXJyeXBpMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoGFZ
// wBM2nEKyNpliS+54o2AJEW5nB0T42HCgTWGpxltKFrwdW8wG2l6MkbjYYOHM+LuK
// VGOdflj+s1xc0ne2Dlb3T7ezWeKvw+6y/T5lH9rHGfcZWt8+/Xo2zv+I8XvTKmtj
// eIDkZwCXxjcEWFq1HMiAAwQY9gcn+gLcVD9j3QPJK+v1oEziIHMB7mJoTCAZ6XcY
// 6BsSGtU1QLwk3etBjTQlUT/aTYQZ2h7K/UYrsyz/AIG71dHSsfWyzRndvyPgZFqc
// QWVVOvO0RpTVRG/01dmeY0En6B1uGKpLqEnEO7QGgAjop79ed5tVRKY4Atl/w7bc
// HBcIHC7/IsFmlZQdoQIDAQABo1MwUTAdBgNVHQ4EFgQUCI93NzYADrR+oCVuwVW6
// +oCy/AUwHwYDVR0jBBgwFoAUCI93NzYADrR+oCVuwVW6+oCy/AUwDwYDVR0TAQH/
// BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAJFt1BKPyMFYTRp6jdElkwTtiLhg7
// u8LpuclYa18Dbf4vLmB0OksovrY7RURN1vKwYdB77MzPAr/QmDV/v9u5yR7GvBl2
// RHFzbxdtQJZLLmYhmPym6bTfyt9bNENEyP1ylKNqCe+SuAerIqVtZfALvCiHGtiM
// KP+unHof5qOjQC/dIAxX1uAbUyg8Z30AMK0NsvnxmOVKnQ8wCSYXqNue9neoM0Jj
// 6p+BpazHm/tRz/vycytdZ40kEbJDk8vZKlrWm+rrAlwVjhPjceEmI2N/gPxesb/1
// lroQ5wSKJxpQjMPUfgupnChzG/zfdEJCgEAkN+UCTgA/ZZV/Xq5osrfBpg==
// -----END CERTIFICATE-----
