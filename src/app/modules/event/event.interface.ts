import { Model } from "mongoose";

export interface TEvent {
  title: string;
  description: string;
  date: Date;
  location: string;
    organizer: string;
    attendees: string[];
    maxAttendees: number;
    createdBy: string;
}

export type EventModel = Model<TEvent>;
