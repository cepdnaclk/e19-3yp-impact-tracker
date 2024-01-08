import mqtt from "mqtt";
import { useAppState } from "../states/appState";
import {
  updateBuddy,
  updateImpact,
  setPlayerMap,
  setSessionDetails,
} from "../states/updateAppStates";
import { Session } from "../types";

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
      // username: "impax",
      // password: "impax",
    });

    this.topics = [
      "test/#",
      "buddy/+/status",
      "buddy/+/impact",
      "buddy/+/impact_with_timestamp",
      "session",
      "player/+/impact_history",
      "player_map",
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
    switch (true) {
      case /^buddy\/\d+/.test(topic):
        //message from buddy
        //split topic to get buddy_id, and the subtopic
        const params = topic.split("/");
        const buddy_id = parseInt(params[1]);
        const subTopic = params[2];

        switch (subTopic) {
          case "status":
            //topic = buddy/+/status
            updateBuddy(buddy_id, parseInt(message.toString()));
            break;
          case "impact":
            //topic = buddy/+/impact
            updateImpact(buddy_id, message.toString());
            break;

          default:
            break;
        }

        break;

      case /^session$/.test(topic):
        setSessionDetails(message.toString());
        break;

      case /^player_map$/.test(topic):
        setPlayerMap(message.toString());
        break;

      default:
        break;
    }
  };

  public closeClient = () => {
    this.client.end();
  };

  public startSession = (sessionName: string) => {
    console.log(`Starting session ${sessionName}`);
  };

  public publishPlayerMap = (playerMap: Record<number, number>) => {
    this.publish("player_map", JSON.stringify(playerMap));
  };

  public publishSession = (session: Session) => {
    this.publish("session", JSON.stringify(session));
  };

  publishBuddyStatus(buddy_id: number, status: number) {
    this.publish(`buddy/${buddy_id}/status`, status.toString());
  }

  public endSession = () => {
    this.publish("session", "end");
  };

  private publish = (topic: string, message: string | Buffer) => {
    this.client.publish(topic, message, { retain: true }, (err) => {
      if (err) {
        console.error("Failed to publish message:", err);
      } else {
        console.log("Message published to topic:", topic);
      }
    });
  };
  public static getInstance(): MqttClient {
    if (!MqttClient.instance) {
      MqttClient.instance = new MqttClient();
    }
    return MqttClient.instance;
  }
}

export default MqttClient;
