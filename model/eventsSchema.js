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
});

const Events = models.events || model("events", eventsSchema);

export default Events;
