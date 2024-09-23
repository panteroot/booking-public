import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from "../utils/logger";

// add userId property in request type express
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const createToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_TOKEN as string, {
    expiresIn: "3d",
  });
};

export const validateUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["user_token"];

    if (!token) throw new Error("Unauthorized: No user token provided!");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string);

    if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
      throw new Error("Unauthorized: Invalid token");
    }

    req.userId = (decoded as JwtPayload).userId;

    next();
  } catch (e: any) {
    logger.error(e);
    res.status(401).json({ userType: "USER", message: e.message });
  }
};

export const validateAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["admin_token"];

    if (!token) throw new Error("Unauthorized: No admin token provided!");

    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string);

    if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
      throw new Error("Unauthorized: Invalid token");
    }

    req.userId = (decoded as JwtPayload).userId;

    next();
  } catch (e: any) {
    logger.error(e);
    res.status(401).json({ userType: "ADMIN", message: e.message });
  }
};
