import express, { Request, Response, NextFunction } from "express";
import { createUserHandler, getMeHandler } from "../controllers/UserController";
import validateResource from "../middleware/validateResource";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import { validateUserToken } from "../middleware/requireAuth";

const router = express.Router();

router.get("/me", validateUserToken, getMeHandler);
router.post("/", validateResource(createUserSchema), createUserHandler);

export default router;
