/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE, UserStatus } from "../../utils/user.enums";

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: typeof USER_ROLE[keyof typeof USER_ROLE];
  status: typeof UserStatus[keyof typeof UserStatus];
}

export type UserModel = Model<TUser>;
