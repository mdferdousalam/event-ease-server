import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EventControllers } from "./event.controller";
import { eventValidationSchema, registerValidationSchema, updateEventValidationSchema } from "./event.validation";
import requireAuth from "../../middlewares/requireAuth";
import { USER_ROLE } from "../../utils/user.enums";


const router = express.Router();

router.post(
  "/register",
   requireAuth(USER_ROLE.ADMIN, USER_ROLE.MODERATOR, USER_ROLE.NORMAL_USER),
  validateRequest(registerValidationSchema),
  EventControllers.registerAttendee
);

router.post(
  "/create",
   requireAuth(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
  validateRequest(eventValidationSchema),
  EventControllers.createEvent
);

router.get(
  "/all-events",
  requireAuth(USER_ROLE.ADMIN, USER_ROLE.MODERATOR, USER_ROLE.NORMAL_USER),
  EventControllers.getEvents
);


router.get("/:id",
   requireAuth(USER_ROLE.ADMIN, USER_ROLE.MODERATOR, USER_ROLE.NORMAL_USER),
  EventControllers.getEventById);
router.patch(
  "/:id",
  requireAuth(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
  validateRequest(updateEventValidationSchema),
  EventControllers.updateEvent
);
router.delete(
  "/:id",
  requireAuth(USER_ROLE.ADMIN, USER_ROLE.MODERATOR),
  EventControllers.deleteEvent
);
  

export const EventRoutes = router;
