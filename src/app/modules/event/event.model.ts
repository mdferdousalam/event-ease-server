import { Schema, model } from "mongoose";
import { EventModel, TEvent } from "./event.interface";


const eventSchema = new Schema<TEvent, EventModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    attendees: {
      type: [String],
      default: [],
    },
    maxAttendees: {
      type: Number,
      required: true,
        },
    
        createdBy: {
            type: String,
            required: true,
            ref: "User",
        },
  },
  {
    timestamps: true,
  }
);

export const Event = model<TEvent, EventModel>("Event", eventSchema);
