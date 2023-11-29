#include <ESP8266WiFi.h>
#include <WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>


// void setup() {
//   Serial.begin(9600);

//   // Set WiFi to station mode and disconnect from an AP if it was previously connected
//   WiFi.mode(WIFI_STA);
//   WiFi.disconnect();
//   delay(100);

//   Serial.println("Setup done");
// }

// void loop() {
//   Serial.println("scan start");

//   // WiFi.scanNetworks will return the number of networks found
//   int n = WiFi.scanNetworks();
//   Serial.println("scan done");
//   if (n == 0) {
//       Serial.println("no networks found");
//   } else {
//     Serial.print(n);
//     Serial.println(" networks found");
//     for (int i = 0; i < n; ++i) {
//       // Print SSID and RSSI for each network found
//       Serial.print(i + 1);
//       Serial.print(": ");
//       Serial.print(WiFi.SSID(i));
//       Serial.print(" (");
//       Serial.print(WiFi.RSSI(i));
//       Serial.print(")");
//       Serial.println((WiFi.encryptionType(i) == AUTH_OPEN)?" ":"*");
//       delay(10);
//     }
//   }
//   Serial.println("");

//   // Wait a bit before scanning again
//   delay(5000);
// }

const char* ssid = "Dialog 4G 629123";
const char* password = "189FFF07123";

void setup(){
    Serial.begin(9600);
    delay(1000);

    WiFi.mode(WIFI_STA); //Optional
    WiFi.begin(ssid, password);
    Serial.println("\nConnecting");

    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
        delay(100);
    }

    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}

void loop(){}