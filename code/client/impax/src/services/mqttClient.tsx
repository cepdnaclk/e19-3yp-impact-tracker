import { useEffect } from "react";
import mqtt from "mqtt";
import { useAppState } from "../store/appState";
const topics = ["test/topic", "test/topic2"];
const mqttClient = mqtt.connect("mqtt://localhost:8080/", {
  clientId: "impax-dashboard",
  reconnectPeriod: 2000,
});

export function useStartMqttClient() {
  useEffect(() => {
    mqttClient.on("connect", () => {
      console.log("connected");
      for (const topic of topics) {
        mqttClient.subscribe(topic);
      }
      useAppState.setState({ isMqttOnine: true });
    });
    mqttClient.on("reconnect", () => {
      console.log("reconnecting");
      useAppState.setState({ isMqttOnine: false });
    });
    mqttClient.on("message", (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message}`);
    });
    return () => {
      mqttClient.end();
    };
  }, []); // Empty dependency array to run only once

  return mqttClient;
}
