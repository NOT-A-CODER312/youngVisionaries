import { Schema, model, models } from "mongoose";

const eventsSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventDes: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const SugEvents = models.eventsSugs || model("eventsSugs", eventsSchema);

export default SugEvents;
