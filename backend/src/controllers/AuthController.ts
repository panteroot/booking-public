import { Request, Response } from "express";
import { LoginValidation } from "../schemas/AuthSchema";
import { loginUser } from "../services/AuthService";
import { LoginAdminValidation } from "../schemas/AuthSchema";
import { loginAdmin } from "../services/AuthService";
import { createToken } from "../middleware/requireAuth";
import config from "config";

const maxAge = config.get<number>("sessionTtl");
const secure = config.get<string>("nodeEnv") === "production";
const sameSite = config.get<string>("cookieSameSite") as "lax" | "none";
const domain = config.get<string>("cookieDomain");

export const loginUserHandler = async (
  req: Request<{}, {}, LoginValidation["body"]>,
  res: Response
) => {
  const user = await loginUser(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const token = createToken(user._id);

  res.cookie("user_token", token, {
    httpOnly: true,
    secure,
    maxAge,
    sameSite,
    // domain
  });

  res.status(200).json({
    userId: user._id,
    name: `${user.firstName} ${user.lastName}`,
    userType: "USER",
  });
};

export const loginAdminHandler = async (
  req: Request<{}, {}, LoginAdminValidation["body"]>,
  res: Response
) => {
  const admin = await loginAdmin(req.body);

  if (!admin) {
    return res.status(401).send("Invalid username or password");
  }

  const token = createToken(admin._id);

  res.cookie("admin_token", token, {
    httpOnly: true,
    secure,
    maxAge,
    sameSite,
  });

  res.status(200).json({
    userId: admin._id,
    name: admin.username,
    userType: "ADMIN",
  });
};

export const getUserId = async (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
};

export const setEmptyUserToken = async (req: Request, res: Response) => {
  res.cookie("user_token", "", {
    expires: new Date(0),
    secure,
    sameSite,
  });

  res.send();
};

export const setEmptyAdminToken = async (req: Request, res: Response) => {
  res.cookie("admin_token", "", {
    expires: new Date(0),
    secure,
    sameSite,
  });

  res.send();
};
