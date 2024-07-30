import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config({
  origin: "./.env",
});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export async function sendMessage(
  phoneNum,
  body = "Dear Customer, Thank you for using our service. We are glad to help you reach your destination. If you loved our services, please provide us the feedback!"
) {
  let messageOptions = {
    from: process.env.TWILIO_FROM_NUMBER,
    to: `${phoneNum}`,
    body,
  };

  try {
    const message = await client.messages.create(messageOptions);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}

export async function sendMessageEveryone(
  phoneNum,
  body = "Dear Customer, We will send you the updates about the flight soon! Thank you for using our service!"
) {
  let messageOptions = {
    from: process.env.TWILIO_FROM_NUMBER,
    to: `+${phoneNum}`,
    body,
  };

  try {
    const message = await client.messages.create(messageOptions);
  } catch (error) {
    console.log(error);
  }
}
