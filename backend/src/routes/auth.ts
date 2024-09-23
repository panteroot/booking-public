import express from "express";
import {
  loginUserHandler,
  loginAdminHandler,
  setEmptyUserToken,
  setEmptyAdminToken,
  getUserId,
} from "../controllers/AuthController";
import validateResource from "../middleware/validateResource";
import { loginUserSchema, loginAdminSchema } from "../schemas/AuthSchema";
import {
  validateUserToken,
  validateAdminToken,
} from "../middleware/requireAuth";

const router = express.Router();

router.post(
  "/admin/login",
  validateResource(loginAdminSchema),
  loginAdminHandler
);

router.post("/login", validateResource(loginUserSchema), loginUserHandler);

router.get("/validate-admin-token", validateAdminToken, getUserId);

router.get("/validate-token", validateUserToken, getUserId);

router.post("/logout", setEmptyUserToken);

router.post("/admin/logout", setEmptyAdminToken);

export default router;
