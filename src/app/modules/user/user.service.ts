import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { decodeToken } from "../../utils/auth.utils";

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  const result = await user.save();
  return result;
};

const getMe = async (token: string): Promise<TUser | null> => {
  const { userId } = decodeToken(token);
  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
  const result = await User.findOne({ id: userId }).populate("user");
  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getMe,
  changeStatus,
};
