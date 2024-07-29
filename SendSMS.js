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
  body = "This is a Test Message!"
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


export  async function sendMessageEveryone(
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
    console.log(message);
  } catch (error) {
    console.log(error);
  }
}
