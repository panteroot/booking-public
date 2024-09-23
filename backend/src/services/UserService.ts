import User, { UserInput } from "../models/User";
import { omit } from "lodash";

export const createUser = async (input: UserInput) => {
  try {
    const user = await User.create(input);
    
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e.message || "An error occurred during user creation!");
  }
};

export const updateUser = async (
  userId: string,
  input: Omit<UserInput, "email" | "password">
) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { ...input },
      {
        new: true,
      }
    );

    if (!user) return false;

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e.message || "An error occurred during user modification!");
  }
};

export const getUser = async (userId: string) => {
  // ? How to assert with select in unit test
  // const user = await User.findById(userId).select("-password");
  const user = await User.findById(userId);
  if (!user) return false;
  return omit(user.toJSON(), "password");
};
