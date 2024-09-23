import express from "express";

import {
  searchRoomsByPropertyHandler,
  getAvailableRoomsByPropertyIdHandler,
  searchPaginatedRoomsForAdminHandler,
  getRoomHandler,
  createRoomHandler,
  updateRoomHandler,
  deleteRoomHandler,
} from "../controllers/RoomController";
import { uploadImageWithMulter } from "../helpers/uploadImages";
import {
  validateAdminToken,
  validateUserToken,
} from "../middleware/requireAuth";
import { RoomSchema } from "../schemas/RoomSchema";
import validateResource from "../middleware/validateResource";

const router = express.Router();

// user
router.get("/grouped-by/property", searchRoomsByPropertyHandler);
router.get("/available", getAvailableRoomsByPropertyIdHandler);

// admin
router.use(validateAdminToken);
router.get("/search", searchPaginatedRoomsForAdminHandler);
router.get("/:id", getRoomHandler);

router.post(
  "/",
  uploadImageWithMulter("imageFiles", 8),
  validateResource(RoomSchema),
  createRoomHandler
);

router.patch(
  "/:id",
  uploadImageWithMulter("imageFiles", 8),
  validateResource(RoomSchema),
  updateRoomHandler
);

router.delete("/:id", deleteRoomHandler);

export default router;
