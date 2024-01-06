import mqtt from "mqtt";
import { useAppState } from "../store/appState";

class MqttClient {
  //Singleton pattern for mqtt client
  private static instance: MqttClient | null = null;
  private client: mqtt.MqttClient;
  private topics: string[];

  private constructor() {
    this.client = mqtt.connect("ws://localhost:8080/", {
      clientId: "impax-dashboard",
      reconnectPeriod: 2000,
      keepalive: 60,
    });

    this.topics = [
      "test/#",
      "buddy/+/status",
      "buddy/+/impact",
      "session",
      "buddy/+/impact_history",
    ];

    this.client.on("connect", this.handleConnect);
    this.client.on("reconnect", this.handleReconnect);
    this.client.on("message", (topic, message) =>
      this.handleMessage(topic, message)
    );
  }

  private handleConnect = () => {
    console.log("connected");
    this.topics.forEach((topic) => this.client.subscribe(topic));
    // Assuming useAppState is available globally
    useAppState.setState({ isMqttOnine: true });
  };

  private handleReconnect = () => {
    console.log("reconnecting");
    useAppState.setState({ isMqttOnine: false });
  };

  private handleMessage = (topic: string, message: Buffer) => {
    console.log(`Received message on topic ${topic}: ${message}`);
  };

  public closeClient = () => {
    this.client.end();
  };

  public startSession = (sessionName: string) => {
    console.log(`Starting session ${sessionName}`);
  };

  public static getInstance(): MqttClient {
    if (!MqttClient.instance) {
      MqttClient.instance = new MqttClient();
    }
    return MqttClient.instance;
  }
}

export default MqttClient;
