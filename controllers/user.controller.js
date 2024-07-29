import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { emailId, phoneNum } = req.body;

  console.log(emailId, phoneNum);
  if ([emailId, phoneNum].some((field) => !field || field?.trim() === "")) {
    throw new ApiError(400, `All fields are required`);
  }
  const existedUser = await User.findOne({
    $or: [{ emailId }],
  });
  if (existedUser) {
    user.flightId = flightId;

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User's flightId updated successfully"));
  }
  const user = await User.create({
    emailId,
    phoneNum,
  });

  const createdUser = await User.findById(user._id).select(" -phoneNum");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const FlightIdRegistration = asyncHandler(async (req, res) => {
  const { flightId, emailId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { emailId: emailId },
      { flightId: flightId },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Flight ID updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating Flight ID", error });
  }
});

const ExistinguserFlightUpdate = asyncHandler(async (req, res) => {
  const { flightId, emailId } = req.body;

  const user = await User.findOne({ emailId });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
});

const UserExists = asyncHandler(async (req, res) => {
  const { emailId } = req.body;
  const user = await User.findOne({ emailId });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Already Exists"));
});

export {
  registerUser,
  FlightIdRegistration,
  ExistinguserFlightUpdate,
  UserExists,
};
