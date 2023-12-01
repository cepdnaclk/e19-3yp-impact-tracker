#include <ESP8266WiFi.h>
#include <WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <PubSubClient.h>


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

// void setup(){
//     Serial.begin(9600);
//     delay(1000);

//     WiFi.mode(WIFI_STA); //Optional
//     WiFi.begin(ssid, password);
//     Serial.println("\nConnecting");

//     while(WiFi.status() != WL_CONNECTED){
//         Serial.print(".");
//         delay(100);
//     }

//     Serial.println("\nConnected to the WiFi network");
//     Serial.print("Local ESP32 IP: ");
//     Serial.println(WiFi.localIP());
// }

// void loop(){}

#include <WiFi.h>
#include <PubSubClient.h>

// WiFi
// const char *ssid = "xxxxx"; // Enter your Wi-Fi name
// const char *password = "xxxxx";  // Enter Wi-Fi password

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const char *topic = "emqx/esp32";
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char *topic, byte *payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message:");
    for (int i = 0; i < length; i++) {
        Serial.print((char) payload[i]);
    }
    Serial.println();
    Serial.println("-----------------------");
}

void setup() {
    // Set software serial baud to 115200;
    Serial.begin(9600);
    // Connecting to a WiFi network
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi..");
    }

    Serial.println("Connected to the Wi-Fi network");

    //connecting to a mqtt broker
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);

    while (!client.connected()) {
        String client_id = "esp32-client-";
        client_id += String(WiFi.macAddress());
        Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
        
        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
            Serial.println("Public EMQX MQTT broker connected");
        } else {
            Serial.print("failed with state ");
            Serial.print(client.state());
            delay(2000);
        }
    }

    // Publish and subscribe
    client.publish(topic, "Hi, I'm ESP32 ^^");
    client.subscribe(topic);
}



void loop() {
    client.loop();
}