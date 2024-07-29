import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  notification_id: {
    type: String,
    required: true,
    unique: true
  },
  flight_id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  method: {
    type: String,
    required: true,
    enum: ['SMS', 'Email', 'Push']
  },
  recipient: {
    type: String,
    required: true
  }
});

export const Notification = mongoose.model('Notification', NotificationSchema);
