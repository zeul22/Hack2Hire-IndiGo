import { Router } from "express";
import {
  ExistinguserFlightUpdate,
  FlightIdRegistration,
  registerUser,
  UserExists,
} from "../controllers/user.controller.js";

const router = Router();

// router.route("/getusers").get(getUser);
router.route("/createuser").post(registerUser);
router.route("/flightregister").post(FlightIdRegistration);
router.route("/exisitinguser").put(ExistinguserFlightUpdate);
router.route("/isuser").get(UserExists);

export default router;
