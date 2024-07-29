import cron from "node-cron";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { sendMessageEveryone } from "./SendSMS.js";

dotenv.config({
  path: "./.env",
});

const uri = process.env.DB_URL;

function getWeatherCondition() {
  return Math.floor(Math.random() * 6);
}

function getCrowdCondition() {
  return Math.floor(Math.random() * 6);
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function gateNum() {
  return Math.floor(Math.random() * 4);
}

const x = ["A", "B", "C", "D", "E"];

async function updateData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("Indigo");
    const collection = database.collection("flights");
    const collection2 = database.collection("users");

    const randomDoc = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    if (randomDoc.length > 0) {
      const doc = randomDoc[0];
      const weather = getWeatherCondition();
      const crowd = getCrowdCondition();

      let statusUpdate = "On Time";

      if (weather + crowd == 10) {
        statusUpdate = "Cancelled";
        const updateDoc = {
          $set: {
            status: statusUpdate,
            actual_departureTime: new Date().toISOString(),
          },
        };

        const user = await collection2.find({ flightId: doc._id }).toArray();
        console.log(user);

        if (user) {
          user.map((item, index) => {
            sendMessageEveryone(
              917903457533,
              `\n\n\n Dear Customer,\n\n We regret to inform you that your flight : ${doc.flightNumber} has been cancelled. \n\n We apologize for any inconvenience this may cause.`
            );
          });
        }

        const result = await collection.updateOne({ _id: doc._id }, updateDoc);
        console.log(
          `Flight ${doc.flightNumber} status updated to ${statusUpdate}.`
        );
      } else if (weather + crowd >= 8) {
        statusUpdate = "Delayed";
        const updatedDepartureTime = addMinutes(
          new Date(doc.scheduled_departureTime),
          45
        );

        const updateDoc = {
          $set: {
            status: statusUpdate,
            scheduled_departureTime: updatedDepartureTime,
          },
        };
        const user = await collection2.find({ flightId: doc._id }).toArray();
        console.log(user);
        if (user) {
          user.map((item, index) => {
            sendMessageEveryone(
              917903457533,
              `\n\n\n Dear Customer,We regret to inform you that your flight: ${doc.flightNumber} has been Delayed by 45 mins. \n\n We apologize for any inconvenience this may cause.`
            );
          });
        }

        const result = await collection.updateOne({ _id: doc._id }, updateDoc);
        console.log(
          `Flight ${doc.flightNumber} status updated to ${statusUpdate}.`
        );
      } else if (weather + crowd > 6) {
        const gateNumber = gateNum();
        const gateAplha = gateNum();
        const finalGate = `${x[gateAplha]}${gateNumber + 1}`;
        const updateGate = {
          $set: {
            departureGate: finalGate,
          },
        };

        const updateDoc = {
          $set: {
            departureGate: finalGate,
          },
        };
        const flightgateUpdate = await collection.updateOne(
          { _id: doc._id },
          updateDoc
        );

        if (flightgateUpdate.matchedCount > 0) {
          console.log(
            `Flight ${doc.flightNumber}'s departure gate has moved to ${finalGate}.`
          );
        } else {
          console.log(`No flight found with id ${doc.flightNumber}`);
        }
      } else {
        const updateDoc = {
          $set: {
            status: statusUpdate,
          },
        };

        const result = await collection.updateOne({ _id: doc._id }, updateDoc);
        console.log(
          `Flight ${doc.flightNumber} is on Time & will be departuring from `,
          doc.departureGate
        );
      }
    } else {
      console.log("No documents found in the collection.");
    }
  } catch (error) {
    console.error("Error updating data:", error);
  } finally {
    await client.close();
  }
}

cron.schedule("*/10 * * * * *", () => {
  console.log("Running the flight algorithm...");
  updateData();
});
