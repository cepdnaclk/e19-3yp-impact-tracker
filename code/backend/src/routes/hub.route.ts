import { Router } from "express";
import { Request, Response } from "express";
import { HttpCode, HttpMsg } from "../exceptions/http.codes.mgs";
import hubController from "../controllers/hub.controller";
import { Hub, HubRequest } from "../models/hub.model";

// Create an instance of the Express Router
const router = Router();

// get hub details
router.post("/credetials", async (req: Request, res: Response) => {
  try {
    const hubId = req.body.hubId;
    const hubKey = req.body.hubKey;

    // Check if hubId or hubKey is missing
    if (!hubId || !hubKey) {
      console.log(HttpMsg.BAD_REQUEST);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
      return;
    }

    // Create a HubRequest instance for getting hub details
    const hubReq = new HubRequest(hubId, hubKey);

    // get hub details
    const hub = await hubController.getHub(hubReq);

    res.send(hub);
  } catch (err) {
    if (err instanceof Error) {
      // If 'err' is an instance of Error, send the error message
      res.status(HttpCode.BAD_REQUEST).send({ message: err.message });
    } else {
      // If 'err' is of unknown type, send a generic error message
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    }
  }
});

// save hub details hubId, hubKey, mqttUsername, mqttPassword, mqttCA
router.post("/", async (req: Request, res: Response) => {
  try {
    const hubId = req.body.hubId;
    const hubKey = req.body.hubKey;
    const mqttUsername = req.body.mqttUsername;
    const mqttPassword = req.body.mqttPassword;
    const mqttCA = req.body.mqttCA;

    // Check if hubId or hubKey is missing
    if (!hubId || !hubKey) {
      console.log(HttpMsg.BAD_REQUEST);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
      return;
    }

    // Check if hubId or hubKey is missing
    if (!mqttUsername || !mqttPassword || !mqttCA) {
      console.log(HttpMsg.BAD_REQUEST);
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
      return;
    }

    // Create a HubRequest instance for getting hub details
    const newHub = new Hub(mqttUsername, mqttPassword, mqttCA, hubKey, hubId);

    // get hub details
    const hub = await hubController.createHubDetails(newHub);

    res.send(hub);
  } catch (err) {
    if (err instanceof Error) {
      // If 'err' is an instance of Error, send the error message
      res.status(HttpCode.BAD_REQUEST).send({ message: err.message });
    } else {
      // If 'err' is of unknown type, send a generic error message
      res.status(HttpCode.BAD_REQUEST).send({ message: HttpMsg.BAD_REQUEST });
    }
  }
});

export default router;
