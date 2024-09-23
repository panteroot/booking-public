import { Request, Response } from "express";
import {
  CreateUserValidation,
  UpdateUserValidation,
} from "../schemas/UserSchema";
import { createUser, updateUser, getUser } from "../services/UserService";
import logger from "../utils/logger";
import { createToken } from "../middleware/requireAuth";
import config from "config";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserValidation["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    const token = createToken(user._id);

    const maxAge = config.get<number>("sessionTtl");
    res.cookie("user_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: maxAge,
    });

    res.status(200).json({
      userId: user._id,
      name: `${user.firstName} ${user.lastName}`,
      userType: "USER",
    });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const updateUserHandler = async (
  req: Request<{ id: string }, {}, UpdateUserValidation["body"]>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);

    if (!user) {
      return res.sendStatus(404);
    }

    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};

export const getMeHandler = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.userId);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
