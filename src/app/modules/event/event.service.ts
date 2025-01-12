import { io } from "../../../server";
import { TEvent } from "./event.interface";
import { Event } from "./event.model";

const createEvent = async (eventData: TEvent): Promise<TEvent> => {
  const event = new Event(eventData);
  const result = await event.save();
  return result;
};

const getEventById = async (eventId: string): Promise<TEvent | null> => {
  const result = await Event.findById(eventId);
  return result;
};

const updateEvent = async (
  eventId: string,
  payload: Partial<TEvent>
): Promise<TEvent | null> => {
  const updatedEvent = await Event.findByIdAndUpdate(eventId, payload, {
    new: true,
  });
  if (!updatedEvent) {
    throw new Error("Event not found");
  }

  // Check if the event reached maximum capacity
  if (updatedEvent.attendees.length >= updatedEvent.maxAttendees) {
    io.emit("event-max-capacity", {
      eventId,
      message: `Event "${updatedEvent.title}" has reached maximum capacity.`,
    });
  }
  // Emit the updated event data
  io.emit("event-updated", {
    eventId,
    message: `Event "${updatedEvent.title}" has been updated.`,
    data: updatedEvent,
  });

  return updatedEvent;
};

const registerAttendee = async (
  eventId: string,
  userId: string
): Promise<TEvent | string> => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.attendees.includes(userId)) {
    return "User already registered for the event";
  }

  if (event.attendees.length >= event.maxAttendees) {
    return "Event is fully booked";
  }

  event.attendees.push(userId);
  await event.save();

    // Emit the real-time event
    io.emit("new-attendee", {
      eventId,
      userId,
      message: `New attendee registered for the event ${event.title}`,
    });

  return event;
};

export const EventServices = {
  createEvent,
  getEventById,
  updateEvent,
  registerAttendee,
};

