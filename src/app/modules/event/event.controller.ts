import httpStatus from "http-status";
import { ERROR, SUCCESS } from "../../utils/api.response.types";

import { EventServices } from "./event.service";
import asyncErrorHandler from "../../utils/asyncErrorHandler";

const createEvent = asyncErrorHandler(async (req, res) => {
  try {
    const eventData = req.body;
    const result = await EventServices.createEvent(eventData);

    SUCCESS(res, httpStatus.CREATED, "Event is created successfully", result);
  } catch (error) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to create event", [
      error,
    ]);
  }
});

const getEventById = asyncErrorHandler(async (req, res) => {
  try {
    const eventId = req.params.id;
    const result = await EventServices.getEventById(eventId);

    SUCCESS(res, httpStatus.OK, "Event is retrieved successfully", result);
  } catch (error) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve event", [
      error,
    ]);
  }
});

const updateEvent = asyncErrorHandler(async (req, res) => {
  try {
    const eventId = req.params.id;
    const payload = req.body;
    const result = await EventServices.updateEvent(eventId, payload);

    SUCCESS(res, httpStatus.OK, "Event is updated successfully", result);
  } catch (error) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to update event", [
      error,
    ]);
  }
});

const registerAttendee = asyncErrorHandler(async (req, res) => {
  try {
    const { eventId, userId } = req.body; // Expecting eventId and userId in the request body
    const result = await EventServices.registerAttendee(eventId, userId);

    if (typeof result === "string") {
      return ERROR(res, httpStatus.BAD_REQUEST, result, []);
    }

    SUCCESS(
      res,
      httpStatus.OK,
      "User registered for the event successfully",
      result
    );
  } catch (error) {
    ERROR(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to register for the event",
      [error]
    );
  }
});

export const EventControllers = {
  createEvent,
  getEventById,
  updateEvent,
  registerAttendee,
};
