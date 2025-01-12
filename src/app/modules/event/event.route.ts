import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EventControllers } from "./event.controller";
import { eventValidationSchema, registerValidationSchema } from "./event.validation";


const router = express.Router();

router.post(
  "/register",
  validateRequest(registerValidationSchema),
  EventControllers.registerAttendee
);

router.post(
  "/create",
  validateRequest(eventValidationSchema),
  EventControllers.createEvent
);

router.get("/:id", EventControllers.getEventById);
router.patch(
  "/:id",
  validateRequest(eventValidationSchema),
  EventControllers.updateEvent
);

export const EventRoutes = router;
