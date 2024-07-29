import mongoose, { Schema } from "mongoose";

const AirportSchema = new Schema({
  airportname: {
    type: String,
    required: true,
    unique: true,
  },
  airportcode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  Fli
});

export const Airport = mongoose.model("Airport", AirportSchema);
