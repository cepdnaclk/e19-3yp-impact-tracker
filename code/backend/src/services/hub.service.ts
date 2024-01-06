import HubModel from "../db/hub.schema";
import { Hub } from "../models/hub.model";

// get hub details from hubID and hubKey
async function getHubDetails(hubId: string, hubKey: string) {
  try {
    const hub = await HubModel.findOne({ hubId: hubId, hubKey: hubKey });
    if (hub) {
      return hub;
    } else {
      throw new Error("Hub not found");
    }
  } catch (err) {
    throw err;
  }
}

// create hub instance
async function createHub(hub: Hub) {
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
      throw new Error("Hub already exists");
    }

    await hubModel.save();
    return hubModel;
  } catch (err) {
    throw err;
  }
}

export { getHubDetails, createHub };
