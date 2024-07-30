import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Flight } from "../models/Flight.model.js";
import { User } from "../models/User.model.js";
import { sendMessageEveryone, sendMessage } from "../SendSMS.js";

const getallFlights = asyncHandler(async (req, res) => {
  const flights = await Flight.find().sort({ departureTime: 1 });
  if (!flights) {
    throw new ApiError(500, "Something went wrong while fetching the flights");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, flights, "Everythin is working good"));
});

const getFlightNotificationBySMS = asyncHandler(async (req, res) => {
  const { phoneNum } = req.body;
  try {
    sendMessage(phoneNum);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong!");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Notification send Successfully"));
});



const getFlightInformation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const flight = await Flight.findById(id);
  if (!flight) {
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
  console.log("Documents inserted:", result);
  for (const flight of result) {
    const flight_schedule = await Flight.findById(flight._id).select();
    if (!flight_schedule) {
      throw new Error(
        "Something went wrong while retrieving the flight schedule"
      );
    }
  }
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
