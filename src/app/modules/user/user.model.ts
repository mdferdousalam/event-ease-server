import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";
import { USER_ROLE, UserStatus } from "../../utils/user.enums";
const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLE,
    },
    status: {
      type: String,
      enum: UserStatus,
    },
  },
  {
    timestamps: true,
  },
);



export const User = model<TUser, UserModel>("User", userSchema);
