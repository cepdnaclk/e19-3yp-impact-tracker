import HubModel from "../db/hub.schema";
import { HttpMsg } from "../exceptions/http.codes.mgs";
import { Hub } from "../models/hub.model";

class HubService {
  // get hub details from hubID and hubKey
  async getHubDetails(hubId: string, hubKey: string) {
    try {
      const hub = await HubModel.findOne({ hubId: hubId, hubKey: hubKey });
      if (hub) {
        return hub;
      } else {
        throw new Error(HttpMsg.HUB_NOT_FOUND);
      }
    } catch (err) {
      throw err;
    }
  }

  // create hub instance
  async createHub(hub: Hub) {
    try {
      const hubModel = new HubModel({
        hubId: hub.hubId,
        hubKey: hub.hubKey,
        mqttUsername: hub.mqttUsername,
        mqttPassword: hub.mqttPassword,
        mqttCA: hub.mqttCA,
      });

      // check if hub already exists
      const hubExists = await HubModel.findOne({ hubId: hub.hubId });
      if (hubExists) {
        throw new Error(HttpMsg.HUB_EXIST);
      }

      await hubModel.save();
      return hubModel;
    } catch (err) {
      throw err;
    }
  }
}

export default new HubService();
