import { Hub, HubRequest, HubResponse } from "../models/hub.model";
import hubService from "../services/hub.service";

class HubController {
  async getHub(hubReq: HubRequest): Promise<HubResponse> {
    try {
      const hub: Hub = await hubService.getHubDetails(
        hubReq.hubId,
        hubReq.hubKey
      );
      return new HubResponse(hub.mqttUsername, hub.mqttPassword, hub.mqttCA);
    } catch (err) {
      throw err;
    }
  }

  // create hub
  async createHubDetails(newhub: Hub): Promise<Hub> {
    try {
      const hub: Hub = await hubService.createHub(newhub);
      return hub;
    } catch (err) {
      throw err;
    }
  }
}

export default new HubController();
