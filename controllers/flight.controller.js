import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Flight } from "../models/Flight.model.js";
import { User } from "../models/User.model.js";
import { sendMessageEveryone, sendMessage } from "../SendSMS.js";
import { logger } from "../app.js";

const getallFlights = asyncHandler(async (req, res) => {
  const flights = await Flight.find().sort({ departureTime: 1 });
  if (!flights) {
    logger.error(
      "Problem in /flight/getflights route. Flight information does not exist in database"
    );
    throw new ApiError(500, "Something went wrong while fetching the flights");
  }
  logger.info("Req came on /flight/getflights router.");
  return res
    .status(200)
    .json(new ApiResponse(200, flights, "Everythin is working good"));
});

const getFlightNotificationBySMS = asyncHandler(async (req, res) => {
  const { phoneNum } = req.body;
  try {
    sendMessage(phoneNum);
  } catch (error) {
    logger.error(
      "Problem in SMS Notification. Please check the integration with Twilio"
    );
    throw new ApiError(500, "Something went wrong!");
  }
  logger.info("Req came on /flight/smsnotificiation router.");

  return res
    .status(200)
    .json(new ApiResponse(200, "Notification send Successfully"));
});

const getFlightInformation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const flight = await Flight.findById(id);
  if (!flight) {
    logger.error(
      "Problem in /flight/getflight route. Specific Flight information does not exist in database"
    );
    throw new ApiError(400, "Flight Information does not exist!");
  }

  const user = await User.find({ flightId: id });
  if (user) {
    user.map((item, index) => {
      if (flight.status === "Delayed") {
        sendMessageEveryone(
          item.phoneNum,
          `Dear Customer,We regret to inform you that your flight has been delayed. We apologize for any inconvenience this may cause.`
        );
      } else if (flight.status === "Cancelled") {
        item.phoneNum,
          `Dear Customer,We regret to inform you that your flight has been cancelled. We apologize for any inconvenience this may cause.`;
      }
    });
  }
  

  
  logger.info("Req came on /flight/getflight router.");
  return res
    .status(200)
    .json(
      new ApiResponse(200, flight, "Flight Information fetched Successfully")
    );
});
const createFlight = asyncHandler(async (req, res) => {
  const flight = await Flight.create({
    flightNumber: "6E 2341",
    airline: "Indigo",
    departureGate: "E2",
    arrivalGate: "F1",
    status: "On Time",
    scheduled_departureTime: "2024-07-26T12:00:00Z",
    scheduled_arrivalTime: "2024-07-26T16:00:00Z",
  });

  const flight_schedule = await Flight.findById(flight._id).select();
  if (!flight_schedule) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        flight_schedule,
        "Flight Schedule created Successfully"
      )
    );
});

const insertManyFlight = asyncHandler(async (req, res) => {
  const result = await Flight.insertMany(flights);
  for (const flight of result) {
    const flight_schedule = await Flight.findById(flight._id).select();
    if (!flight_schedule) {
      logger.error("Creating a flight timeline had an issue");
      throw new Error(
        "Something went wrong while retrieving the flight schedule"
      );
    }
  }
  logger.info("Request came on /flight/insertflights");
  return res
    .status(201)
    .json(new ApiResponse(200, result, "Flight Schedule created Successfully"));
});

export {
  getallFlights,
  createFlight,
  insertManyFlight,
  getFlightInformation,
  getFlightNotificationBySMS,
};
