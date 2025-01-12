import { z } from "zod";
import { USER_ROLE, UserStatus } from "../../utils/user.enums";

export const userRegisterValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
  status: z.nativeEnum(UserStatus),
  role: z.nativeEnum(USER_ROLE),
});

export const userValidationSchema = z.object({
  pasword: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
});

export const changeStatusValidationSchema = z.object({
 
    status: z.enum(Object.values(UserStatus) as [string, ...string[]]),

});
