import { Hub, HubRequest, HubResponse } from "../models/hub.model";
import { getHubDetails, createHub } from "../services/hub.service";

async function getHub(hubReq: HubRequest): Promise<HubResponse> {
  try {
    const hub: Hub = await getHubDetails(hubReq.hubId, hubReq.hubKey);
    return new HubResponse(hub.mqttUsername, hub.mqttPassword, hub.mqttCA);
  } catch (err) {
    throw err;
  }
}

// create hub
async function createHubDetails(newhub: Hub): Promise<Hub> {
  try {
    const hub: Hub = await createHub(newhub);
    return hub;
  } catch (err) {
    throw err;
  }
}
export { getHub, createHubDetails };
