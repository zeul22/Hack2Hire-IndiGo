import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

const userSchema = new Schema(
  {
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      trim: true,
    },
    phoneNum: {
      type: Number,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    flightId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("User", userSchema);
