class Hub {
  public mqttUsername: string;
  public mqttPassword: string;
  public mqttCA: string;
  public hubKey: string;
  public hubId: string;

  public constructor(
    mqttUsername: string,
    mqttPassword: string,
    mqttCA: string,
    hubKey: string,
    hubId: string
  ) {
    this.mqttUsername = mqttUsername;
    this.mqttPassword = mqttPassword;
    this.mqttCA = mqttCA;
    this.hubKey = hubKey;
    this.hubId = hubId;
  }
}

class HubRequest {
  public hubKey: string;
  public hubId: string;

  public constructor(hubKey: string, hubId: string) {
    this.hubKey = hubKey;
    this.hubId = hubId;
  }
}

class HubResponse {
  public mqttUsername: string;
  public mqttPassword: string;
  public mqttCA: string;

  public constructor(
    mqttUsername: string,
    mqttPassword: string,
    mqttCA: string
  ) {
    this.mqttUsername = mqttUsername;
    this.mqttPassword = mqttPassword;
    this.mqttCA = mqttCA;
  }
}

export { Hub, HubRequest, HubResponse };
