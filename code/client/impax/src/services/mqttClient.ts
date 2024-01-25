import mqtt from "mqtt";
import { useAppState } from "../states/appState";
import {
  updateBuddy,
  updateImpact,
  setPlayerMap,
  setSessionDetails,
  updatePlayersImpactHistory,
  checkBuddiesAvailability,
  flushStates,
  validateTimestampAndSetPlayerDetails,
} from "../states/updateAppStates";
import { Session } from "../types";

class MqttClient {
  //Singleton pattern for mqtt client
  private static instance: MqttClient | null = null;
  private client: mqtt.MqttClient;
  private topics: string[];

  private constructor() {
    this.client = mqtt.connect("ws://127.0.0.1:8080/", {
      clientId: `impax-dashboard-${Date.now()}`,
      reconnectPeriod: 2000,
      keepalive: 60,
      // username: "impax",
      // password: "impax",
    });

    this.topics = [
      "test/#",
      "buddy/+/status",
      "buddy/+/impact",
      //"buddy/+/impact_with_timestamp",
      "session",
      "player/+/impact_history",
      "player/+/impact_with_timestamp",
      "player/+/concussion",
      "player_map",
      "playerDetails",
      "hub/old_session",
    ];

    this.client.on("connect", this.handleConnect);
    this.client.on("reconnect", this.handleReconnect);
    this.client.on("offline", this.handleDisconnect);
    this.client.on("message", (topic, message) =>
      this.handleMessage(topic, message)
    );

    setInterval(checkBuddiesAvailability);
  }

  private handleConnect = () => {
    console.log("connected");
    this.topics.forEach((topic) => this.client.subscribe(topic));
    // Assuming useAppState is available globally
    useAppState.setState({ isMqttOnine: true });
  };

  private handleDisconnect = () => {
    console.log("Disconnected");
    useAppState.setState({ isMqttOnine: false });
    flushStates();
  };
  private handleReconnect = () => {
    console.log("reconnecting");
    useAppState.setState({ isMqttOnine: false });
  };

  private handleMessage = (topic: string, message: Buffer) => {
    console.log(`Received message on topic ${topic}: ${message}`);
    switch (true) {
      case /^player_map$/.test(topic):
        setPlayerMap(message.toString());
        break;

      case /^playerDetails$/.test(topic):
        validateTimestampAndSetPlayerDetails(message.toString());
        break;
      case /^session$/.test(topic):
        setSessionDetails(message.toString());
        break;

      case /^buddy\/\d+/.test(topic):
        handleMessageFromBuddy(topic, message);
        break;

      case /^player\/\d+/.test(topic):
        handleMessageFromPlayer(topic, message);
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

  public markAsConcussion = (player_id: number, timestamp: number) => {
    this.publish(`player/${player_id}/concussion`, timestamp.toString());
  };

  public publishBuddyStatus(buddy_id: number, status: number) {
    this.publish(`buddy/${buddy_id}/status`, status.toString());
  }

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

const handleMessageFromBuddy = (topic: string, message: Buffer) => {
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
    // case "impact_with_timestamp":
    //   //topic = buddy/+/impact_with_timestamp
    //   updateImpact(buddy_id, message.toString());
    //   break;

    default:
      break;
  }
};

const handleMessageFromPlayer = (topic: string, message: Buffer) => {
  //message from player
  //split topic to get player_id, and the subtopic
  const param = topic.split("/");
  const player_id = parseInt(param[1]);
  const subtopic = param[2];

  switch (subtopic) {
    case "impact_with_timestamp":
      //topic = player/+/impact_with_timestamp
      updateImpact(player_id, message.toString());
      break;
    case "impact_history":
      updatePlayersImpactHistory(player_id, message.toString());
      break;
    case "concussion":
      break;
    default:
      break;
    //topic = player/+/impact_history
  }
};
