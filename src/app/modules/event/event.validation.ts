import { z } from "zod";

export const eventValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  location: z.string().min(5, "Location must be at least 5 characters long"),
  organizer: z
    .string()
        .min(3, "Organizer name must be at least 3 characters long"),
    attendees: z.array(z.string().optional()).default([]),
    maxAttendees: z.number().int().positive("Max attendees must be positive"),
    createdBy: z.string().min(1, "Created by is required"),

});


export const registerValidationSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
  userId: z.string().min(1, "User ID is required"),
});
