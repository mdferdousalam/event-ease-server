import { Model } from "mongoose";
import { USER_ROLE, UserStatus } from "../../utils/user.enums";

export interface TUser {
  email: string;
  password: string;
  name: string;
  status: UserStatus;
  role: USER_ROLE;
}

export type UserModel = Model<TUser>;
