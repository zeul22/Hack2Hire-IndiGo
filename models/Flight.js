import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  airline: {
    type: String,
    required: true,
    default: "Indigo",
  },
  departureGate: {
    type: String,
    required: true,
  },
  arrivalGate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["On Time", "Cancelled", "Delayed"],
    default: "On Time",
  },
  scheduled_departureTime: {
    type: Date,
    required: true,
  },
  scheduled_arrivalTime: {
    type: Date,
    required: true,
  },
  actual_departureTime: {
    type: Date,
    default: null,
  },
  actual_arrivalTime: {
    type: Date,
    default: null,
  },
});

export const Flight = mongoose.model("Flight", FlightSchema);
