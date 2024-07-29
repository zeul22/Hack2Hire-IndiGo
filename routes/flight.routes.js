import { Router } from "express";
import {
  getallFlights,
  getFlightInformation,
  getFlightNotificationBySMS,
} from "../controllers/flight.controller.js";
import { createFlight } from "../controllers/flight.controller.js";
import { insertManyFlight } from "../controllers/flight.controller.js";

const router = Router();

router.route("/getflights").get(getallFlights);
router.route("/getflight/:id").get(getFlightInformation);
router.route("/createflight").post(createFlight);
router.route("/flightinfo/notification").post(getFlightNotificationBySMS);
router.route("/createmanyflights").post(insertManyFlight);

export default router;
